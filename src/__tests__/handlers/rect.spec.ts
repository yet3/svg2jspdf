import { expect, describe, it } from "@jest/globals";
import JsPdf from "jspdf";
import { svgRectHandler } from "../../handlers/rect.handler";

describe("Handler: svgRectHandler()", () => {
  describe("when points are valid", () => {
    it("should handle svg rect", async () => {
      const doc = new JsPdf();
      let hasError = true;
      try {
        svgRectHandler(
          doc,
          { x: 0, y: 0, svgWidth: 35, svgHeight: 35 },
          {
            tagName: "rect",
            props: {
              x: 0,
              y: 0,
              width: 35,
              height: 35,
              rx: 5,
              ry: 5,
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
        svgRectHandler(
          doc,
          { x: 0, y: 0, svgWidth: 35, svgHeight: 45 },
          {
            tagName: "rect",
            props: {
              width: undefined,
              x: 0,
              y: 0,
              height: 15,
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
