import { expect, describe, it } from "@jest/globals";
import { handleWidthAndHeight } from "../../utils/widthAndHeight.util";

describe("Util: handleWidthAndHeight()", () => {
  describe("when width and height are undefined", () => {
    it("should return wScale and hScale equal to 1", () => {
      const { wScale, hScale } = handleWidthAndHeight({
        svgWidth: 50,
        svgHeight: 50,
      });

      expect(wScale).toBe(1);
      expect(hScale).toBe(1);
    });
  });

  describe("when only width is defined", () => {
    it("should return wScale and hScale equal to 3", () => {
      const { wScale, hScale } = handleWidthAndHeight({
        width: 150,
        svgWidth: 50,
        svgHeight: 50,
      });

      expect(wScale).toBe(3);
      expect(hScale).toBe(3);
    });
  });

  describe("when only height is defined", () => {
    it("should return wScale and hScale equal to 3", () => {
      const { wScale, hScale } = handleWidthAndHeight({
        height: 150,
        svgWidth: 50,
        svgHeight: 50,
      });

      expect(wScale).toBe(3);
      expect(hScale).toBe(3);
    });
  });

  describe("when both width and height are defined", () => {
    it("should return wScale equal to 2.7 and hScale equal to 0.7", () => {
      const { wScale, hScale } = handleWidthAndHeight({
        width: 135,
        height: 35,
        svgWidth: 50,
        svgHeight: 50,
      });

      expect(wScale).toBe(2.7);
      expect(hScale).toBe(0.7);
    });
  });
});
