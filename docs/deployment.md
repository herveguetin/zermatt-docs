# Build & deployment

**Caution: the `dist` and `node_modules` directories of the `web/zermatt` themes directories are (and should stay) GIT-ignored. Those are needed on the target environment.**
So, if your CI/CD workflow has steps that involves VCS, please make sure that those directories are passed along and available on the target environment.

## Automatic build

Deploying Zermatt should be quite straightforward as it is embedded into the native `setup:static-content:deploy` process.
Before `setup:static-content:deploy` starts its job, a "before" plugin calls `\Maddlen\Zermatt\App\Build::themes`.

This operation runs a build process that:
- Finds all Zermatt-enabled themes.
- Runs `npm install` in their `web/zermatt` directory => creates/updates the `node_modules` directory.
- Runs `npm run build` in their `web/zermatt` directory => creates/updates the `dist` directory with a production optimized build.

Now that all eligible themes in `app/design` are populated with their Zermatt builds, the Magento `setup:static-content:deploy` command can run and do its job to choose which 
files to copy `pub/static`. Zermatt does not change the Magento logic that populates `pub/static` ; it rather profits from it to make its inheritance/fallback system work.

## Manual build

If for some reason, you need to generate a production version of the `node_modules` and `dist` directories for one or more Zermatt-enabled themes, 
please run the `bin/magento zermatt:build` command. [More details about `zermatt:build`](./features/cli#zermatt-1).
