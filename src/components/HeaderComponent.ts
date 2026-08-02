import { Locator, Page } from '@playwright/test';
import { CartPage} from '../pages/CartPage';
import {OrdersPage} from '../pages/OrdersPage'

export class HeaderComponent {

    // Shared header actions available across multiple pages.
    private readonly cartButton: Locator;
    private readonly ordersButton: Locator;
    private readonly logoutButton: Locator;

    constructor(private readonly page: Page) {

        this.cartButton = page.locator("[routerlink*='cart']");

        this.ordersButton = page.getByRole('button', {name: 'ORDERS'});

        this.logoutButton = page.locator("button[routerlink='/dashboard/']");

    }

    async goToCart(): Promise<CartPage> {
        await this.cartButton.click();
        return new CartPage(this.page);
    }

    async goToOrders(): Promise<OrdersPage> {
    await this.ordersButton.click();

    return new OrdersPage(this.page);

}

    async logout(): Promise<void> {
        await this.logoutButton.click();
    }

}