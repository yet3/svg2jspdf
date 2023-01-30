import { SvgHandler } from "../custom";
import { handleFillAndStrokeBefore } from "../utils/fillAndStroke.util";
import { handleWidthAndHeight } from "../utils/widthAndHeight.util";

export const svgCircleHandler: SvgHandler<"circle"> = (doc, data, element) => {
  const { props } = element;
  let { cx, cy } = props;
  const { r } = props;
  if (cx == null || cy == null || r == null) {
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
