import { test, expect } from "../fixtures/testFixture";
import users from "../testData/users.json";
import { AuthApi } from "../api/AuthApi";
import { ProductApi } from "../api/ProductApi";
import { OrderAPI } from "../api/OrderAPI";

test.describe("API + UI Hybrid Order", () => {

    test("@Smoke @API Create Order through API and verify in UI", async ({ loginPage }) => {

        // API - Login
        const authApi = new AuthApi();
        const loginResponse = await authApi.login({
            userEmail: users.validUser.email,
            userPassword: users.validUser.password
        });

        expect(loginResponse.token).toBeTruthy();

        // API - Get Product Id
        const productApi = new ProductApi();
        const productId = await productApi.getProductId(loginResponse.token,users.products.product1);
        console.log("Product Id:", productId);
        
        // API - Create Order
        const orderApi = new OrderAPI();
        const orderResponse = await orderApi.createOrder(
            loginResponse.token,
            {
                country: users.shipping.country,
                productOrderedId: productId
            }
        );
        expect(orderResponse.message).toBe("Order Placed Successfully");
        const orderId = orderResponse.orders[0];
        console.log("Generated Order Id:", orderId);

        // UI - Login
        await loginPage.navigate();
        const dashboardPage = await loginPage.login(
            users.validUser.email,
            users.validUser.password
        );

        // UI - Orders Page   
        const ordersPage = await dashboardPage.header.goToOrders();

        // Verify Order Exists
        await ordersPage.verifyOrderExists(orderId);
        await ordersPage.openOrder(orderId);

    });

});