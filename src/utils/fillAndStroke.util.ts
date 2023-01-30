import type JsPdf from "jspdf";
import { SvgElFillStrokeProps } from "../custom";

export const handleFillAndStrokeBefore = (doc: JsPdf, props: SvgElFillStrokeProps, scale: number = 1) => {
  let sty: "F" | "S" | "DF" | undefined;
  if (props.fill) {
    sty = "F";
    doc.setFillColor(props.fill);
  }
  if (props.stroke) {
    if (sty === "F") sty = "DF";
    else sty = "S";
    doc.setDrawColor(props.stroke);

    if (props["stroke-width"]) doc.setLineWidth(+props["stroke-width"] * scale);
    else doc.setLineWidth(1 * scale);
  }
  return sty;
};

export const handleFillAndStrokeAfter = (doc: JsPdf, props: SvgElFillStrokeProps) => {
  if (props.stroke) doc.stroke();
  if (props.fill) {
    if (props["fill-rule"] === "evenodd") doc.fillEvenOdd();
    else doc.fill();
  }
};
