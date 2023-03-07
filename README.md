Supercharge your ftp deployments with **fast-ftp**.

## Benchmark

Uploading [guestbell.com](https://guestbell.com) - ~500 files, 27 directories some 5 levels deep

|                                                       | Time taken    | Improvement  |
| :---:                                                 | :---:         | :---:        |
| [basic-ftp](https://www.npmjs.com/package/basic-ftp)  | 217sec        | 10x          |
| [ftp-deploy](https://www.npmjs.com/package/ftp-deploy)| 197sec        | 9x           |
| **fast-ftp**                                          | 22sec         | 1x           |

## Why is it fast?

Ftp doesn't support parallel operations on a single connections. But you can usually spawn many connections. **fast-ftp** does that + leverages optimized algorithms to increase speed of common tasks like uploading whole directories, deleting whole directories etc.

## Standard use-case

Fast ftp was made to accelerate uploading static sites - 1 directory with many files (we also expose api for custom use-cases). We also want the site to work during deployment - to not enter a broken state. How can that happen? If you first delete the whole site and then start uploading or simply just sync directories. Both of these can lead to broken sites if user navigates to it at a wrong moment.

### How it works?

1. Directory is first uploaded to _temp ftp directory_
2. Site directory is renamed to _old ftp directory_
3. _Temp ftp directory_ is renamed to _site directory_

This way the downtime is close to 0 and there's not risk of broken sites.

## Getting Started

1. Installation:

```bash
npm fast-ftp
# or
yarn fast-ftp
```

2. Config Ftp Client

Fast-ftp reads ftp client config (sensitive) from environment variables.

These are required:
FTP_HOST
FTP_USERNAME
FTP_PASSWORD
These are optional:
FTP_PORT
FTP_SECURE

We also support deploy.env config file. Sample follows:

```
FTP_HOST=example.com
FTP_USERNAME=johndoe
FTP_PASSWORD=secret
```

3. Config deployment script

This is done by command line parameters:

These are required:
--remote-root **Directory path on ftp**
--local-root **Directory path on local machine**
These are optional:
--tmp-root **Temporary directory path on ftp - defaults to 'remote-root'+'-tmp'**
--old-root **Old directory path on ftp - defaults to 'remote-root'+'-old'**
--concurrency **How many connections to spawn**

4. Run the script

```bash
fast-ftp --remote-root=/sub/example --local-root=/path-to-published
```

## Api

We provide accelerated ftp functions and helpers you can use in your pipeline or node-js projects.

General idea is you first use **getClients** function to obtain an array of ftp-clients (connections). These are then passed to other functions. Check the [main deployment script](pathToDeployTs) as an example.

Full api docs [here](pathToApi)

## Created and sponsored by

- [GuestBell](https://guestbell.com/) - Customer centric online POS for Hotels and short terms stays.

## Contributing

1. Fork it
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

MIT
