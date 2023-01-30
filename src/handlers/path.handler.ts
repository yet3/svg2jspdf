import { SvgHandler } from "../custom";
import { handleFillAndStrokeAfter, handleFillAndStrokeBefore } from "../utils/fillAndStroke.util";
import { svgPathToPdfPaths } from "../utils/svgPathToPdfPaths.util";
import { handleWidthAndHeight } from "../utils/widthAndHeight.util";

export const svgPathHandler: SvgHandler<"path"> = (doc, data, element) => {
  const { props } = element;
  if (!props.d) {
    throw Error("svgPathHandler: d prop must be provided");
  }
  const { x, y } = data;

  const paths = svgPathToPdfPaths(props.d);

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
