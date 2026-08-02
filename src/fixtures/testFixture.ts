import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { PaymentPage } from '../pages/PaymentPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { OrderAPI } from '../api/OrderAPI';

type Pages = {

    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    paymentPage: PaymentPage;
    orderConfirmationPage: OrderConfirmationPage;
    orderAPI: OrderAPI;
};

export const test = base.extend<Pages>({

    loginPage: async({page}, use) =>{
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },

    cartPage: async({page}, use) =>{
       await  use(new CartPage(page))
    },

    paymentPage: async({page}, use) =>{
        await use(new PaymentPage(page));
    },

    orderConfirmationPage: async({page}, use) =>{
        await use(new OrderConfirmationPage(page));
    },

    orderAPI: async ({}, use) => {
    await use(new OrderAPI());
},

});

export { expect } from '@playwright/test';