import { AsyncClient } from "../../types";
import { join } from "path";
import { ListingElement } from "ftp";

export const getAllRemote = async (
  clients: AsyncClient[],
  remoteDir: string,
  arrayOfFiles: ListingElement[] = []
) => {
  const client = clients[0];
  const files = await client.listAsync(remoteDir.replaceAll(/\\/g, "/"));
  arrayOfFiles = arrayOfFiles || [];
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    if (file.type === "d") {
      arrayOfFiles = await getAllRemote(
        clients,
        join(remoteDir, file.name).replaceAll(/\\/g, "/"),
        arrayOfFiles.concat([
          {
            ...file,
            name: join(remoteDir, file.name).replaceAll(/\\/g, "/"),
          },
        ])
      );
    } else {
      arrayOfFiles.push({
        ...file,
        name: join(remoteDir, file.name).replaceAll(/\\/g, "/"),
      });
    }
  }

  return arrayOfFiles;
};
