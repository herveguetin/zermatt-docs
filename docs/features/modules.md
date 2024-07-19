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

### zermatt-lock.json

The `zermatt-lock.json` is present only in the `web/zermatt` directory of Zermatt themes.

As its name suggests, it gathers all modules and rewrites declared in `zermatt.json` files. 
The target paths match the actual paths in the `pub/static/frontend/...` directories.
As the Zermatt frontend build also lives there, it will directly load the modules from the Magento-generated static assets.  

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


## Modules
<a name="modules"></a>
zermatt-lock.json
Rewrite + overload

## Variables
<a name="variables"></a>
You should not mutate a variable in the JS code.

## Forms

## Components

## Price

## Translation

## CLI

## zermatt-core npm module

## Zermatt themes

## Events
