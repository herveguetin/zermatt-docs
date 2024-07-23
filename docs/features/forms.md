# Forms

Forms in Zermatt are using [Laravel Precognition](https://laravel.com/docs/precognition). We invite you to read the official documentation for a better understanding of the underlying code.

As stated on the Lavarel website:

> Laravel Precognition allows you to anticipate the outcome of a future HTTP request. One of the primary use cases of Precognition is the ability to provide "live" validation for your frontend JavaScript application without having to duplicate your application's backend validation rules.

This is especially useful for form validation and also allows great user experience by providing (optional) live validation on each input change. The user gets instant error notification when filling a field the wrong way.

## Implementation

Here are the steps required when implementing a Zermatt form.

1. Create a validation controller: a native Magento controller class which extends `\Maddlen\ZermattForm\FormRules\FormRulesAbstract`.
2. Use the `Zermatt_Form` Zermatt module in the template files.
3. Use the `Zermatt_Form` API to validate and submit the form.

## Validation controller

Here is a commented example of a validation controller.

```php
class Index extends \Maddlen\ZermattForm\FormRules\FormRulesAbstract
{
    public function rules(): array
    {
        return [
            
            // The "name" field of the form must not be empty
            'name' => [
                \Magento\Framework\Validator\NotEmpty::class
            ],
            
            // The "email" field of the form must not be empty and an email address
            'email' => [
                \Magento\Framework\Validator\NotEmpty::class, 
                \Magento\Framework\Validator\EmailAddress::class
            ]
        ];
    }

    public function redirectUrl(): string
    {
        // When to redirect the user once the form was submitted
        return $this->url->getUrl('custom_route');
    }

    public function getSuccessMessage(): ?Phrase
    {
        // Adds this success message once the user is redirect after form submission
        return __('Form is valid');
        
        // Or avoid displaying a success message
        return null;
    }
}
```

## Zermatt_Form module in template

Here is a commented example of a phtml template using the `Zermatt_Form` module:

```js
// Use Zermatt.Module('Zermatt_Form') on this div
<div x-data="Zermatt.Module('Zermatt_Form', {

  // formData lists all fields that require validation.
  // Fields names must match the ones declared in the rules() method of the validation controller.
  formData: {
    name: '', 
    email: ''
  }
})" x-cloak>

  // Declare a native HTML form. Use the validation controller route as "action" attribute.
  <form action="<?= $block->getUrl('zermatt_examples/form') ?>">

    // Embed the form fields in an AlpineJS template tag.
    <template x-if="form">
      
      // Form container
      <div>
        
        // Field container
        <div>
          <label for="name_field_id">Name</label>
          <input
            id="name_field_id"

            // Required. The name of the field as declared in the rules() method of the validation controller.
            name="name"

            // Required. An x-model with `form.<field>` where <field> is he name of the field as declared in the rules() method of the validation controller.
            x-model="form.name"
            
            // Optional. Proceed to live validation of this field.
            @change="validate('name')"
          />
          
          // Error display
          <template x-if="form.invalid('name')"> // Checking if form is invalid for a given field
            <div x-text="form.errors.name" class="mage-error"></div> // Display the error returned by the validation controller.
          </template>
        </div>

        // Field container
        <div>
          <label for="email_field_id">Email</label>
          <input
            id="email_field_id"
            name="email"
            x-model="form.email"
            @change="validate('email')"
          />
          <template x-if="form.invalid('email')">
            <div x-text="form.errors.email" class="mage-error"></div>
          </template>
        </div>
      </div>
    </template>
  </form>
</div>
```

### Avoid redirect on form submission success

You may want to avoid the user being redirected when the form is successgully submitted.

In such case, just pass the callback to the `Zermatt_Form` module with its `onSuccess` property.

```js
// Some logic to display a custom success message.
<div x-show="showSuccess" x-data="{
    showSuccess: false,
    init() {
        Zermatt.Event.on('myform:success', () => this.showSuccess = true)
    }
}">Form is valid!</div>

<div x-data="Zermatt.Module('Zermatt_Form', {

  // Pass the onSuccess property to Zermatt_Form
  onSuccess: () => Zermatt.Event.dispatch('myform:success'),
  
  formData: {
    name: '',
    email: ''
  }
})" x-cloak>

    ...
    
</div>
```

**Note: as the page is not reloaded, the native Magento success message will still appear on next page reload. This is why it is recommanded to return `null` in the validation controller `getSuccessMessage()` method.** 
