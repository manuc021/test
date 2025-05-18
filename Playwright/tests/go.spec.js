const { test, expect } = require('@playwright/test');

test('Login to rahulshettyacademy', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  // Fill in the username and password fields
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'learning'); // Remove the space before 'learning'

  // Click the sign in button
  await page.click('#signInBtn');

  // Wait for navigation and the shop page to load
  await Promise.all([
    page.waitForNavigation(),
    page.waitForLoadState('networkidle'),
    page.waitForLoadState('domcontentloaded')
  ]);
  // Select "iphone X" product and add it to cart
  await page.waitForSelector('.card-title', { timeout: 60000 }); // Increase timeout to 60 seconds
  const products = await page.$$('.card-title');
  for (let i = 0; i < products.length; i++) {
    const title = await products[i].textContent();
    if (title && title.includes('iphone X')) {      // Click 'Add' button for this product
      const card = await products[i].evaluateHandle(el => el.closest('.card'));
      const addButton = await card.$('button.btn-info');
      await addButton.click();
      break;
    }
  }  // Go to cart
  await page.click('a.nav-link.btn.btn-primary');
  
  // Wait for cart page to load completely
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  
  // Check if there's a product in the cart
  const productName = await page.textContent('.media-heading');
  expect(productName.toLowerCase()).toContain('iphone');
});
