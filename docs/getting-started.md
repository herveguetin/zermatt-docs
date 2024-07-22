# Getting started

## Requirements

- Magento theme architecture
- AlpineJS
- ES6 / JS modules
- PHP (optional)
- NodeJS with npm

## Module install
Install the Zermatt Magento module.

```
composer require maddlen/module-zermatt
bin/magento setup:upgrade
```

## Theme setup
The frontend stack needs to be deployed in your theme.

#### Zermatt initialization
Initialize Zermatt in your theme with `zermatt:install <targetThemeCode>`.
If your theme is located in `app/design/frontend/Package/theme`, then run:

`bin/magento zermatt:install Package/theme`

### Javascript
1 • Navigate to your Zermatt theme folder

`cd path_to_theme/web/zermatt`

Example: `cd app/design/frontend/Package/theme/web/zermatt`

2 • Install npm packages

`npm install`

3 • Start the dev mode

`npm run dev`

## Simple AlpineJS component

You can now use AlpineJS in any template. For example:

```html
<?php
$customers = [
    ['code' => 'john', 'name' => 'John Doe', 'message' => __('Hello ')],
['code' => 'emily', 'name' => 'Emily Johnson', 'message' => __('Welcome ')],
];
?>
<div x-data="{
    customers: JSON.parse('<?= $escaper->escapeJs(json_encode($customers)) ?>'),
    greet(customerCode) {
        const customer = this.customers.find(customer => customer.code === customerCode)
        return customer.message + customer.name
    }
}">
    <span x-text="greet('emily')"></span>
</div>
```

**The same thing, but the Zermatt way:**

```html
<?php
zermatt_variable('customers', [
    ['code' => 'john', 'name' => 'John Doe', 'message' => __('Hello ')],
    ['code' => 'emily', 'name' => 'Emily Johnson', 'message' => __('Welcome ')],
]);
?>
<div x-data="{
    greet(customerCode) {
        const customer = Zermatt.Variables.customers.find(customer => customer.code === customerCode)
        return customer.message + customer.name
    }
}">
    <span x-text="greet('emily')"></span>
</div>
```

Please note that:

- The `zermatt_variable()` PHP method is used to declare a `customers` variable...
- ... which is then available in Javascript by calling `Zermatt.Variables.<variable>`...
- ... so `Zermatt.Variables.customers`

This approach has several advantages:

- The `customers` variable is available in all AlpineJS components
- The heavy lifting to convert a PHP object to a JS one is done...
- ... `$escaper->escapeJs(json_encode($customers))` is not needed

[Learn more about Variables](#variables)

## Simple Zermatt module

Zermatt can have modules. Modules are AlpineJS components stored in dedicated JS files.
Modules are integrated into the ViteJS app underlying Zermatt.

---
You can see Zermatt modules as AlpineJS components embedded into a modern Javascript app that Magento `.phtml` files can use at will.

---

Create the `app/design/frontend/<Package>/<theme>/web/zermatt/modules/welcome.js` file with the AlpineJS component:

```js
export default {
    greet(customerCode) {
        const customer = Zermatt.Variables.customers.find(customer => customer.code === customerCode)
        return customer.message + customer.name
    }
}
```

Update the `app/design/frontend/<Package>/<theme>/web/zermatt/zermatt.json` file like this:

```js
{
  "modules": {
    "welcome": "./modules/welcome"
  },
  "rewrites": {}
}
```

Here, we define a new Zermatt module with the `welcome` name
and its AlpineJS component is available thru the relative path `./modules/welcome`

Update your zermatt-lock.json file to activate the `welcome` module:

`bin/magento zermatt:lock:dump`


Update your PHTML template by calling the Zermatt module in `x-data` rather than a native AlpineJS component.

```html
<?php
zermatt_variable('customers', [
    ['code' => 'john', 'name' => 'John Doe', 'message' => __('Hello ')],
    ['code' => 'emily', 'name' => 'Emily Johnson', 'message' => __('Welcome ')],
]);
?>
<div x-data="Zermatt.Module('welcome')">
    <span x-text="greet('emily')"></span>
</div>
```

Note the use of `Zermatt.Module('welcome')`. The `Zermatt.Module` object gathers all modules declares in all
`zermatt.json` files.

From now on:

- The PHTML is decoupled from the Javascript.
- The Zermatt module can easily be distributed.
- The AlpineJS component is fully integrated within the ViteJS install that Zermatt uses.
- It is then possible to `ìmport` modules from the AlpineJS and Javascript ecosystems.
- The module is loaded (and its .js file requested) only if the current page uses it.
- The module is loaded only once. A factory creates a new instance each time the PHTML calls it.

[Learn more about Zermatt modules and zermatt-lock.json](#modules)
