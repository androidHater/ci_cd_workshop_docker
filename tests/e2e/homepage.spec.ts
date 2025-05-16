import { test, expect } from '@playwright/test';

test('Ověření nadpisu', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('h1')).toHaveText('Example Domain');
});
