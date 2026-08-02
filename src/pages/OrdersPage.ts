import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent';

export class OrdersPage extends BasePage {

    private readonly orderRows: Locator;
    readonly header: HeaderComponent;

    constructor(page: Page) {
        super(page);
        this.orderRows = page.locator("tbody tr");
        this.header = new HeaderComponent(page);
    }

    private async findOrderRow(orderId: string): Promise<Locator> {
        await this.orderRows.first().waitFor();
        const count = await this.orderRows.count();
        for (let i = 0; i < count; i++) {

            const row = this.orderRows.nth(i);
            const currentOrderId = (
                await row.locator("th").textContent()
            )?.trim();

            if (currentOrderId === orderId) {
                return row;
            }
        }

        throw new Error(`Order '${orderId}' not found.`);
    }

    async verifyOrderExists(orderId: string): Promise<void> {
        const row = await this.findOrderRow(orderId);
        await expect(row).toBeVisible();

    }
    
    async openOrder(orderId: string): Promise<void> {
    const row = await this.findOrderRow(orderId);
    await row.getByRole('button', { name: 'View' }).click();

    }

}