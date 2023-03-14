import { BenchmarkResult } from "../common";

export function createTable(results: BenchmarkResult[]): string {
  const tableHeader =
    "| Function | Average Time (ms) | Max Time (ms) | Min Time (ms) | Avg Time vs shortest | Min Time vs shortest | Max Time vs shortest |\n| --- | --- | --- | --- | --- |\n";
  const tableRows = results.map(
    (result) =>
      `| ${result.name} | ${result.averageTime.toFixed(
        2
      )}ms | ${result.maxTime.toFixed(2)}ms | ${result.minTime.toFixed(
        2
      )}ms | ${result.averageDif.toFixed(2)} | ${result.minDif.toFixed(
        2
      )} | ${result.maxDif.toFixed(2)} |\n`
  );
  return tableHeader + tableRows.join("");
}
