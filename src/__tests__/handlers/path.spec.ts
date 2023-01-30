import { expect, describe, it } from "@jest/globals";
import JsPdf from "jspdf";
import { svgPathHandler } from "../../handlers/path.handler";

describe("Handler: svgPathHandler()", () => {
  describe("when path is valid", () => {
    it("should handle svg path", async () => {
      const doc = new JsPdf();
      let hasError = true;
      try {
        svgPathHandler(
          doc,
          { x: 0, y: 0, svgWidth: 795, svgHeight: 548 },
          {
            tagName: "path",
            props: {
              d: "M4 378V128L360 4.5C485.667 10.5 746.5 65.3 784.5 236.5C822.5 407.7 664.667 358.833 581 313L399.5 541.5L265.5 378H4Z",
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
        svgPathHandler(
          doc,
          { x: 0, y: 0, svgWidth: 795, svgHeight: 548 },
          {
            tagName: "path",
            props: {
              d: "U4 378JKV128L360    4.5C485.667 1 .3 784.5 236.5C822.5 407.7 664.667 358.833 581 313L399.5 541.5L265.5 378H4Z",
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
