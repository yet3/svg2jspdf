import { expect, describe, it } from "@jest/globals";
import JsPdf from "jspdf";
import { svgCircleHandler } from "../../handlers/circle.handler";

describe("Handler: svgCircleHandler()", () => {
  describe("when points are valid", () => {
    it("should handle svg circle", async () => {
      const doc = new JsPdf();
      let hasError = true;
      try {
        svgCircleHandler(
          doc,
          { x: 0, y: 0, svgWidth: 35, svgHeight: 35 },
          {
            tagName: "circle",
            props: {
             cx: 0,
             cy: 0,
             r: 15,
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
        svgCircleHandler(
          doc,
          { x: 0, y: 0, svgWidth: 35, svgHeight: 45 },
          {
            tagName: "circle",
            props: {
              x: 0,
              cy: undefined,
              r: 'k',
            } as any,
          }
        );
      } catch (e) {
        hasError = true;
      }

      expect(hasError).toBe(true);
    });
  });
});
