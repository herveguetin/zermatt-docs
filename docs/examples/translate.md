# Translations

[See feature documentation](../features/translation).

Open these files from the `/vendor/maddlen/module-zermatt-examples/view/frontend` directory:

- **zermatt.json** <br/> `/vendor/maddlen/module-zermatt-examples/view/frontend/web/zermatt/zermatt.json`
- **translation.phtml** <br/> `/vendor/maddlen/module-zermatt-examples/view/frontend/templates/translate.phtml`
- **translation.js** <br/> `/vendor/maddlen/module-zermatt-examples/view/frontend/web/zermatt/modules/translation.js`
- **en_US.csv** <br/> `/vendor/maddlen/module-zermatt-examples/i18n/en_US.csv`

# zermatt.json

We declare the `ZermattExamples_Translation` module which points to `/vendor/maddlen/module-zermatt-examples/view/frontend/web/zermatt/modules/translation.js`

# translation.js

- We just expose an AlpineJS component with a `message` property which uses `$t()` and its interpolation capability.
- `$t()` uses native Magento translation layer to retrieve strings from `en_US.csv` as made available by Magento in `js-translation.json`.

# translate.phtml

- We call `Zermatt.Module('ZermattExamples_Translation')`...
- ... and use its `message` property as declared in `translation.js`
