import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent';

export class OrderConfirmationPage extends BasePage {

    private readonly confirmationMessage: Locator;
    private readonly orderIdLabel: Locator;
    readonly header: HeaderComponent;
    
    constructor(page: Page) {

        super(page);

        this.confirmationMessage = this.page.locator(".hero-primary");
        this.orderIdLabel = this.page.locator(".em-spacer-1 .ng-star-inserted");
        this.header = new HeaderComponent(page);
    }

    // Verify Order Confirmation Page loaded successfully.
    async verifyOrderPlaced(): Promise<void> {

    await expect(this.confirmationMessage).toHaveText(" Thankyou for the order. ");

}

// Returns generated Order ID.
async getOrderId(): Promise<string> {

    const orderId = await this.orderIdLabel.textContent();
    return orderId?.replace(/\|/g, "").trim() ?? "";
}
}