import { expect, describe, it } from "@jest/globals";
import JsPdf from "jspdf";
import { svgLineHandler } from "../../handlers/line.handler";

describe("Handler: svgLineHandler()", () => {
  describe("when path is valid", () => {
    it("should handle svg path", async () => {
      const doc = new JsPdf();
      let hasError = true;
      try {
        svgLineHandler(
          doc,
          { x: 0, y: 0, svgWidth: 40, svgHeight: 40 },
          {
            tagName: "line",
            props: {
              x1: 0,
              y1: 0,
              x2: 40,
              y2: 40,
            },
          }
        );
        hasError = false;
      } catch (e) {}

      expect(hasError).toBe(false);
    });
  });

  describe("when path is invalid", () => {
    it("should throw error", async () => {
      const doc = new JsPdf();
      let hasError = false;
      try {
        svgLineHandler(
          doc,
          { x: 0, y: 0, svgWidth: 40, svgHeight: 40 },
          {
            tagName: "line",
            props: {
              x1: 0,
              y1: 0,
              y2: 40,
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
