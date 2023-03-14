import * as fs from "fs";

export function saveTableToFile(table: string) {
  fs.writeFile("result.txt", table, (err) => {
    if (err) throw err;
    console.log("Table saved to result.txt");
  });
}
