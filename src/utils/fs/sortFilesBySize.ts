import { statSync } from "fs";

export const sortFilesBySize = (files: string[]) => {
  const filesCloned = [...files];
  const sizeDict: { [key: string]: number } = {};
  filesCloned.forEach((element) => {
    sizeDict[element] = statSync(element).size;
  });
  filesCloned.sort((a, b) => sizeDict[b] - sizeDict[a]);
  return filesCloned;
};
