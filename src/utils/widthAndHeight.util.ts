export const handleWidthAndHeight = (data: { width?: number | "auto"; height?: number | "auto"; svgWidth: number; svgHeight: number }) => {
  let width = typeof data.width !== "number" ? "auto" : data.width;
  let height = typeof data.height !== "number" ? "auto" : data.height;
  let wScale = 1;
  let hScale = 1;

  if (width === "auto") {
    wScale = typeof height === "number" ? height / data.svgHeight : 1;
  } else wScale = (width as number) / data.svgWidth;

  if (height === "auto") {
    hScale = typeof width === "number" ? width / data.svgWidth : 1;
  } else hScale = (height as number) / data.svgHeight;

  return { wScale, hScale, maxScale: Math.max(wScale, hScale), minScale: Math.min(wScale, hScale), width, height };
};
