import { expect, describe, it } from "@jest/globals";
import { svgPointsToPdfPaths } from "../../utils/svgPointsToPdfPaths.util";

describe("Util: polygnPointsToPdfPaths()", () => {
  describe("when connectToLast = false", () => {
    it("should convert svg points to pdf paths", () => {
      const paths = svgPointsToPdfPaths("0,10 30,40, 55,30");
      expect(paths).toMatchObject([
        { operator: "m", values: [0, 10] },
        { operator: "l", values: [30, 40] },
        { operator: "l", values: [55, 30] },
      ]);
    });

    describe("when missing one y coord", () => {
      it("should convert svg points to pdf paths", () => {
        const paths = svgPointsToPdfPaths("0,10 30,40, 55");
        expect(paths).toMatchObject([
          { operator: "m", values: [0, 10] },
          { operator: "l", values: [30, 40] },
        ]);
      });
    });
  });

  describe("when connectToLast = true", () => {
    it("should convert svg points to pdf paths", () => {
      const paths = svgPointsToPdfPaths("0,10 30,40, 55,30", true);
      expect(paths).toMatchObject([
        { operator: "m", values: [0, 10] },
        { operator: "l", values: [30, 40] },
        { operator: "l", values: [55, 30] },
        { operator: "h", values: [] },
      ]);
    });

    describe("when missing one y coord", () => {
      it("should convert svg points to pdf paths", () => {
        const paths = svgPointsToPdfPaths("0,10 30,40, 55", true);
        expect(paths).toMatchObject([
          { operator: "m", values: [0, 10] },
          { operator: "l", values: [30, 40] },
          { operator: "h", values: [] },
        ]);
      });
    });
  });
});
