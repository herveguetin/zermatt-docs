# Updating Zermatt

When updating Zermatt, both the `Maddlen_Zermatt` Magento module and all Zermatt-enabled themes must be updated.

## Maddlen_Zermatt update

Just run:
```
composer update maddlen/module-zermatt
bin/magento setup:upgrade
```

## Zermatt-enabled themes

**Please follow these steps for each theme using Zermatt.**

1. Go to its `web/zermatt` directory.

### package.json
2. Compare its `package.json` file with the one from Maddlen_Zermatt: `vendor/maddlen/module-zermatt/view/frontend/web/package.json`.
3. Manually merge them by making sure you update Zermatt code while keeping your custom one.

### zermatt.js
4. Compare its `zermatt.js` file with the one from Maddlen_Zermatt: `vendor/maddlen/module-zermatt/view/frontend/web/zermatt.js`.
5. Manually merge them by making sure you update Zermatt code while keeping your custom one.

## Specific steps

If a specific update procedure is required for a given version, it is specified in the [release notes](./release-notes).
