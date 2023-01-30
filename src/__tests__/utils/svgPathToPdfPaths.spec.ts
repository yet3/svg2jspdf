import { expect, describe, it } from "@jest/globals";
import { svgPathToPdfPaths } from "../../utils/svgPathToPdfPaths.util";

describe("Util: svgPathToPdfPaths()", () => {
  describe("when path contains all operators", () => {
    it("should convert svg path to jsPdf paths", () => {
      const svgPath =
        "M4 378V128L360 4.5C485.667 10.5 746.5 65.3 784.5 236.5C822.5 407.7 664.667 358.833 581 313L399.5 541.5L265.5 378H4Z";
      expect(svgPathToPdfPaths(svgPath)).toMatchObject([
        { operator: "m", svgOperator: "m", values: [4, 378] },
        { operator: "l", svgOperator: "v", values: [4, 128] },
        { operator: "l", svgOperator: "l", values: [360, 4.5] },
        {
          operator: "c",
          svgOperator: "c",
          values: [485.667, 10.5, 746.5, 65.3, 784.5, 236.5],
        },
        {
          operator: "c",
          svgOperator: "c",
          values: [822.5, 407.7, 664.667, 358.833, 581, 313],
        },
        { operator: "l", svgOperator: "l", values: [399.5, 541.5] },
        { operator: "l", svgOperator: "l", values: [265.5, 378] },
        { operator: "l", svgOperator: "h", values: [4, 378] },
        { operator: "h", svgOperator: "z", values: [] },
      ]);
    });
  });
});
