export const bar = (patterns: string[]) => {};

export const foo = (patterns: string[]) => {};

const processInput = (input: string) => {
  return input.split("\n").map((line) => {
    return line;
  });
};

const baseInput = ``;

const realProblem = ``;

describe("Day n: ", () => {
  describe("bar", () => {
    it.only("Solves base problem", () => {
      const input = processInput(baseInput);
      const result = bar(input);
      expect(result).toBe(26);
    });

    it("Solves real problem", () => {
      const input = processInput(realProblem);
      const result = bar(input);
      console.log({ result });
      expect(result).toBeGreaterThan(0);
    });
  });

  describe("foo", () => {
    it("Solves base problem", () => {
      const input = processInput(baseInput);
      const result = foo(input);
      expect(result).toBe(61229);
    });

    it("Solves real problem", () => {
      const input = processInput(realProblem);
      const result = foo(input);
      console.log({ result });
      expect(result).toBeGreaterThan(0);
    });
  });
});
