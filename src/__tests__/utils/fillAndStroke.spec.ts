import { expect, describe, it } from "@jest/globals";
import JsPDF from "jspdf";
import { handleFillAndStrokeBefore } from "../../utils/fillAndStroke.util";

describe("Util: handleFillAndStrokeBefore()", () => {
  it("should set drawColor to #ff0000", () => {
    const doc = new JsPDF();
    handleFillAndStrokeBefore(doc, { stroke: "#ff0000" });
    expect(doc.getDrawColor()).toBe("#ff0000");
  });

  it("should set drawColor, lineWidth to #ff0000, 3", () => {
    const doc = new JsPDF();
    handleFillAndStrokeBefore(doc, { stroke: "#ff0000", "stroke-width": 3 });
    expect(doc.getDrawColor()).toBe("#ff0000");
    expect(doc.getLineWidth()).toBe(3);
  });

  it("should NOT set lineWidth to 3", () => {
    const doc = new JsPDF();
    handleFillAndStrokeBefore(doc, { stroke: "#ff0000" });
    expect(doc.getDrawColor()).toBe("#ff0000");
    expect(doc.getLineWidth()).not.toBe(4);
  });

  it("should set fillColor to #00ff00", () => {
    const doc = new JsPDF();
    handleFillAndStrokeBefore(doc, { fill: "#00ff00" });
    expect(doc.getFillColor()).toBe("#00ff00");
  });

  it("should return: S", () => {
    const doc = new JsPDF();
    expect(handleFillAndStrokeBefore(doc, { stroke: "#ff0000" })).toBe("S");
  });

  it("should return: F", () => {
    const doc = new JsPDF();
    expect(handleFillAndStrokeBefore(doc, { fill: "#00ff00" })).toBe("F");
  });

  it("should return: DF", () => {
    const doc = new JsPDF();
    expect(
      handleFillAndStrokeBefore(doc, { stroke: "#ff0000", fill: "#00ff00" })
    ).toBe("DF");
  });
});
