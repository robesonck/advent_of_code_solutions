import { readFile } from "../utils";
import {
  repeatingPolymer,
  repeatingPolymerCommon,
  repeatingPolymerOptimized,
} from "./extendedPolymerization";

const processInput = (input: string) => {
  const [template, _, ...insertions] = input.split("\n");
  const pairInsertions = new Map<string, string>();

  insertions.forEach((line) => {
    const [from, to] = line.split(" -> ");
    pairInsertions.set(from, to);
  });
  return { template, pairInsertions };
};

const baseInput = readFile(__dirname, "./baseInput.txt");
const realProblem = readFile(__dirname, "./realInput.txt");

const baseSteps = 10;
const realSteps = 40;

describe("Day 14: Extended Polymerization", () => {
  describe("repeatingPolymer", () => {
    it("Solves base problem with 1", () => {
      const { template, pairInsertions } = processInput(baseInput);
      const result = repeatingPolymer(template, pairInsertions, 1);
      expect(result).toBe("NCNBCHB");
    });

    it("Solves base problem with 4", () => {
      const { template, pairInsertions } = processInput(baseInput);
      const result = repeatingPolymer(template, pairInsertions, 4);
      expect(result).toBe("NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB");
    });
  });

  describe("repeatingPolymerCommon", () => {
    it("Solves base problem ", () => {
      const { template, pairInsertions } = processInput(baseInput);

      const result = repeatingPolymerCommon(
        template,
        pairInsertions,
        baseSteps
      );
      expect(result).toBe(1588);
    });

    it("Solves real problem", () => {
      const { template, pairInsertions } = processInput(realProblem);
      const result = repeatingPolymerCommon(
        template,
        pairInsertions,
        baseSteps
      );
      expect(result).toBe(2703);
    });
  });

  describe("repeatingPolymerUltraFast", () => {
    describe("baseSteps", () => {
      it("Solves base problem ", () => {
        const { template, pairInsertions } = processInput(baseInput);

        const result = repeatingPolymerOptimized(
          template,
          pairInsertions,
          baseSteps
        );
        expect(result).toBe(1588);
      });

      it("Solves real problem", () => {
        const { template, pairInsertions } = processInput(realProblem);
        const result = repeatingPolymerOptimized(
          template,
          pairInsertions,
          baseSteps
        );
        expect(result).toBe(2703);
      });
    });

    describe("realSteps", () => {
      it("Solves base problem ", () => {
        const { template, pairInsertions } = processInput(baseInput);

        const result = repeatingPolymerOptimized(
          template,
          pairInsertions,
          realSteps
        );

        expect(result).toBe(2188189693529);
      });

      it("Solves real problem", () => {
        const { template, pairInsertions } = processInput(realProblem);
        const result = repeatingPolymerOptimized(
          template,
          pairInsertions,
          realSteps
        );
        expect(result).not.toBe(2984946368462);
        expect(result).toBe(2984946368465);
      });
    });
  });
});
