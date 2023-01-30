import { expect, describe, it } from "@jest/globals";
import JsPdf from "jspdf";
import { svgPolygonHandler } from "../../handlers/polygon.handler";

describe("Handler: svgPolygonHandler()", () => {
  describe("when points are valid", () => {
    it("should handle svg polygon", async () => {
      const doc = new JsPdf();
      let hasError = true;
      try {
        svgPolygonHandler(
          doc,
          { x: 0, y: 0, svgWidth: 30, svgHeight: 40 },
          {
            tagName: "polygon",
            props: {
              points: "0,0 30,0 30,40",
            },
          }
        );
        hasError = false;
      } catch (e) {}

      expect(hasError).toBe(false);
    });
  });

  describe("when points are invalid", () => {
    it("should throw error", async () => {
      const doc = new JsPdf();
      let hasError = false;
      try {
        svgPolygonHandler(
          doc,
          { x: 0, y: 0, svgWidth: 30, svgHeight: 40 },
          {
            tagName: "polygon",
            props: {
              points: "0k0 30,0 r0,40",
            },
          }
        );
      } catch (e) {
        hasError = true;
      }

      expect(hasError).toBe(true);
    });
  });
});
