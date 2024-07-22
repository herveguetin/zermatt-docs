# Partials

As its name suggests, this feature takes an approach similar to the one of many frameworks.

The Zermatt implementation of such pattern is a `zermatt_partial()` method that can be used in phtml template files. 
Under the hood, it is a syntactic sugar for `$layout()->createBlock(Template::class, 'randomName', ['template' => 'Vendor_Module::some-template.phtml']);`.

The drawback of such approach within Magento is that partials are not part of layout XML files. It is therefore not possible to rework them thru layout updates.

This is why using partials should be limited:
- to themes templates
- to creating reusable phtml components (ie: a product thumbnail, see below)

## Using partials

Create the partial template in the theme:

```html
// app/design/frontend/Package/theme/Vendor_Package/templates/partials/partial.phtml
<div>I am a partial</div>
```

Create the template hosting the partial:

```html
// app/design/frontend/Package/theme/Vendor_Package/templates/partials.phtml
<div>I am a Magento template</div>
<div>
    <?php zermatt_partial('Vendor_Package::partials/partial.phtml') ?>
</div>
```

## Nesting partials

Partials can be nested. Just call a partial in a partial and so on.

## Passing variables

Pass variables to a partial like this:

```php
<?php zermatt_partial('Vendor_Package::partials/partial.phtml', ['name' => 'John', 'age' => 45]) ?>
```

The data is passed as `$data` to the partial. You can access it using native Magento methods:

```html
<div>Hello <?= $block->getName() ?>, aged <?= $block->getAge() ?></div>
```

## Use case: a product thumbnail 

Here is the file structure:

```
Vendor_Module
   ├── templates
      ├── product-thumbnail
      │   ├── add-to-cart.phtml
      │   ├── info.phtml
      │   ├── main-content.phtml
      │   └── media.phtml
      └── product-thumbnail.phtml
```

Here is an example layout XML file content:

```xml
<referenceContainer name="main.content">
    <block class="Vendor\Module\Block\Product" name="product_thumbnail" template="Vendor_Module::product-thumbnail.phtml"/>
</referenceContainer>
```

The main `product-thumbnail.phtml` template

```html
<?php
/** @var \Vendor\Module\Block\Product $block */
$product = $block->getProduct();
?>
<div class="product-thumbnail">
    <?php zermatt_partial('Vendor_Module::product-thumbnail/main-content.phtml', ['product' => $product]) ?>
    <?php zermatt_partial('Vendor_Module::product-thumbnail/add-to-cart.phtml', ['product' => $product]) ?>
</div>
```

The `product-thumbnail/main-content.phtml` template:

```html
<?php
$product = $block->getProduct();
?>
<div class="main-content">
    <h2><?= $product->getName() ?></h2>
    <?php zermatt_partial('Vendor_Module::product-thumbnail/media.phtml', ['product' => $product]) ?>
    <?php zermatt_partial('Vendor_Module::product-thumbnail/info.phtml', ['product' => $product]) ?>
</div>
```

The `product-thumbnail/add-to-cart.phtml` template:

```html
<div class="add-to-cart">
    <button type="submit" name="add_to_cart">
        <span><?= __('Add to cart') ?></span>
    </button>
</div>
```

The `product-thumbnail/media.phtml` template:

```html
<div class="media">
    ... media content ...
</div>
```

The `product-thumbnail/info.phtml` template:

```html
<div class="info">
    ... info content ...
</div>
```

In this example, we only declare one block in the layout: the main `product-thumbnail.phtml` template, linked to a custom PHP class block where the business logic is placed.
All partials receive the `$product` retrieved in the main template.

This gives much flexibility for frontend developers who are not familiar with Magento layout to easily create (reusable) components only using partials.
The backend developer has to prepare the main template with the data to be used throughout the partials.
