# Price formatting

[See feature documentation](../features/money).

Open this file from the `/vendor/maddlen/module-zermatt-examples/view/frontend` directory:

- `templates/price.phtml`

In this file we:
- Populate the PHP `$price` variable with a backend value.
- Create an AlpineJS component that uses `$price` in its data. This component has some price building logic.
- Use `Zermatt.Money.formatPrice()` to format the price based on the locale and currency of the current store.
- Display some prices in the phtml template using the AlpineJS component.
