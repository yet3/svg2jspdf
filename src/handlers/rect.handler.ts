import { SvgHandler } from "../custom";
import { handleFillAndStrokeBefore } from "../utils/fillAndStroke.util";
import { handleWidthAndHeight } from "../utils/widthAndHeight.util";

export const svgRectHandler: SvgHandler<"rect"> = (doc, data, element) => {
  const { props } = element;
  let { x = 0, y = 0, width, height, rx = 0, ry = 0 } = props;
  if (width == null || height == null) {
    throw Error("svgRectHandler: width, height props must be provided");
  }

  const { wScale, hScale, maxScale } = handleWidthAndHeight(data);

  x *= wScale;
  y *= hScale;

  x += data.x;
  y += data.y;

  width *= wScale;
  height *= hScale;

  rx *= wScale;
  ry *= hScale;

  const style = handleFillAndStrokeBefore(doc, props, maxScale);
  doc.roundedRect(x, y, width, height, rx, ry, style);
};
