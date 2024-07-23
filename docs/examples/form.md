# Precognitive form

[See feature documentation](../features/forms).

Here is an example of an implementation of `Zermatt_Form` (based on [Laravel Precognition](https://laravel.com/docs/precognition)).

Open these files from the `/vendor/maddlen/module-zermatt-examples/view/frontend` directory:

- `templates/form.phtml`
- `templates/partials/button.phtml`
- `templates/partials/error.phtml`
- `templates/partials/text.phtml`

Open the class `\Maddlen\ZermattExamples\Controller\Form\Index` in `/vendor/maddlen/module-zermatt-examples/Controller/Form/Index.php`.

## Index.php (validation controller)

- Its `rules()` method declares two fields which need validation:
  - `name` which cannot be empty.
  - `email` which cannot be empty and must be formatted like... an email.
- Its `redirectUrl()` method defines the URL to reach when form is successfully submitted.
- Its `getSuccessMessage()` method sets the message to display using the native Magento message manager `\Magento\Framework\Message\ManagerInterface`.

## form.phtml (main form container)

- Initialize the `Zermatt_Form` module with the fields requiring validation (name and email).
- The form action targets the validation controller `zermatt_examples/form` declared in the previous step.
- Include partials of form elements that can be reused in other forms in order to keep DRYness.

## text.phtml (text input partial)

- We define the text input following the implementation requirements and using data passed from `form.phtml`
- If `form.phtml` passed the `validate` data to `true`, inject the error partial.

## error.phtml (error partial)

- If the form is invalid...
- We show the error message sent by the server upon validation.

## button.phtml (button partial)

- We prevent the native form submit as we are submitting the form with AJAX
- We disable the button if the form is being submitted.
- The AJAX submission is handled by Zermatt_Form under the hood.
