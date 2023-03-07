import { statSync, readdirSync } from "fs";
import { join } from "path";

export const getAllDirFiles = (
  dirPath: string,
  arrayOfFiles: string[] = []
) => {
  const files = readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllDirFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(join(dirPath, file));
    }
  });

  return arrayOfFiles;
};
