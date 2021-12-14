export const binaryDiagnostic = (input: number[][]) => {
  let gammaRate = "";
  let epsilonRate = "";
  const xLength = input[0].length;
  for (let i = 0; i < xLength; i++) {
    const counts = { 1: 0, 0: 0 };
    for (let j = 0; j < input.length; j++) {
      const element = input[j][i];
      counts[element] += 1;
    }
    if (counts[0] > counts[1]) {
      gammaRate += 0;
      epsilonRate += 1;
    } else {
      gammaRate += 1;
      epsilonRate += 0;
    }
  }
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

const helper = (input: number[][], type: "oxygen" | "co2") => {
  const newInput = [...input];
  const xLength = newInput[0].length;

  for (let i = 0; i < xLength && newInput.length > 1; i++) {
    const counts = { 0: 0, 1: 0 };
    const indexes = { 0: [], 1: [] };

    for (let j = 0; j < newInput.length; j++) {
      const element = newInput[j][i];
      counts[element] += 1;
      indexes[element].push(j);
    }
    let elementToRemove;
    if (type === "oxygen") {
      elementToRemove = counts[1] >= counts[0] ? 0 : 1;
    } else {
      elementToRemove = counts[0] <= counts[1] ? 1 : 0;
    }
    let removedCount = 0; // Every time we remove, the indexes change
    indexes[elementToRemove].forEach((index) => {
      newInput.splice(index - removedCount, 1);
      removedCount++;
    });
  }
  return parseInt(newInput[0].join(""), 2);
};

const getLifeSupportRating = (input: number[][]) => {
  const oxygenGeneratorRating = helper(input, "oxygen");
  const cO2ScrubberRating = helper(input, "co2");

  return oxygenGeneratorRating * cO2ScrubberRating;
};

const baseInput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

const realProblem = `110011101111
011110010111
101010111001
110011100110
110010000101
000111001111
001111110011
100000111010
101010000110
001000100011
110000000100
000100110000
010010101110
101110111101
100000100111
111011010111
001101010010
010010001111
010101100001
111001101101
110110000011
000110111111
111111100010
110010101011
010011100100
110011010010
100001111010
000101000110
110001000111
110110000001
101011010110
101001011010
100101000110
101010110001
111000110110
111000001111
010111101111
000001001011
000001111101
000111010101
110101111110
110000100101
011101110101
011101000000
111011100101
011100001101
000010100001
010010010100
001010100110
001111110110
111110101001
000010101101
100111000100
000001110000
011010110011
111111110111
011100010011
010001100101
000100110101
101101001111
001000011101
101100000000
000100101000
100100010010
111010011011
101010001010
110111111100
010111000001
010110111010
001011110110
100010001100
010000000011
101101101001
011110101101
101101010101
011011101110
001110110100
110100101000
101000000101
000101100010
100000111111
110100101011
010011110110
011001100110
011000100010
100110001101
010011110010
010011010010
111001110011
001010101100
001011100111
001101110011
110011101011
100001100110
011011101000
001001011100
110000110110
111100010010
011110110100
110000111000
110000001100
101110111011
110010111001
100001010110
011111110110
001101010000
101110110010
011101001101
011100001001
011110101111
010000101011
101110111111
000010100011
001010110010
111101111011
000101101010
111011101011
101001000001
100010100101
100110100010
101001111011
010110001111
010001000100
100101001111
100100110101
011010101110
111100001000
010000110001
000101000100
100011011011
101101010111
011110101000
011011100110
010111101001
001110000101
100100100011
010001110011
000111101111
001100011000
010100010011
110000100011
000010010001
000101110111
101011011101
101001111000
011101111010
111011000011
110111100101
000110111010
100101011110
000010000001
010110011111
011011000100
101001111100
101101101010
100011100111
001100100101
111010101101
010010010101
110001101100
011000100101
011010100010
010110010001
100101011010
001011100001
000100010001
110001100000
001011001100
110111111001
100110110000
001110101001
100001001101
101111101101
101010001110
000010011000
010011101100
101000110100
010001001110
000111100110
010010011100
011011111100
011000110110
101000011110
110111011001
111011000000
101000101111
011110100111
101000011010
011100000110
110100001000
010101100011
100110001010
001100111101
101100111111
000000100101
000110010001
000010101011
111100000001
101011001000
010100111111
010001010011
010001010100
010000100001
110101001011
000010001101
101110011001
100010101100
110000011111
100111010111
010100000110
000000100010
111001000100
000010110111
111010000100
101001010110
110000000010
001110000001
111001100001
001001001011
000111111000
000001101000
001010100011
011110010011
011110110101
101010001011
110110110011
001100010011
001011000011
100011011010
101001110011
111011111111
011100101110
101101101111
011001000000
100110011001
111011000100
001010110001
010000111011
101101111010
010001111111
001010101110
000111011111
100010100011
011001100101
010010000000
110001101011
000010010000
011001110010
011111111111
000100010101
000001010001
101111110010
010100001010
001100101110
010010101001
100010000110
100110010001
011001111100
000000111011
100011101000
100110101101
110111001110
110101001100
101101011110
100100111101
101000100101
011010011101
010011110011
101110111000
110000010110
101110000110
001001100110
000001001010
001111011001
110100000011
101011010011
111010101001
000100111000
011001010100
001101101011
011110011001
000100101001
000010001000
011101100100
110000001000
010111000100
101101111100
110100011110
001111000100
001011000110
011110011010
010101100111
110111010110
001001011101
011111100100
110001000101
001101011000
001001110001
000001100101
111100010001
111100100110
001000001000
010111110010
011011111011
101101111011
100100000010
001010001000
011100110011
010101000101
101110001010
001001001101
110011010101
000101010101
100101010100
101001101000
000111011001
001110110101
000011100101
001100101111
001110010101
000111010100
110001110111
101110010100
010110111111
010110111001
101011111001
101101100010
100010110000
111110000011
011101011010
010101101110
100000001101
111001010001
101010101101
111110001110
010101010000
011100001010
011011110100
101001001111
011110110010
101101000000
111000101101
001001111000
011000010111
001000000011
010111110111
111011100001
010110011000
110010000100
010001101011
000110000010
100011100100
010100101111
110011001111
100001111110
100000011110
000001010010
001001010100
000110100110
010010011101
101000000100
010010111000
000001000010
110010100101
101010000100
111110101101
100000110010
100110110001
001011001101
110111011111
101111011000
111010110001
101111100111
110100111100
110000000001
000010100110
110000010101
010101111000
001001110101
010101001000
010011011101
100111100010
111010011000
011001000110
010101110111
101111100001
101110101100
101010010110
101100001001
110111101101
100101001100
111111010010
010010100010
111100010111
000101011100
100100101100
100111011100
100000000010
110110001100
011000110010
011000010101
101110011110
101001110000
001000001010
001101101001
011001000111
010010100001
011100100100
001000111001
110111111110
011100101000
110101100010
111110110010
100001110111
101011110101
001101010011
001000110100
001000110010
110101111010
101010010011
110111010111
001001011110
010110101011
100100101101
000000001100
001111101010
000000000000
110011010011
101010111101
011010000000
110111000101
111000010111
101100000110
011001101110
100001100011
000110000110
110010000010
100011101111
011010110001
101111100110
111110000101
000100110111
101111000010
011111001010
000110111000
101011100101
111100011011
111000011011
011001100001
000110001110
101000111010
011000110011
001101000011
010011100000
011101001110
001010100000
101111110011
100111111010
001110010010
111000110001
101110001000
011010110000
100011110110
010100101001
000011111101
111000000001
001001011000
000110000000
011001010110
111001101010
101001011000
011000010011
001010101101
010100010000
111111000010
101001001011
101000111001
010110110010
111010110100
110100100100
001000011000
011011011000
011000111110
010010010001
001010010000
100100001110
110101010000
011011010000
011011100000
100010010010
001000001001
111011011101
010110010011
111111101100
100111011011
010010111010
001101101110
010000011111
111011000110
111000011100
111100110000
111100101011
010100000100
001111111100
000111100111
100110001111
001111001100
000010001001
101011100111
110010010100
011010001011
011100111100
010101011111
110010110000
110110100010
011001110000
010011111000
001001001001
101110010011
000111110100
100110000100
011100101011
000110001000
001111100101
000111000000
101110100011
000100000011
111111100011
101011101001
010000111101
011110111100
110100111011
110110011001
101111110110
011000100001
101100111011
110010111011
001101011101
110010110001
000000101011
111011110101
011000010110
110011110010
011111011000
010111100101
110111111101
000001101001
011111110000
101000111101
011010000100
110000010100
110101101111
111000110011
001100001111
111101010110
001000111111
000101000101
000000101100
000111011011
010110000011
001111000101
111000001000
001001101100
011011110111
001000101100
111011001001
010001100100
011011100010
101111010011
101111010101
100100101110
111011011111
010100011011
000000000110
010011101001
011001110101
110010101110
011100011001
110001101110
001111010100
000011001100
100010010001
101011110100
000111010111
000101101001
111001101000
000110110001
010110111110
101011000101
110000000111
010110011010
001101000000
101111001100
001000100000
000101110010
111010111001
000110011110
011011100101
001101111110
000010010100
101001001100
000010010110
000010010101
011000000110
000111000011
101010011100
111100001110
011000011010
001110001001
101010111100
101111001110
011100010010
011110001000
111011110001
101100110011
010000000100
010001011010
101111101010
100101101011
110011011010
101011010001
101100110010
000111101000
101011100011
100010010110
111001110101
100011111011
101011010100
111100110001
001011111111
010000001111
011111101111
001011001011
000111001110
101111000111
110001111010
100001100111
110110101110
110100010000
110101010110
101101000100
000101100111
001110111101
110100100000
011000101000
010000001001
001101001010
101111001000
100001110110
111110100011
110011111010
101100011100
011000100000
011111111101
101101101100
111100110011
010011101010
011010111101
000100010111
101001011101
110111000111
011101100001
111101000010
000100011010
010111010010
000011110010
010001110100
011100110101
011001100010
010100001100
000001110101
001111100001
001110000110
100101110000
000100100000
101100111101
001100011010
011011011010
011101100110
001101001000
001001010111
000001100000
100110001000
010010111111
101110100010
001101110101
011101010100
101001010111
111100111101
101110100101
110110110110
011011100011
000111010001
100000011100
000111111101
111111011101
111000100110
001000011011
000101001111
011101010101
100100010111
111101100100
011100001100
101001001101
001101001001
001111000111
001100010101
000010111111
011001100100
111100100010
010100100011
001011111000
110100101111
011010010000
101011000011
100100110010
010111001101
101011010111
010000110010
011111101000
001000000111
101011000110
001111101011
000001101110
000100011111
110100010010
010011101110
001111011101
010100011100
101101001000
101010000101
010111010000
001100001101
011111011101
101101100101
010111010111
001000010000
111100100111
011010001000
111111001000
100010100001
010010010111
001110011100
010111011011
111000111000
111100001010
100100011111
110010100100
101010001001
110011100111
110101000101
000011100001
100111011111
110011011011
101000010110
110010111111
111000001011
111001000111
111101101111
110000100100
011011110000
010000100010
000011010010
000000011100
100110000010
110110111101
010010001011
000010111100
100000010110
110010101010
110001000110
000110101110
000010100000
011111000001
100010011001
111111101010
001001111011
101111010110
010010110000
111000010010
111011010110
010001111000
011100000101
001001101000
110101101001
110010101000
111111000101
101000010111
111101010011
101110101010
001000101000
001101111111
111100111111
110011000001
011000111001
111000000011
111110011110
011101000001
001111110000
000000000010
011011001101
110000001101
000001110111
011000111111
001101100110
100000011000
010100001110
011100010100
011111011100
100100011000
110011001011
111111011010
101111010100
110101010101
011110011011
111100101101
010001010000
101010101010
101101101110
010101101001
010101011110
110001000000
101101111001
100011101110
001101010110
100111101010
011010111010
110010100010
010100111000
110010110100
010011000110
110010111000
111010001001
000000111110
110101010100
110010001001
110101011000
110111000001
000110110100
110010010110
011000011100
100011001001
111000111011
001100100111
001111101000
100100000001
000111001101
000000101111
000111110111
100000000101
010111011100
011101100111
011111000101
010010011110
000001110110
111001110010
111000011101
111101110010
110110010011
000010111110
010011101000
111010011100
111011001010
101011001011
110000000011
101000010010
110100110011
100101010111
101101110100
010001000001
111001001011
011011010110
110100010111
111000011010
000100011011
101000011011
001010110011
100110111000
010001011111
111101111110
111100001100
010011011011
101101110000
111001010101
010101011100
011001011110
001000000110
010011011000
000000001001
010110100101
110101101010
011100011010
101101011100
100000111100
100111100000
111001111000
000110011111
010110100000
000010011100
110101001110
000001001001
011010010001
010101000010
001011101011
110001000011
110111100001
110101011010
101001111110
000001111001
001100110010
110000101001
000111000001
011000000111
100010101110
011111001110
001111111111
011111010001
000111110101
100010010100
111100000010
001011111001
100101111111
101111110100
111101010100
011100011101
111011001100
010111000011
010011010100
110011000100
000011101111
100111111111
100010001000
111101010001
111101001011
101100000010
011010111001
101101001101
100011110100
111101111111
011110010001
001011001001
100000011001
101011011010
011100101100
111100100000
100000000001
010000011011
101010011000
111101101000
101011001101
011111000111
100010110011
001100110100
000111010000
100101101100
010011100001
010101001111
011101010001
100011000011
010101100100
111111010001
000011111100
111100101000
100100010011
101000001000
110010000110
010101010011
000110011010
110010010101
001101011010
101100010111
100010011100
101001101010
100100000110
100101111101
011001001101
001101001111
011110001111
000101011010
111101001100
001100010001
101100001100
011001000001
011101110010
001011001110
100101110001
111111110001
001100010110
101001010100
001011111010
000011001001
000101011000
000111011000
010000010101
101010110101
010101000000
100010110101
111110010001
110010100001
000111010110`;

const prepareInput = (input: string) =>
  input.split("\n").map((line) => line.split("").map(Number));

describe("Binary Diagnostic", () => {
  describe("binaryDiagnostic", () => {
    it("Solves base problem", () => {
      const input = prepareInput(baseInput);
      const result = binaryDiagnostic(input);
      expect(result).toBe(198);
    });

    it("Solves real problem", () => {
      const input = prepareInput(realProblem);
      const result = binaryDiagnostic(input);
      console.log({ result });

      expect(result).toBe(4006064);
    });
  });

  describe("getLifeSupportRating", () => {
    it("Solves base problem", () => {
      const input = prepareInput(baseInput);
      expect(getLifeSupportRating(input)).toBe(230);
    });

    it("Solves real problem", () => {
      const input = prepareInput(realProblem);
      const result = getLifeSupportRating(input);
      expect(result).toBe(5941884);
    });
  });
});
