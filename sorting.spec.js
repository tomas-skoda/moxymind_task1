import { test, expect } from '@playwright/test';

test.beforeEach('login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
});

test('1. Sorting products by price low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const prices = await page.locator('.inventory_item_price').allInnerTexts();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

    // VERIFICATION: Check if prices are in ascending order
    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b));
});

test('2. Sorting products by price high to low', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const prices = await page.locator('.inventory_item_price').allInnerTexts();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

    // VERIFICATION: Check if prices are in descending order
    expect(numericPrices).toEqual([...numericPrices].sort((a, b) => b - a));
});

test('3. Sorting products by name a to z', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('az');
    const nameLocators = page.locator('[data-test="inventory-item-name"]');
    const actualNames = await nameLocators.allInnerTexts();

    // VERIFICATION: Check if names are in ascending order
    expect(actualNames).toEqual([...actualNames].sort());

});

test('4. Sorting products by name z to a', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    const nameLocators = page.locator('[data-test="inventory-item-name"]');
    const actualNames = await nameLocators.allInnerTexts();

    // VERIFICATION: Check if names are in descending order
    expect(actualNames).toEqual([...actualNames].sort().reverse());
});