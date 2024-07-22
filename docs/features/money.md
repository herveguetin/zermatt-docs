# Money

Zermatt implements its own version of currency formatting. This avoids relying on Magento `formatPrice()` frontend method.

Zermatt implementation uses the native Javascript `Intl.NumberFormat` method ([Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)) 
configured with the locale and currency of the current Magento store.

## With configured locale and currency of the current store

Example with a price for an en_US site using the dollar currency:

```html
<?php
$price = $block->getProduct()->getFinalPrice();
?>
<div x-data="{}">
    <div>Unformatted price: <?= $price ?></div>
    <div>Formatted price: <span x-text="Zermatt.Money.formatPrice(<?= $price ?>)"></span></div>
</div>
```

The same example using a module:

The template file:

```html
<?php
$price = $block->getProduct()->getFinalPrice();
?>
<div x-data="Zermatt.Module('SandBox_PriceExample', {price: <?= $price ?>})">
    <div>Unformatted price: <?= $price ?></div>
    <div>Formatted price: <span x-text="myFormattedPrice()"></span></div>
</div>
```

The JS file of the `SandBox_PriceExample` module:

```js
export default {
    price: null,
    myFormattedPrice() {
        return Zermatt.Money.formatPrice(this.price)
    }
}
```

## With custom locale and/or currency

It is possible to override the locale and/or the currency used when formatting price.

### Override locale

```js
Zermatt.Money.formatPrice(this.price, 'fr_FR')
// 29,99 $US
```

### Override locale and currency

```js
Zermatt.Money.formatPrice(this.price, 'fr_FR', 'EUR')
// 29,99 €
```

### Override currency

```js
Zermatt.Money.formatPrice(this.price, null, 'EUR')
// €29.99
```

