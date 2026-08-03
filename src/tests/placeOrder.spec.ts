import { test } from '../fixtures/testFixture';
import { TestDataLoader } from '../utils/TestDataLoader';
import { Logger } from '../utils/Logger';

test.describe('Place Order', () => {

    test.describe.configure({mode: 'serial'});
    
    const users = TestDataLoader.getUsers();
    const orders = TestDataLoader.getOrders();

    for (const order of orders) {

        test(`@Regression User should place order for ${order.productName}`,
        async ({ loginPage }) => {

        // Navigate to Login Page
        await loginPage.navigate();

        // Login -> Dashboard
        // const dashboardPage = await loginPage.login(users.validUser.email,users.validUser.password);
        const dashboardPage = loginPage.toDashboard();
        await dashboardPage.verifyDashboardLoaded();

        // Add Product
        await dashboardPage.addProductToCart( order.productName);

        // Navigate -> Cart
        const cartPage = await dashboardPage.header.goToCart();

        await cartPage.verifyProductExists( order.productName);

        // Navigate -> Payment
        const paymentPage = await cartPage.proceedToCheckout();
        await paymentPage.verifyPageLoaded();

        // Enter Card Details
        await paymentPage.enterCardDetails(users.payment);

        // Select Country
        await paymentPage.selectCountry( order.country);

        const orderConfirmationPage = await paymentPage.placeOrder();

        await orderConfirmationPage.verifyOrderPlaced();

        const orderId = await orderConfirmationPage.getOrderId();
        Logger.info(`Generated Order ID: ${orderId}`);

        const ordersPage = await orderConfirmationPage.header.goToOrders();

        await ordersPage.verifyOrderExists(orderId);
    });    

    }

});