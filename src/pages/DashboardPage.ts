import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HeaderComponent } from '../components/HeaderComponent';
import { ProductCardComponent } from '../components/ProductCardComponent';
import { ToastComponent } from '../components/ToastComponent';

export class DashboardPage extends BasePage {

    private readonly productCards: Locator;
    readonly header: HeaderComponent;
    
    // Composition
    readonly toast: ToastComponent;

    constructor(page: Page) {
        super(page);
        this.productCards = page.locator('.card-body');
        this.toast = new ToastComponent(this.page);
        this.header = new HeaderComponent(page);

    }

    /**
     * Page-level verification.
     */
    async verifyDashboardLoaded(): Promise<void> {
        await expect(this.productCards.first()).toBeVisible();
    }

    
    async addProductToCart(productName: string): Promise<void> {
        await this.productCards.first().waitFor();

        const count = await this.productCards.count();
        for (let i = 0; i < count; i++) {

            const product = new ProductCardComponent(
                this.productCards.nth(i)
            );

            const currentProduct = await product.getProductName();
            if (currentProduct === productName) {
                
                await product.addToCart();
                await this.toast.waitForSuccessToast();
                return;
            }
        }
    throw new Error(`Product '${productName}' was not found.`);
}

getProductCard(productName: string): Locator {
    return this.productCards.filter({
        hasText: productName
    });
}

}