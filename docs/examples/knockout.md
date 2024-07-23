# KnockoutJS communication

Here is how to make Zermatt talk with Knockout.

Open these files from the `/vendor/maddlen/module-zermatt-examples/view/frontend` directory:

- `templates/knockout.phtml`
- `web/js/knockout.js`

## knockout.phtml

- We use AlpineJS `@input.dedounce` to dispatch the `zermatt_example:alpine_input` event with its `value` taken from the `$event` object passed by AlpineJS.
- We declare a Knockout template with its data bound to the `zermatt_example_knockout` Knockout component...
- ... which is declared just below in the regular Magento way.

## knockout.js

- We initiate the `message` observable.
- We initialize the component and make it listen to the `zermatt_example:alpine_input` event...
- ... and update the `message` observable.
