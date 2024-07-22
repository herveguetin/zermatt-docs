# Themes

Zermatt lives within all themes that have been "Zermatt-enabled". Therefore, each theme has its own Zermatt instance in which you add your custom frontend logic.

## Enable Zermatt in a theme

First run:

```
bin/magento zermatt:install <Package/theme>
// ex: bin/magento zermatt:install Acme/default
```

This command:

- Copies the Zermatt skeleton from `Maddlen_Zermatt::view/frontend/web/zermatt` to `app/design/frontend/<Package/theme>/web/zermatt`
- Writes the `zermatt-lock.json` file to `app/design/frontend/<Package/theme>/web/zermatt/zermatt-lock.json`

Then install npm dependencies from the new `web/zermatt` directory of your theme:

```
cd /path/to/app/design/frontend/<Package/theme>/web/zermatt && npm install
```

## Running in dev mode

In order to develop with Zermatt, it is required to work in dev mode which will rebuild the app in real time.

```
cd /path/to/app/design/frontend/<Package/theme>/web/zermatt
npm run dev
```

## Theme inheritance

Zermatt offers granular and efficient approach to rewrites and overloads.
Please continue to [Zermatt modules](./modules). 
