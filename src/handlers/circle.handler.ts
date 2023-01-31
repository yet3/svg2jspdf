import { SvgHandler } from "../custom";
import { handleFillAndStrokeBefore } from "../utils/fillAndStroke.util";
import { handleWidthAndHeight } from "../utils/widthAndHeight.util";

export const svgCircleHandler: SvgHandler<"circle"> = (doc, data, element) => {
  const { props } = element;
  let { cx = 0, cy = 0 } = props;
  const { r } = props;
  if (r == null) {
    throw Error("svgCircleHandler: cx, cy, r props must be provided");
  }

  const { wScale, hScale } = handleWidthAndHeight(data);

  cx *= wScale;
  cy *= hScale;

  cx += data.x;
  cy += data.x;

  const rx = r * wScale;
  const ry = r * hScale;

  const style = handleFillAndStrokeBefore(doc, props, Math.max(wScale, hScale));
  doc.ellipse(cx, cy, rx, ry, style);
};
