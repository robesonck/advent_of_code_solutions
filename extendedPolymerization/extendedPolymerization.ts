/* Get new polymer after given steps */
export const repeatingPolymer = (
  template: string,
  pairInsertions: Map<string, string>,
  steps: number
): string => {
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

/* First approach, not optimized. */
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

/* Util to add the second map values to the first one, doing a sum of the values */
const addMapToMap = (map1: Map<string, number>, map2: Map<string, number>) => {
  map2.forEach((value, key) => {
    map1.set(key, (map1.get(key) || 0) + value);
  });
};

/* Util. If there's a letter add 1 to the counter, else add new one with only 1  */
const addLetterToMap = (letter: string, map: Map<string, number>) => {
  map.set(letter, (map.get(letter) || 0) + 1);
};

type LetterCount = Map<string, number>;

class PolymerCounter {
  totalSteps: number;
  pairInsertions: Map<string, string>;
  cache: Map<string, LetterCount>; // 'NN,4' => {A:3, C:7, ...}

  // Receiving these arguments just to avoid passing them in all recursive calls
  constructor(pairInsertions: Map<string, string>, totalSteps: number) {
    this.totalSteps = totalSteps;
    this.pairInsertions = pairInsertions;
    this.cache = new Map();
  }

  getLetterCount(combination: string, remainingSteps: number) {
    const currentStep = this.totalSteps - remainingSteps;
    const key = `${combination},${currentStep}`;

    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const [left, right] = combination.split("");
    const middle = this.pairInsertions.get(combination);
    let letterCount: LetterCount = new Map();
    if (remainingSteps === 0) {
      this.cache.set(key, letterCount);
      return letterCount;
    }
    addLetterToMap(middle, letterCount);
    const leftCount = this.getLetterCount(
      `${left}${middle}`,
      remainingSteps - 1
    );
    const rightCount = this.getLetterCount(
      `${middle}${right}`,
      remainingSteps - 1
    );
    addMapToMap(letterCount, leftCount);
    addMapToMap(letterCount, rightCount);
    this.cache.set(key, letterCount);
    return letterCount;
  }

  getRepeatingPolymer(template: string, steps: number) {
    let countMap: LetterCount = new Map();
    addLetterToMap(template[0], countMap);

    for (let i = 1; i < template.length; i++) {
      const left = template[i - 1];
      const right = template[i];
      const key = `${left}${right}`;
      const currentCount = this.getLetterCount(key, steps);
      addLetterToMap(right, countMap);
      addMapToMap(countMap, currentCount);
    }

    const letterLengths = [...countMap.values()].sort((a, b) => a - b);
    return letterLengths[letterLengths.length - 1] - letterLengths[0];
  }
}

/* Fast approach with Dynamic programming */
export const repeatingPolymerOptimized = (
  template: string,
  pairInsertions: Map<string, string>,
  steps: number
) => {
  const resolver = new PolymerCounter(pairInsertions, steps);
  return resolver.getRepeatingPolymer(template, steps);
};
