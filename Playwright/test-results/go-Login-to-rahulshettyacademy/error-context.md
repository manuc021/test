# Test info

- Name: Login to rahulshettyacademy
- Location: D:\Learn_AI\AIAgentMCP\Playwright\tests\go.spec.js:3:1

# Error details

```
Error: page.waitForNavigation: Target page, context or browser has been closed
=========================== logs ===========================
waiting for navigation until "load"
============================================================
    at D:\Learn_AI\AIAgentMCP\Playwright\tests\go.spec.js:33:10
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |
   3 | test('Login to rahulshettyacademy', async ({ page }) => {
   4 |   // Navigate to the login page
   5 |   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   6 |   // Fill in the username and password fields
   7 |   await page.fill('#username', 'rahulshettyacademy');
   8 |   await page.fill('#password', 'learning'); // Remove the space before 'learning'
   9 |
  10 |   // Click the sign in button
  11 |   await page.click('#signInBtn');
  12 |
  13 |   // Wait for navigation and the shop page to load
  14 |   await Promise.all([
  15 |     page.waitForNavigation(),
  16 |     page.waitForLoadState('networkidle'),
  17 |     page.waitForLoadState('domcontentloaded')
  18 |   ]);
  19 |   // Select "iphone X" product and add it to cart
  20 |   await page.waitForSelector('.card-title', { timeout: 60000 }); // Increase timeout to 60 seconds
  21 |   const products = await page.$$('.card-title');
  22 |   for (let i = 0; i < products.length; i++) {
  23 |     const title = await products[i].textContent();
  24 |     if (title && title.includes('iphone X')) {      // Click 'Add' button for this product
  25 |       const card = await products[i].evaluateHandle(el => el.closest('.card'));
  26 |       const addButton = await card.$('button.btn-info');
  27 |       await addButton.click();
  28 |       break;
  29 |     }
  30 |   }
  31 |   // Go to cart and wait for navigation
  32 |   await Promise.all([
> 33 |     page.waitForNavigation(),
     |          ^ Error: page.waitForNavigation: Target page, context or browser has been closed
  34 |     page.click('a.nav-link.btn.btn-primary')
  35 |   ]);
  36 |
  37 |   // Wait for cart page to load and verify the product
  38 |   await page.waitForLoadState('networkidle');
  39 |   
  40 |   // Check if there's a product in the cart
  41 |   const productName = await page.textContent('.media-heading');
  42 |   expect(productName.toLowerCase()).toContain('iphone');
  43 | });
  44 |
```