import { statSync, readdirSync } from "fs";

export const getAllDirDirs = (dirPath: string, arrayOfFiles: string[] = []) => {
  const files = readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllDirDirs(
        dirPath + "/" + file,
        arrayOfFiles.concat([dirPath + "/" + file])
      );
    }
  });

  return arrayOfFiles;
};
