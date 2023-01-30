import { expect, describe, it } from "@jest/globals";
import { svgPathOpToPdfOp } from "../../utils/svgPathOpToPdfOp.util";

describe("Util: svgPathOpToPdfOp()", () => {
  describe("when incorrect operator is provided", () => {
    it("should return: m", () => {
      expect(svgPathOpToPdfOp("u")).toBe("m");
      expect(svgPathOpToPdfOp("b")).toBe("m");
    });
  });

  describe("when correct operator is provided", () => {
    it("should return: m", () => {
      expect(svgPathOpToPdfOp("m")).toBe("m");
    });

    it("should return: l", () => {
      expect(svgPathOpToPdfOp("l")).toBe("l");
      expect(svgPathOpToPdfOp("h")).toBe("l");
      expect(svgPathOpToPdfOp("v")).toBe("l");
    });

    it("should return: c", () => {
      expect(svgPathOpToPdfOp("c")).toBe("c");
    });

    it("should return: h", () => {
      expect(svgPathOpToPdfOp("z")).toBe("h");
    });
  });
});
