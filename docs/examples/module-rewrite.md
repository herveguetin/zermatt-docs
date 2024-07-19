# Module rewrite

Open these files from the `/vendor/maddlen/module-zermatt-examples/view/frontend/web/zermatt` directory:

- `zermatt.json`
- `modules/welcome.js`
- `modules/welcome-rewrite.js`

The `zermatt.json` file declares a module:

```js
{
  "modules": {
    "welcome": "./modules/welcome",
    ...
```
So the Zermatt module named `welcome` points to `./modules/welcome.js`
which contains the AlpineJS component.

This AlpineJS component has a `message: 'Welcome'` property.

The `zermatt.json` file also declares a rewrite:

```js
...
  "rewrites": {
    "welcome": "./modules/welcome-rewrite"
  }
}
```
So there is a rewrite for the `welcome` module which points to `./modules/welcome-rewrite.js`
which contains a rewritten version of the `message` property: `message: 'Welcome to Zermatt'`.

So any HTML tag that calls the `welcome` module has `Welcome to Zermatt` value for the `message` property.

For example:
```html
<div x-data="Zermatt.Module('welcome')">
    <div x-text="message"></div>
</div>
```

Outputs:
```html
<div>
    <div>Welcome to Zermatt</div>
</div>
```
