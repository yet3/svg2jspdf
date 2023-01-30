import { SvgHandler } from "../custom";
import { handleFillAndStrokeBefore } from "../utils/fillAndStroke.util";
import { handleWidthAndHeight } from "../utils/widthAndHeight.util";

export const svgLineHandler: SvgHandler<"line"> = (doc, data, element) => {
  const { props } = element;
  let { x1, y1, x2, y2 } = props;
  if (x1 == null || y1 == null || x2 == null || y2 == null) {
    throw Error("svgLineHandler: x1, y1, x2, y2 props must be provided");
  }
  const { x, y } = data;
  const { wScale, hScale, maxScale } = handleWidthAndHeight(data);

  x1 *= wScale;
  x2 *= wScale;
  y1 *= hScale;
  y2 *= hScale;

  x1 += x;
  x2 += x;
  y1 += y;
  y2 += y;

  const style = handleFillAndStrokeBefore(doc, props, maxScale);
  doc.line(x1, y1, x2, y2, style);
};
