# Modules

Zermatt modules are JS files containing AlpineJS components which are included in the frontend `Zermatt.Module` object.
By convention, they are stored in the `web/zermatt/modules` directory of your themes using Zermatt.

In Zermatt, modules behave like Magento modules ; but for the frontend.

It is therefore possible to have them:
- included in the `frontend/web/zermatt` directory of a Magento module (in vendor or app/code).
- included in the `web/zermatt` directory of themes ; standalone or overriding a module from vendor or app/code, the Magento way.
- rewriting / overloading each other (see below).

## zermatt.json & zermatt-lock.json

### zermatt.json
The `zermatt.json` file is present in all `web/zermatt` directories of Magento modules and themes.
This file is used to declare Zermatt modules and rewrites with their relative paths to their target files.

```js
{
  "modules": {
    "<moduleName>": "./relative/path/to/js/file"
  },
  "rewrites": {
    "<rewrittenModuleName>": "./relative/path/to/rewritter/js/file"
  }
}
```

**One `zermatt.json` file can declare several modules and rewrites.**

**As in Magento, it is recommanded to namespace module names: `Vendor_Module`.**

### zermatt-lock.json

The `zermatt-lock.json` is present only in the `web/zermatt` directory of Zermatt themes.

As its name suggests, it gathers all modules and rewrites declared in `zermatt.json` files. 
The target paths match the actual paths in the `pub/static/frontend/...` directories.
As the Zermatt frontend build also lives there, it will directly load the modules from the Magento-generated static assets.  

The `zermatt-lock.json` should not be changed by hand. 

And, you guessed it, `zermatt-lock.json` **must be regenerated each time a module is added or removed.**

### bin/magento zermatt:lock:dump

`bin/magento zermatt:lock:dump` regenerates the `zermatt-lock.json` file of all Zermatt themes.

It runs automatically on each `bin/magento setup:upgrade`. 
So, if you install a Magento module that provides Zermatt modules, the `zermatt-lock.json` is updated.

But, if you create a new module in an existing theme or Magento module, 
you must run `bin/magento zermatt:lock:dump` manually.

**LOCK FILE DIFFERENT SELON THEME: les zermatt.json des themes sont différents => les locks sont-ils bien différents aussi**

## The JS module file

As explained above, the `zermatt.json` file declares a module by a random name and a path to the actual JS file of this module.
So please make sur to create your JS file where your `zermatt.json` module declaration points to.

This JS file is nothing more than an AlpineJS component:

```js
// ./modules/welcome.js file of module named "Acme_Welcome"
export default {
  name: 'John Doe',
  greet() {
    return 'Welcome ' + this.name
  }
}
```

## Using the module in .phtml templates

The only thing to do is to use the AlpineJS `x-data` attribute like so:

`<div x-data="Zermatt.Module('<moduleName>')"></div>`

The rest of the AlpineJS logic is the same.

```html
<div x-data="Zermatt.Module('Acme_Welcome')">
    <p>Your name is <span x-text="name"></span></p>
    <p x-text="greet()"></p>
</div>
```

## Rewrite and overload

For better comprehension, we define:
- "rewrite": the target JS file of a module is changed by another module.
The new target JS file takes complete precedence over the original one.
- "overload": a module adds and/or modifies existing properties of another module.
The unmodified properties are kept in the final overloaded module.

### Rewrite

The `zermatt.json` file declaring the module to rewrite shows:

```js
{
  "modules": {
    "Vendor_Welcome": "./modules/welcome"
  }
}
```

The `zermatt.json` file declaring the actual rewrite must show:

```js
{
  "modules": {
    "Vendor_Welcome": "./path/to/the/new/JS/file"
  }
}
```

**Basically, a rewrite means redeclaring a module by its existing name, 
and make it point to a new JS file.**

## Summary

- Modules are made of a name and a target file.
- Those are declared in the `web/zermatt` directories of a theme or a Magento module.
- The target file is a native AlpineJS component.
- `x-data="Zermatt.Module('<moduleName>')"` is used to instanciate a module in templates.
