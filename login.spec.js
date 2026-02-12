import { test, expect } from '@playwright/test';
//const { test, expect } = require('@playwright/test');

test('successfull login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    // VERIFICATION: Check if logout was successfull('https://www.saucedemo.com/inventory.html' is open)
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('successfull logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[id="react-burger-menu-btn"]').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    // VERIFICATION: Check if logout was successfull('https://www.saucedemo.com/' is open)
    await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('wrong password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('123456');
    await page.locator('[data-test="login-button"]').click();
  
    // VERIFICATION: Check that the error message container contains the specific text
    const errorContainer = page.locator('[data-test="error"]');
    await expect(errorContainer).toContainText('Username and password do not match any user in this service');
  });

test('Verify error message for locked out user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
  
    // VERIFICATION: Check that the error message container contains the specific text
    const errorContainer = page.locator('[data-test="error"]');
    await expect(errorContainer).toContainText('Sorry, this user has been locked out.');
  });