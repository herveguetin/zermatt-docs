# Translation

Zermatt translation is fully integrated within Magento i18n layer.

## Workflow

- Magento generates the `js-translation.json` file.
- Zermatt fetches the `js-translation.json` file of the current theme.
- Zermatt reads the current locale from `Zermatt.Variables.locale`.
- Zermatt uses [i18next](https://www.i18next.com/) to proceed to the translation.

## Using translation

### The Magento i18n csv file

Use it as usual:

```
// fr_FR.csv
"Welcome to Zermatt", "Bienvenue à Zermatt"
```

### The JS $t() method

To be used in Zermatt modules:

```js
export default {
  name: 'John Doe',
  message: $t('Welcome to Zermatt'),
  greet() {
    return `${this.message} ${this.name}!`
  }
}

// Bienvenue à Zermatt John Doe!
```

## Interpolation

Zermatt interpolation works the same as in .phtml. Using interpolation gives the ability to share translation strings with variables from i18n csv files between the backend and the frontend.

```
// fr_FR.csv
"Welcome to Zermatt %1", "Bienvenue à Zermatt %1"
```
```js
// Some JS
export default {
  name: 'John Doe',
  greet() {
    return $t('Welcome to Zermatt %1', this.name)
  }
}
```

This also avoids duplicates and limits the risk to forget some translations when future changes are needed.

Imagine this scenario: 

```js
// fr_FR.csv
"Welcome to Zermatt", "Bienvenue à Zermatt"
"Welcome to Zermatt %1", "Bienvenue à Zermatt %1"
```

```js
// Some .phtml
<?= __('Welcome to Zermatt %1', $name) ?>
```

```js
// Some JS
return $t('Welcome to Zermatt') + ` my friend!`
```

In such situation, the result is the same but there are 2 translations and 2 different view logics.
Using interpolation in Zermatt makes this more coherent:

```js
// Some JS
return $t('Welcome to Zermatt %1', 'my friend!')
```

## Translation in template files

The `$t()` method cannot be used in phtml files. `__()` has been there forever for such situation.
On top of that, it would be a big work for Magento to scan all phtml files in order to find translations using `$t()` to be added to `js-translation.json`.

So, this won't work:

```html
<div x-data="<whatever>">
    <span x-text="$t('Text to translate')"></span>
</div>
```

This will:
```html
<div x-data="<whatever>">
    <span x-text="<?= __('Text to translate') ?>"></span>
</div>
```
