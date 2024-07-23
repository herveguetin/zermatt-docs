# Zermatt in vendor templates (Alpine.bind)

[Alpine.bind](https://alpinejs.dev/globals/alpine-bind) has the ability to programmatically attach an AlpineJS component to existing DOM elements.

When applied to Magento, this has the advantage to use Zermatt on elements for which you may not want to change the HTML markup. 
For instance: a Magento or vendor block for which you do not want to overload the template in your theme.

In this example, we are enhancing the native Magento header search without changing its template.

Open these files from the `/vendor/maddlen/module-zermatt-examples/view/frontend` directory:

- `templates/bind.phtml`
- `web/js/zermatt/modules/bind.js`

## bind.phtml

- We wait for Zermatt to be ready.
- We use `Alpine.bind` to attach the `ZermattExamples_Bind` to the `x-data` attribute of the `#search_mini_form`

From now on, the native `#search_mini_form` element uses `ZermattExamples_Bind` without touching a line of its template.

## bind.js

As we attached the `ZermattExamples_Bind` module to `#search_mini_form`, the current element `this.$el` of the module is also `#search_mini_form`. 
So the `query`, `init` and `onInputChange` properties are scoped to `#search_mini_form`.

- We make a new `Alpine.bind` on the `#search_mini_form > #search` element with a 2-way data binding using `x-model`.
- This allows us to listen to changes on the search input field...
- ... to which we react by calling `onInputChange()`
