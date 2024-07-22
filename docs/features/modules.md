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

## Rewrite

For better comprehension, we define:
- "hard rewrite": the target JS file of a module is changed by another module.
The new target JS file takes complete precedence over the original one.
- "soft rewrite": a module adds and/or modifies existing properties of another module.
The unmodified properties are kept in the final overloaded module.

**Caution: rewrites and overload are implemented in a different way for Magento modules and themes. This section only covers rewrites for Magento modules living in `app/code` or `vendor`.**

**Please see "Theme inheritance" below for more information about rewriting a parent theme module.**

### Hard rewrite

The `zermatt.json` file declaring the module to be rewritten (in `app/code` or `vendor`) shows:

```js
{
  "modules": {
    "Vendor_Welcome": "./modules/welcome"
  }
}
```

The `zermatt.json` file declaring the actual rewrite (in the theme) must show:

```js
{
  "modules": {
    "Vendor_Welcome": "./path/to/the/new/JS/file"
  }
}
```

**Basically, a hard rewrite means redeclaring a module by its existing name, 
and make it point to a new JS file.**

### Soft rewrite

Soft rewrite allows rewriting only some properties of an existing module. Soft rewrite also allows adding new properties to existing modules.

For example, the `zermatt.json` file declaring the module to be rewritten (in `app/code` or `vendor`) shows:

```js
{
  "modules": {
    "Vendor_Welcome": "./modules/welcome"
  }
}
```

The `Vendor_Welcome::/modules/welcome.js` file shows:

```js
export default {
  name: 'John Doe',
  greet() {
    return 'Welcome ' + this.name
  }
}
```

The `zermatt.json` file declaring the actual rewrite (in the theme) must show:

```js
{
  "rewrites": {
    "Vendor_Welcome": "./path/to/the/rewrite/JS/file"
  }
}
```

Now, the rewrite JS file in the theme could be:

```js
export default {
  name: 'John Smith'
}
```

With a template using the `Vendor_Welcome` module:

```html
<div x-data="Zermatt.Module('Vendor_Welcome')">
    <span x-text="greet()"></span>
</div>
```

Result: `Welcome John Smith`.

## Theme inheritance

Native Magento theme fallback system applies to Zermatt.

Therefore, you can develop a main theme which includes the core of your logic and create childs of this theme.
As in Magento, placing a file in a child theme with the same path and name as the ones from its parent will make the child file take precedence.

Parent theme:

`app/design/frontend/Vendor/theme/web/zermatt/path/to/some-module.js`

Child theme :

`app/design/frontend/Acme/child/web/zermatt/path/to/some-module.js`

This will completely rewrite files from the parent theme.

**This also means that if the child theme is Zermatt-enabled with `zermatt.json` and `zermatt-lock.json` files, those files will take precedence over the parent theme ones. 
All modules from the parent theme are therefore unavailable in the child theme.**

In other words: as soon as you are working on a child theme which is Zermatt-enabled, you need to redeclare any module from the parent theme that you also wish to use in the child theme.

In such case, the `zermatt.json` file of the child theme looks like:

```js
{
  "modules": {
    "ParentTheme_Module": "./same/path/as/parent/file" // DO NOT CREATE THIS FILE IN THE CHILD THEME
  }
}
```

**Do not copy/paste the JS file of the parent path to the child theme if you do not intend to change its logic / properties.**

Native Magento fallback system will add the parent theme JS file to the child files during static assets generation.

### Hard rewrite

Hard rewrite in theme inheritance works the same as in Magento modules.

```js
{
  "modules": {
    "ParentTheme_Module": "./same/path/as/parent/file" // YOU MUST CREATE THIS FILE IN THE CHILD THEME
  }
}
```

During static assets generation, native Magento fallback system will use the child JS file instead of the parent.

### Soft rewrite

In order to do a soft rewrite of a module living in a parent theme, the parent file must be available in the child theme. It must therefore be added to the `zermatt.json` file of the child theme.

It is also required to declare a rewrite where the name of the file must not be the same as the parent file.

```js
{
  "modules": {
    "ParentTheme_Module": "./same/path/as/parent/file" // DO NOT CREATE THIS FILE IN THE CHILD THEME
  },
  "rewrites": {
    "ParentTheme_Module": "./same/path/as/parent/file-REWRITE" // ... File with a different name
  } 
}
```


## Summary

- Modules are made of a name and a target file.
- Those are declared in the `web/zermatt` directories of a theme or a Magento module.
- The target file is a native AlpineJS component.
- `x-data="Zermatt.Module('<moduleName>')"` is used to instanciate a module in templates.
- Modules living in Magento modules are rewritten differently than the ones living in themes.

### Complete zermatt.json file

Commented example of a complete `zermatt.json`:

```js
{
  "modules": {
    "Acme_Module": "./modules/file" // New module declaration
    
    "Vendor_Module": "./same/path/as/module/file" // Hard rewrite of a module living in a Magento module
    
    "ParentTheme_FirstModule": "./same/path/as/parent/file" // In child theme, if file **does not** exist => use module from parent theme 
    "ParentTheme_SecondModule": "./same/path/as/parent/file" // In child theme, if file **does** exist => hard rewrite
    "ParentTheme_ThirdModule": "./same/path/as/parent/file" // In child theme, file **does not** exist in child...
  },
  "rewrites": {
    "ParentTheme_ThirdModule": "./same/path/as/parent/file-REWRITE" // ... but a soft rewrite exists in child in a file that has a different name

    "Vendor_Module": "./modules/file" // Soft rewrite of a module living in a Magento module
  }
}
```
