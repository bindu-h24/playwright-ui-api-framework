import { test, expect } from '../fixtures/testFixture';

test.describe('Modify Product API Response', () => {

    test('User should see modified product price', async ({ page, dashboardPage }) => {

        // Intercept Products API
        await page.route(
            '**/api/ecom/product/get-all-products',
            async route => {

                // Fetch actual backend response
                const response = await route.fetch();

                // Convert response to JSON
                const body = await response.json();

                // Modify only ZARA COAT 3 price
                const product = body.data.find(
                    (p: any) => p.productName === 'ZARA COAT 3'
                );

                if (product) {
                    product.productPrice = 999;
                }

                // Return modified response
                await route.fulfill({
                    response,
                    body: JSON.stringify(body)
                });

            });

        // Navigate to Dashboard (Authentication State is used)
        await dashboardPage.navigate('/dashboard/dash');

        await dashboardPage.verifyDashboardLoaded();

        // Verify Product Exists
        await expect(
            page.locator('.card-body')
                .filter({ hasText: 'ZARA COAT 3' })
        ).toBeVisible();

        // Verify Modified Price
        await expect(
            page.locator('.card-body')
                .filter({ hasText: 'ZARA COAT 3' })
                .locator('text=$ 999')
        ).toBeVisible();

    });

});

// Browser
//     │
// GET /get-all-products
//     │
// page.route()
//     │
// route.fetch()
//     │
// Real Backend
//     │
// Returns 3 Products
//     │
// response.json()
//     │
// Find ZARA COAT 3
//     │
// Change price 11500 → 999
//     │
// route.fulfill()
//     │
// Browser receives modified JSON
//     │
// UI shows ₹999