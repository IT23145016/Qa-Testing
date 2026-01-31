import { test, expect } from '@playwright/test';

const baseURL = 'https://www.swifttranslator.com/';

test.describe('Positive UI Test - Clear Button Functionality', () => {
  test('Pos_UI_Clear_0001 - Clear button resets input and output areas', async ({ page }) => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });

    const inputBox = page.locator('textarea').first();
    await expect(inputBox).toBeVisible({ timeout: 15000 });
    await expect(inputBox).toBeEditable();

    const outputBox = page.locator(
      'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap.overflow-y-auto.flex-grow.bg-slate-50'
    );
    await expect(outputBox).toBeAttached({ timeout: 15000 });

    
    await inputBox.focus();
    await inputBox.type('mama gedhara yanavaa', { delay: 100 });

    await page.waitForTimeout(5000);

    // Optional: log what we see
    const currentOutput = (await outputBox.innerText()).trim();
    console.log('Output after typing:', currentOutput || '(empty)');

    // Clear button
    const clearButton = page.locator('button[aria-label="Clear"]');
    await expect(clearButton).toBeVisible({ timeout: 8000 });
    await expect(clearButton).toBeEnabled();

    await clearButton.click();

    await page.waitForTimeout(1500);

    const inputAfter = (await inputBox.inputValue()).trim();
    const outputAfter = (await outputBox.innerText()).trim();

    expect(inputAfter, 'Input should be empty after Clear').toBe('');
    expect(outputAfter, 'Output should be empty after Clear').toBe('');

    console.log('Clear button works → positive UI feature confirmed');
  });
});