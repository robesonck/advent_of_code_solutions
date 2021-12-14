import fs from "fs";
import path from "path";

export const readFile = (origin: string, relativeLocation: string) => {
  return fs.readFileSync(path.resolve(origin, relativeLocation), "utf8");
};
