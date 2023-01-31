import type JsPDF from "jspdf";

export type IHandlers = Map<string, SvgHandler<any>>;
export type SvgTags = "svg" | "text" | "rect" | "circle" | "path" | "polygon" | "polyline" | "line";

export type PdfOperator = "m" | "l" | "c" | "h";

export interface Svg2PdfOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface SvgElFillStrokeProps {
  fill?: string;
  stroke?: string;
  "stroke-width"?: number;
  "fill-rule"?: "evenodd" | "nonzero";
}

export interface SvgElBaseProps extends SvgElFillStrokeProps {}

interface SvgSvgElProps extends SvgElBaseProps {
  width?: number;
  height?: number;
  viewBox?: string;
  xmlns?: string;
}

interface SvgPathElProps extends SvgElBaseProps {
  d: string;
}

interface SvgPolygonElProps extends SvgElBaseProps {
  points: string;
}
type SvgPolylineElProps = SvgPolygonElProps;

interface SvgLineElProps extends SvgElBaseProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface SvgRectElProps extends SvgElBaseProps {
  x: number;
  y: number;
  rx?: number;
  ry?: number;
  width: number;
  height: number;
}

interface SvgCircleElProps extends SvgElBaseProps {
  cx: number;
  cy: number;
  r: number;
}

interface TSvgEl<T extends string, TProps extends Record<string, any>> {
  tagName: T;
  props: TProps;
}

type SvgEl<T extends string = ""> = T extends "path"
  ? TSvgEl<"path", SvgPathElProps>
  : T extends "polygon"
  ? TSvgEl<"polygon", SvgPolygonElProps>
  : T extends "polyline"
  ? TSvgEl<"polyline", SvgPolygonElProps>
  : T extends "line"
  ? TSvgEl<"line", SvgLineElProps>
  : T extends "rect"
  ? TSvgEl<"rect", SvgRectElProps>
  : T extends "circle"
  ? TSvgEl<"circle", SvgCircleElProps>
  : T extends "svg"
  ? TSvgEl<"svg", SvgSvgElProps>
  : TSvgEl<T, Record<string, number | string>>;

interface SvgHandlerData {
  x: number;
  y: number;
  width?: number | "auto";
  height?: number | "auto";
  viewBox?: string;
  svgWidth: number;
  svgHeight: number;
}

export type SvgHandler<T extends string> = (doc: JsPDF, data: SvgHandlerData, elements: SvgEl<T>) => void;
