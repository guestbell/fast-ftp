import {
  BenchmarkConfig,
  BenchmarkFtpConfig,
  BenchmarkFunction,
  BenchmarkResult,
} from "./common";

export async function benchmark({
  repetitions,
  functions,
  config,
  options,
}: {
  repetitions: number;
  functions: BenchmarkFunction[];
  config: BenchmarkFtpConfig;
  options: BenchmarkConfig;
}): Promise<BenchmarkResult[]> {
  const results: BenchmarkResult[] = [];
  let shortestAvgTime = Infinity;
  let shortestMinTime = Infinity;
  let shortestMaxTime = Infinity;
  for (const { function: benchmarkFunction, name } of functions) {
    const times: number[] = [];
    console.time(`All ${name}`);
    for (let i = 0; i < repetitions; i++) {
      console.time(`${i + 1}. ${name}`);
      const start = Date.now();
      await benchmarkFunction(config, options);
      const end = Date.now();
      console.timeEnd(`${i + 1}. ${name}`);

      const time = end - start;
      times.push(time);
    }
    console.timeEnd(`All ${name}`);

    const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
    const maxTime = Math.max(...times);
    const minTime = Math.min(...times);

    if (averageTime < shortestAvgTime) {
      shortestAvgTime = averageTime;
    }
    if (minTime < shortestMinTime) {
      shortestMinTime = minTime;
    }
    if (maxTime < shortestMaxTime) {
      shortestMaxTime = maxTime;
    }

    results.push({
      name,
      averageTime,
      maxTime,
      minTime,
      averageDif: 0,
      maxDif: 0,
      minDif: 0,
    });
  }

  for (const result of results) {
    result.averageDif = result.averageTime / shortestAvgTime;
    result.minDif = result.minTime / shortestMinTime;
    result.maxDif = result.maxTime / shortestMaxTime;
  }

  return results;
}
