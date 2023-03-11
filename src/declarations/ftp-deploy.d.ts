declare module "ftp-deploy" {
  export type FtpDeployConfig = {};
  export class FtpDeploy {
    public async deploy(
      config: FtpDeployConfig,
      callback: (err: Error, res: unknown) => void
    ) {}
  }
  export default FtpDeploy;
}
