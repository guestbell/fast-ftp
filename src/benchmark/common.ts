export type BenchmarkFtpConfig = {
  host: string;
  user: string;
  password: string;
};

export type BenchmarkConfig = { remoteRoot: string; localRoot: string };

export type BenchmarkResult = {
  name: string;
  averageTime: number;
  maxTime: number;
  minTime: number;
  averageDif: number;
  maxDif: number;
  minDif: number;
};

export type BenchmarkFunction = {
  function: (
    config: BenchmarkFtpConfig,
    options: BenchmarkConfig
  ) => Promise<void>;
  name: string;
};
