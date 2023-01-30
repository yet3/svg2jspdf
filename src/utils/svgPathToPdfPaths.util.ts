import type { PdfOperator } from "../custom";
import { svgPathOpToPdfOp } from "./svgPathOpToPdfOp.util";

const ALLOWED_OPERATORS = ["m", "l", "h", "v", "c", "z"] as const;
type SvgOperator = (typeof ALLOWED_OPERATORS)[number];

interface ParsedPdfPaths {
  operator: PdfOperator;
  svgOperator: SvgOperator;
  values: number[];
}

export const svgPathToPdfPaths = (svgPath: string) => {
  const parsed: ParsedPdfPaths[] = [];

  let svgOp: SvgOperator | null = null;
  let tmpStr = "";
  for (let i = 0; i < svgPath.length + 1; i++) {
    const char = svgPath[i] ?? "-1";

    if (char === "-1" || !new RegExp(/([0-9]|\.|-| )/gm).test(char)) {
      const charOp = char.toLowerCase() as SvgOperator;

      if (svgOp) {
        let values: number[] = [];
        if (svgOp !== "z") {
          tmpStr.split(" ").map((v) => {
            const parsed = parseFloat(v);
            if (isNaN(parsed)) values.push(0);
            else values.push(parsed);
          });
        }

        parsed.push({
          operator: svgPathOpToPdfOp(svgOp),
          svgOperator: svgOp,
          values,
        });
        svgOp = null;
      }

      if (ALLOWED_OPERATORS.includes(charOp)) svgOp = charOp;

      tmpStr = "";
    } else tmpStr += char;
  }

  for (let i = 0; i < parsed.length; i++) {
    const { svgOperator, values } = parsed[i];

    if (["h", "v"].includes(svgOperator)) {
      const prev = parsed[i - 1];
      const prevValues = prev ? prev.values : [0, 0];

      if (svgOperator === "h") {
        if (prev && prev.operator === "c") {
          values.push(prevValues[prevValues.length - 1] ?? 0);
        } else values.push(prevValues[1]);
      } else {
        if (prev && prev.operator === "c") {
          values.splice(0, 0, prevValues[prevValues.length - 2] ?? 0);
        } else values.splice(0, 0, prevValues[0]);
      }
    }
  }

  return parsed;
};
