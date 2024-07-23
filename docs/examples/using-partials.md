# Partials

[See feature documentation](../features/partials).

Open these files from the `/vendor/maddlen/module-zermatt-examples/view/frontend` directory:

- `templates/partials.phtml`
- `templates/partials/partial.phtml`
- `templates/partials/child-partial.phtml`

## In templates/partials.phtml

- We call the same partial twice, but with different data.
- The second call passes a `sub_prefix` data item

## In templates/partials/partial.phtml

- In the `<h4>` tag, we use the `name` passed from the parent `templates/partials.phtml`.
- If the parent passed the `sub_prefix` data item, call a new partial where the template file starts with the `sub_prefix` value.

## In templates/partials/child-partial.phtml

- This template name matches the rule from its parent partial `templates/partials/partial.phtml`.
- We display the `name` value which was passed all along from `templates/partials.phtml`.
