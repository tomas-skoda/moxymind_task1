import { test, expect } from '@playwright/test';
//const { test, expect } = require('@playwright/test');

test.beforeEach('login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
});

test('1. add to cart', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  // VERIFICATION: Check if item is added to cart
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  // VERIFICATION: Check if add button is replaced by remove button
  await expect(removeButton).toBeVisible();
  await expect(addButton).not.toBeVisible();
});

test('2. remove from cart', async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  const cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  // VERIFICATION: Check if item is removed from cart
  await expect(cartBadge).not.toBeVisible();
  // VERIFICATION: Check if remove button is replaced by add button
  await expect(addButton).toBeVisible();
  await expect(removeButton).not.toBeVisible();
});