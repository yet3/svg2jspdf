import { PdfOperator } from "../custom";

interface ParsedPdfPaths {
  operator: PdfOperator;
  values: number[];
}

export const svgPointsToPdfPaths = (svgPoints: string, connectLastWithFirst = false) => {
  const parsed: ParsedPdfPaths[] = [];

  const points = svgPoints.replace(/,/g, " ").replace(/\s\s+/g, " ").split(" ");

  let x: number | null = null;
  let y: number | null = null;

  points.forEach((pos, i) => {
    if (i % 2 === 0) x = parseFloat(pos);
    else y = parseFloat(pos);

    if (x != null && y != null) {
      parsed.push({
        operator: i === 1 ? "m" : "l",
        values: [x, y],
      });
      x = null;
      y = null;
    }
  });

  if (connectLastWithFirst) {
    parsed.push({
      operator: "h",
      values: [],
    });
  }

  return parsed;
};
