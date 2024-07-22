# AlpineJS plugins

## Plugins embedded in Zermatt

Zermatt is shipped with the following AlpineJS plugins:

- [collapse](https://alpinejs.dev/plugins/collapse)
- [focus](https://alpinejs.dev/plugins/focus)
- [morph](https://alpinejs.dev/plugins/morph)
- [persist](https://alpinejs.dev/plugins/persist)
- [precognition](https://www.npmjs.com/package/laravel-precognition-alpine)


## Adding other plugins

Navigate to the `web/zermatt` directory of your theme.

Run `npm install @alpinejs/<plugin>`. Ex: `npm install @alpinejs/anchor`

Update the `zermatt.js` like this:


```js
import Config from './zermatt-lock.json'
import Zermatt from 'zermatt-core'

// Import new AlpineJS plugins
import anchor from '@alpinejs/anchor'
import resize from '@alpinejs/resize'

// Use AlpineJS plugins on Zermatt init.
Zermatt.Event.on('zermatt:init', () => Alpine.plugin(anchor, resize))

Zermatt.init(Config)

```

