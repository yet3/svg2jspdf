import { expect, describe, it } from "@jest/globals";
import JsPDF from "jspdf";
import { unlinkSync } from "fs";
import { setSvg2PdfHandler, addSvgFromFile, addSvgFromString, Svg2Pdf } from "../index";

const svgString = `
<svg width="795" height="548" viewBox="0 0 795 548" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M4 378V128L360 4.5C485.667 10.5 746.5 65.3 784.5 236.5C822.5 407.7 664.667 358.833 581 313L399.5 541.5L265.5 378H4Z"
    stroke="black" stroke-width="8" />
  <rect x="101" y="132" width="99" height="89" fill="#5055D3" />
  <line x1="372.806" y1="69.1696" x2="565.806" y2="154.17" stroke="#64D65A" stroke-width="4" />
  <circle cx="397" cy="262" r="59" fill="#CD7575" />
</svg>
`;

describe("adding svg", () => {
  describe("using exposed functions", () => {
    it("should add svg to pdf from string", () => {
      const doc = new JsPDF();

      addSvgFromString(doc, svgString, { width: 100 });
    });

    it("should add svg to pdf from file", () => {
      const doc = new JsPDF();

      addSvgFromFile(doc, `${__dirname}/example.svg`, { width: 100 });
    });
  });

  describe("using Svg2Pdf class", () => {
    it("should add svg to pdf from string", () => {
      const doc = new JsPDF();
      const svg2pdf = new Svg2Pdf(doc);

      svg2pdf.fromString(svgString, { width: 100 });
    });

    it("should add svg to pdf from string", () => {
      const doc = new JsPDF();
      const svg2pdf = new Svg2Pdf(doc);

      svg2pdf.fromFile(`${__dirname}/example.svg`, { width: 100 });
    });
  });
});
