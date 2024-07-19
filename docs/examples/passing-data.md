# Backend data forwarding

There are 2 ways to pass backend data to a Zermatt module: with module properties or Zermatt variables.

## Module properties

**To be preferred to keep data scoped to the current template.**

Zermatt gives the ability to pass properties to the AlpineJS component powering a Zermatt module.

Please see the `vendor/maddlen/module-zermatt-examples/view/frontend/templates/welcome.phtml` template.

It has this content:

```html
<?php $customerName = 'John Doe' ?>
<h2>Welcome</h2>
<div x-data="Zermatt.Module('welcome', {customerName: '<?= $customerName ?>'})" x-text="greet()"></div>
```

- The `$customerName` PHP variable is populated.
- The `welcome` Zermatt module is instanciated...
- ... with the value of `$customerName` populating the `customerName` property of the AlpineJS component.
- The `x-text` then outputs the result of the `greet()` method which needs the `customerName` property.

## Zermatt variables

**To be preferred to expose data to all the Zermatt modules and PHTML templates.**

It is possible to call the `zermatt_variable(<key>, <value>)` PHP method in any PHP or phtml file,
It populates the `Zermatt.Variables` frontend JS object: `Zermatt.Variables.<key> = <value>`.

### Example

We need to have some customer information available in many parts of a page.
We could:

- Create a `\Magento\Framework\View\Element\Text` block class with the business logic to get customer data.
- Use its `getText()` method to call `zermatt_variable()`.
- Get the customer data in all phtml and JS files with `Zermatt.Variables`.

### Implementation

Layout update:

```xml
<referenceContainer name="zermatt.variables">
    <block class="Zermatt\Doc\Block\ZermattCustomerData" name="customer_data"/>
</referenceContainer>
```

Note: a layout container named `zermatt.variables` is created by Zermatt. You can then use it to add new variables declarations.

The `Zermatt\Doc\Block\ZermattCustomerData` class:

```php
class ZermattCustomerData extends \Magento\Framework\View\Element\Text
{
    public function __construct(
        private CustomerRepositoryInterface $customerRepository,
        Context                             $context,
        array                               $data = []
    )
    {
        // Using __construct rather than data model for demo purposes
        parent::__construct($context, $data);
    }


    public function getText(): string
    {
        zermatt_variable('customerData', $this->customerData());
        return '';
    }

    private function customerData(): array
    {
        $customer = $this->customerRepository->get('john.doe@mail.com');
        return [
            'firstName' => $customer->getFirstname(),
            'lastName' => $customer->getLastname(),
        ];
    }
}
```

**Note: it is possible to rather adopt a radical and global approach.
For example, by using a plugin on the controllers `execute()` method and call `zermatt_variable()` from there.**

`zermatt_variable()` can be used anywhere in your PHP and phtml files.

The AlpineJS component:
```js
// Module named "customerWelcome"

const customerData = Zermatt.Variables.customerData
export default {
    greet() {
        return `Hello ${customerData.firstName} ${customerData.lastName} and welcome!`
    }
}
```

Content of the template:

```html
<div x-data="Zermatt.Module('customerWelcome')" x-text="greet()"></div>
```

Result:
```html
Hello John Doe and welcome!
```

If you do not want to use a Zermatt module (at the cost of JS flexibility),
it is possible to use "empty" AlpineJS components in the template.

```html
<div x-data="{}">
    Hello <span x-text="Zermatt.Variables.customerData.firstName"></span> <span x-text="Zermatt.Variables.customerData.lastName"></span>
</div>
```
