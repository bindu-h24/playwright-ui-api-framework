import { test, expect } from '../fixtures/testFixture';

test.describe('API Response Validation', () => {

    test('Validate Products API response and compare with UI',
        async ({ page, dashboardPage }) => {

        // Navigate to Dashboard
        await dashboardPage.navigate('/dashboard/dash');
        await dashboardPage.verifyDashboardLoaded();

        // Wait for Products API response
        const response = await page.waitForResponse(response =>
            response.url().includes('/api/ecom/product/get-all-products') &&
            response.status() === 200
        );

        // Parse API response
        const body = await response.json();

        // API Validations
        expect(body.message).toBe('All Products fetched Successfully');
        expect(body.count).toBeGreaterThan(0);

        // Find Product from API response
        const product = body.data.find(
            (p: any) => p.productName === 'ZARA COAT 3'
        );

        expect(product).toBeTruthy();

        console.log("API Product:", product);

        // Validate Product Name on UI
        const productCard = page.locator(".card-body")
            .filter({ hasText: product.productName });

        await expect(productCard).toBeVisible();

        // Validate Product Price on UI
        await expect(productCard).toContainText(
            product.productPrice.toString()
        );

    });

});


// Dashboard Opens
//        │
//        ▼
// Products API Called
//        │
//        ▼
// Capture Response
//        │
//        ▼
// Validate JSON
//        │
//        ▼
// Find ZARA COAT 3
//        │
//        ▼
// Compare API Product Name
//        │
//        ▼
// Compare API Price
//        │
//        ▼
// PASS