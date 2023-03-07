import { AsyncClient } from "../../types";

export const deleteDirectories = async (
  clients: AsyncClient[],
  allDirs: string[]
) => {
  allDirs.sort((a, b) => {
    const aNumSlashes = a.split("/").length;
    const bNumSlashes = b.split("/").length;

    return bNumSlashes - aNumSlashes;
  });
  for (let index = 0; index < allDirs.length; index++) {
    const dir = allDirs[index];
    await clients[0].rmdirAsync(dir, true).catch((err) => {
      if (err && err.code !== 450) {
        console.error(err);
        throw err;
      }
    });
  }
};
