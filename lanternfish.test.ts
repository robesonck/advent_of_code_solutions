const DATE_RATE = 6; // 0-based 7
const DAYS = 80;

const getLanternFishGrowthOld = (
  initialLanternFishes: number[],
  days: number = DAYS
) => {
  let fishes = [...initialLanternFishes];
  for (let passedDays = 0; passedDays < days; passedDays++) {
    const fishesLength = fishes.length;
    for (let i = 0; i < fishesLength; i++) {
      if (fishes[i] === 0) {
        fishes[i] = DATE_RATE;
        fishes.push(DATE_RATE + 2);
      } else {
        fishes[i] -= 1;
      }
    }
  }
  return fishes.length;
};

const getLanternFishGrowthOldV2 = (
  initialLanternFishes: number[],
  days: number = DAYS
) => {
  let count = 0;
  let fishes = [...initialLanternFishes];

  while (fishes.length > 0) {
    const fish = fishes.shift();
    count++;
    if (fish > days) continue;
    const rate = (days - fish) / (DATE_RATE + 1);
    const newFishes = rate % 1 === 0 ? rate : Math.ceil(rate);

    for (let j = 0; j < newFishes; j++) {
      const newFish = fish + 9 + 7 * j;
      fishes.push(newFish);
    }
    // console.log({ fishes, newFishes, fish });
  }
  return count;
};

const getNewFishesAmount = (fish: number, days: number) => {
  const rate = (days - fish) / (DATE_RATE + 1);
  const newFishesAmount = rate % 1 === 0 ? rate : Math.ceil(rate);
  return newFishesAmount;
};

const getNewFishesByAmount = (fish: number, newFishesAmount: number) => {
  const newFishes = [];
  for (let j = 0; j < newFishesAmount; j++) {
    const newFish = fish + 9 + 7 * j;
    newFishes.push(newFish);
  }
  return newFishes;
};

const getIndividualCount = (
  fish: number,
  days: number,
  fishCountMap: Map<number, number>
) => {
  if (fishCountMap.has(fish)) {
    return fishCountMap.get(fish);
  }
  let count = 1;
  if (fish <= days) {
    const newFishesAmount = getNewFishesAmount(fish, days);
    const newFishes = getNewFishesByAmount(fish, newFishesAmount);
    for (let i = 0; i < newFishes.length; i++) {
      const newFish = newFishes[i];
      count += getIndividualCount(newFish, days, fishCountMap);
    }
  }
  fishCountMap.set(fish, count);
  return count;
};

export const getLanternFishGrowth = (fishes: number[], days: number) => {
  let count = 0;
  // Map: key => fish value => deeply generated children
  const fishCountMap = new Map<number, number>();

  fishes.forEach((fish) => {
    const individualCount = getIndividualCount(fish, days, fishCountMap);
    count += individualCount;
  });

  return count;
};

const baseInput = [3, 4, 3, 1, 2];

const realProblem = [
  4, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 3, 4, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 3, 1, 3, 1, 1, 1, 5, 1, 2, 1, 1, 5, 3, 4, 2, 1, 1, 4, 1, 1, 5, 1, 1,
  5, 5, 1, 1, 5, 2, 1, 4, 1, 2, 1, 4, 5, 4, 1, 1, 1, 1, 3, 1, 1, 1, 4, 3, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 4,
  4, 1, 1, 3, 1, 3, 2, 4, 3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 5, 1, 1, 1, 1, 2,
  1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 4, 1, 5, 1, 3, 1, 1, 1, 1, 1, 5, 1, 1, 1, 3, 1,
  2, 1, 2, 1, 3, 4, 5, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 3,
  1, 1, 4, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3, 2, 1, 1, 1, 4, 2, 1, 1, 1, 4, 1, 1,
  2, 3, 1, 4, 1, 5, 1, 1, 1, 2, 1, 5, 3, 3, 3, 1, 5, 3, 1, 1, 1, 1, 1, 1, 1, 1,
  4, 5, 3, 1, 1, 5, 1, 1, 1, 4, 1, 1, 5, 1, 2, 3, 4, 2, 1, 5, 2, 1, 2, 5, 1, 1,
  1, 1, 4, 1, 2, 1, 1, 1, 2, 5, 1, 1, 5, 1, 1, 1, 3, 2, 4, 1, 3, 1, 1, 2, 1, 5,
  1, 3, 4, 4, 2, 2, 1, 1, 1, 1, 5, 1, 5, 2,
];

describe("LanternFish", () => {
  const longDays = 256;
  describe("getLanternFishGrowth", () => {
    it("Solves base problem with 18", () => {
      const result = getLanternFishGrowth(baseInput, 18);
      expect(result).toBe(26);
    });

    it("Solves base problem", () => {
      const result = getLanternFishGrowth(baseInput, DAYS);
      expect(result).toBe(5934);
    });

    it("Solves real problem", () => {
      const result = getLanternFishGrowth(realProblem, DAYS);
      expect(result).toBe(386640);
    });

    it("Solves base problem with 256", () => {
      const result = getLanternFishGrowth(baseInput, longDays);
      expect(result).toBe(26984457539);
    });

    it("Solves real problem with 256", () => {
      const result = getLanternFishGrowth(realProblem, longDays);
      console.log({ result });

      expect(result).toBe(1733403626279);
    });
  });
});
