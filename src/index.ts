import { readFileSync } from "fs";
import JsPdf from "jspdf";
import { parse as parseSvg } from "svg-parser";
import { IHandlers, Svg2PdfOptions, SvgHandler } from "./custom";
import { svgCircleHandler } from "./handlers/circle.handler";
import { svgLineHandler } from "./handlers/line.handler";
import { svgPathHandler } from "./handlers/path.handler";
import { svgPolygonHandler } from "./handlers/polygon.handler";
import { svgPolylineHandler } from "./handlers/polyline.handler";
import { svgRectHandler } from "./handlers/rect.handler";
import { getSvgElements } from "./utils/getSvgElements.util";

const Handlers: IHandlers = new Map();

export const setSvg2PdfHandler = <T extends string>(tagName: T, handler: SvgHandler<T>) => {
  Handlers.set(tagName, handler);
};

// Default handlers
setSvg2PdfHandler("path", svgPathHandler);
setSvg2PdfHandler("polygon", svgPolygonHandler);
setSvg2PdfHandler("polyline", svgPolylineHandler);
setSvg2PdfHandler("line", svgLineHandler);
setSvg2PdfHandler("rect", svgRectHandler);
setSvg2PdfHandler("circle", svgCircleHandler);

const handleAddSvgFromString = (p: { doc: JsPdf; handlers: IHandlers; svgString: string; data: Svg2PdfOptions }) => {
  const { doc, handlers, svgString, data = {} } = p;
  const svg = parseSvg(svgString);

  const { svgEl, elements } = getSvgElements(handlers, svg);
  const { x = 0, y = 0, width, height } = data;

  elements.forEach((el) => {
    const handler = handlers.get(el.tagName);
    if (handler) {
      handler(
        doc,
        {
          x,
          y,
          width,
          height,
          svgWidth: svgEl?.props.width ?? 0,
          svgHeight: svgEl?.props.height ?? 0,
          viewBox: svgEl?.props.viewBox,
        },
        el as any
      );
    }
  });
};

const handleAddSvgFromFile = (p: { doc: JsPdf; handlers: IHandlers; filePath: string; data: Svg2PdfOptions }) => {
  return handleAddSvgFromString({ ...p, svgString: readFileSync(p.filePath, "utf-8") });
};

export class Svg2Pdf {
  readonly handlers: IHandlers = new Map();
  readonly doc: JsPdf;

  constructor(doc: JsPdf) {
    this.doc = doc;

    Handlers.forEach((value, key) => {
      this.handlers.set(key, value);
    });
  }

  setHandler<T extends string>(tagName: T, handler: SvgHandler<T>) {
    this.handlers.set(tagName, handler);
  }

  fromString(svgString: string, data: Svg2PdfOptions = {}) {
    handleAddSvgFromString({ doc: this.doc, handlers: this.handlers, svgString: svgString, data: data });
  }

  fromFile(filePath: string, data: Svg2PdfOptions = {}) {
    handleAddSvgFromFile({ doc: this.doc, handlers: this.handlers, filePath: filePath, data: data });
  }
}

export const addSvgFromString = (doc: JsPdf, svgString: string, data: Svg2PdfOptions = {}) => {
  handleAddSvgFromString({ doc, svgString, data, handlers: Handlers });
};

export const addSvgFromFile = (doc: JsPdf, filePath: string, data: Svg2PdfOptions = {}) => {
  handleAddSvgFromFile({ doc, filePath, data, handlers: Handlers });
};
