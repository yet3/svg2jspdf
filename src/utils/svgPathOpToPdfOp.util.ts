import { PdfOperator } from "../custom";

export const svgPathOpToPdfOp = (svgOperator: string): PdfOperator => {
  if (["l", "h", "v"].includes(svgOperator)) return "l";
  if (svgOperator === "c") return "c";
  if (svgOperator === "z") return "h";
  return "m";
};
