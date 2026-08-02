import { test, expect } from '@playwright/test';
import users from '../../testData/users.json';

test('Authenticate User', async ({ page }) => {

    await page.goto('');

    await page.locator("#userEmail").fill(users.validUser.email);
    await page.locator("#userPassword").fill(users.validUser.password);
    await page.locator("#login").click();
    await expect(page.locator(".card-body").first()).toBeVisible();

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });

});