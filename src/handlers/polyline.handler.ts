import { SvgHandler } from "../custom";
import { handleFillAndStrokeAfter, handleFillAndStrokeBefore } from "../utils/fillAndStroke.util";
import { svgPointsToPdfPaths } from "../utils/svgPointsToPdfPaths.util";
import { handleWidthAndHeight } from "../utils/widthAndHeight.util";

export const svgPolylineHandler: SvgHandler<"polyline"> = (doc, data, element) => {
  const { props } = element;
  if (!props.points) {
    throw Error("svgPolylineHandler: points prop must be provided");
  }
  const { x, y } = data;

  const paths = svgPointsToPdfPaths(props.points);

  const { wScale, hScale, maxScale } = handleWidthAndHeight(data);
  handleFillAndStrokeBefore(doc, props, maxScale);

  doc.path(
    paths.map((path) => ({
      op: path.operator,
      c: path.values.map((v, vi) => v * (vi % 2 === 0 ? wScale : hScale) + (vi % 2 === 0 ? x : y)),
    }))
  );

  handleFillAndStrokeAfter(doc, props);
};
