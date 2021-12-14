const repeatingPolymer = (
  template: string,
  pairInsertions: Map<string, string>,
  steps: number
) => {
  if (steps === 0) {
    return template;
  }
  let resultingTemplate = template[0]; // Starting with first letter
  let pairs = [];
  for (let i = 1; i < template.length; i++) {
    const key = `${template[i - 1]}${template[i]}`;
    const newLetter = pairInsertions.get(key);
    resultingTemplate += `${newLetter}${template[i]}`;
    pairs.push(`${template[i - 1]}${newLetter}${template[i]}`);
  }
  return repeatingPolymer(resultingTemplate, pairInsertions, steps - 1);
};

export const repeatingPolymerCommon = (
  template: string,
  pairInsertions: Map<string, string>,
  steps: number
) => {
  const resultingPolymer = repeatingPolymer(template, pairInsertions, steps);
  let letterCountMap = new Map<string, number>();
  const addLetter = (letter: string) => {
    let count = letterCountMap.has(letter) ? letterCountMap.get(letter) + 1 : 1;
    letterCountMap.set(letter, count);
  };
  for (let i = 0; i < resultingPolymer.length; i++) {
    addLetter(resultingPolymer[i]);
  }
  const letterLengths = [...letterCountMap.values()].sort((a, b) => a - b);
  return letterLengths[letterLengths.length - 1] - letterLengths[0];
};

const addMapToMap = (map1: Map<string, number>, map2: Map<string, number>) => {
  map2.forEach((value, key) => {
    map1.set(key, (map1.get(key) || 0) + value);
  });
};

const addLetterToMap = (letter: string, map: Map<string, number>) => {
  map.set(letter, (map.get(letter) || 0) + 1);
};

class Resolver {
  totalSteps: number;
  pairInsertions: Map<string, string>;
  cache: Map<string, Map<string, number>>; // 'NN,4' => {A:3, C:7, ...}

  constructor(pairInsertions: Map<string, string>, totalSteps: number) {
    this.totalSteps = totalSteps;
    this.pairInsertions = pairInsertions;
    this.cache = new Map();
  }

  getCount(combination: string, remainingSteps: number) {
    const currentStep = this.totalSteps - remainingSteps;
    const key = `${combination},${currentStep}`;

    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const [left, right] = combination.split("");
    const middle = this.pairInsertions.get(combination);
    let currentCount = new Map<string, number>();
    if (remainingSteps === 0) {
      this.cache.set(key, currentCount);
      return currentCount;
    }
    addLetterToMap(middle, currentCount);
    const leftCount = this.getCount(`${left}${middle}`, remainingSteps - 1);
    const rightCount = this.getCount(`${middle}${right}`, remainingSteps - 1);
    addMapToMap(currentCount, leftCount);
    addMapToMap(currentCount, rightCount);
    this.cache.set(key, currentCount);
    return currentCount;
  }

  getRepeatingPolymer(template: string, steps: number) {
    let countMap = new Map<string, number>();
    addLetterToMap(template[0], countMap);

    for (let i = 1; i < template.length; i++) {
      const left = template[i - 1];
      const right = template[i];
      const key = `${left}${right}`;
      const currentCount = this.getCount(key, steps);
      addLetterToMap(right, countMap);
      addMapToMap(countMap, currentCount);
    }

    const letterLengths = [...countMap.values()].sort((a, b) => a - b);
    return letterLengths[letterLengths.length - 1] - letterLengths[0];
  }
}

export const repeatingPolymerUltraFast = (
  template: string,
  pairInsertions: Map<string, string>,
  steps: number
) => {
  const resolver = new Resolver(pairInsertions, steps);
  return resolver.getRepeatingPolymer(template, steps);
};

const processInput = (input: string) => {
  const [template, _, ...insertions] = input.split("\n");
  const pairInsertions = new Map<string, string>();

  insertions.forEach((line) => {
    const [from, to] = line.split(" -> ");
    pairInsertions.set(from, to);
  });
  return { template, pairInsertions };
};

const baseInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

const realProblem = `BVBNBVPOKVFHBVCSHCFO

SO -> V
PB -> P
HV -> N
VF -> O
KS -> F
BB -> C
SH -> H
SB -> C
FS -> F
PV -> F
BC -> K
SF -> S
NO -> O
SK -> C
PO -> N
VK -> F
FC -> C
VV -> S
SV -> S
HH -> K
FH -> K
HN -> O
NP -> F
PK -> N
VO -> K
NC -> C
KP -> B
CS -> C
KO -> F
BK -> N
OO -> N
CF -> H
KN -> C
BV -> S
OK -> O
CN -> F
OP -> O
VP -> N
OC -> P
NH -> C
VN -> S
VC -> B
NF -> H
FO -> H
CC -> B
KB -> N
CP -> N
HK -> N
FB -> H
BH -> V
BN -> N
KC -> F
CV -> K
SP -> V
VS -> P
KF -> S
CH -> V
NS -> N
HS -> O
CK -> K
NB -> O
OF -> K
VB -> N
PS -> B
KH -> P
BS -> C
VH -> C
KK -> F
FN -> F
BP -> B
HF -> O
HB -> V
OV -> H
NV -> N
HO -> S
OS -> H
SS -> K
BO -> V
OB -> K
HP -> P
CO -> B
PP -> K
HC -> N
BF -> S
NK -> S
ON -> P
PH -> C
FV -> H
CB -> H
PC -> K
FF -> P
PN -> P
NN -> O
PF -> F
SC -> C
FK -> K
SN -> K
KV -> P
FP -> B
OH -> F`;

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

        const result = repeatingPolymerUltraFast(
          template,
          pairInsertions,
          baseSteps
        );
        expect(result).toBe(1588);
      });

      it("Solves real problem", () => {
        const { template, pairInsertions } = processInput(realProblem);
        const result = repeatingPolymerUltraFast(
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

        const result = repeatingPolymerUltraFast(
          template,
          pairInsertions,
          realSteps
        );

        expect(result).toBe(2188189693529);
      });

      it("Solves real problem", () => {
        const { template, pairInsertions } = processInput(realProblem);
        const result = repeatingPolymerUltraFast(
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
