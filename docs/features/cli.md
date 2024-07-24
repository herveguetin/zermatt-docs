# CLI

Zermatt CLI commands are integrated within the Magento CLI.

## zermatt:install

Install Zermartt in a theme.

[Read more about themes](./themes)

## zermatt:lock:dump

Dumps the `zermatt-lock.json` files.

[Read more about modules and zermatt-lock.json](./modules)

## zermatt:build

Builds all Zermatt JS files in one or all Zermatt-enabled themes:

- installs npm dependencies.
- makes the npm build.

Usage: `zermatt:build [<targetThemeCode>]`.

If the optional `targetThemeCode` (Package/theme) is provided, Zermatt builds only this theme. Otherwise, all themes are built. 

This command is useful in a deployment context. [Read more about deploying Zermatt](../deployment).
