import { test, expect } from '../fixtures/testFixture';
import users from '../testData/users.json';

test.describe('Mock Products', () => {
 test.use({
        storageState: { cookies: [], origins: [] }
    });

    test('User should see mocked product list', async ({ page, loginPage }) => {

        // Mock Get All Products API
        await page.route( '**/api/ecom/product/get-all-products',async route => {

                const mockedResponse = {
                    data: [
                        {
                            "_id": "123456789",
                            "productName": "Mock Laptop",
                            "productCategory": "electronics",
                            "productSubCategory": "laptops",
                            "productPrice": 99999,
                            "productDescription": "This product is returned from mocked API",
                            "productImage": "",
                            "productRating": "5",
                            "productStatus": true,
                            "productFor": "men"
                        }
                    ],
                    count: 1,
                    message: "All Products fetched Successfully"
                };

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(mockedResponse)
                });
            });

        // Login
        await loginPage.navigate();
        const dashboardPage = await loginPage.login(users.validUser.email,users.validUser.password
        );

        // Validate mocked product is displayed
        await expect(page.getByText('Mock Laptop')).toBeVisible();

    });

});