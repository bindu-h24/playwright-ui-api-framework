import { expect, Locator } from '@playwright/test';

export class ProductCardComponent {

    constructor(private readonly productCard: Locator) {}

    async getProductName(): Promise<string> {
        return (await this.productCard.getByRole('heading').textContent())?.trim() ?? "";
    }

    async addToCart(): Promise<void> {
        await this.productCard.locator("text= Add To Cart").click();
    }

    async verifyVisible(): Promise<void> {
        await expect(this.productCard).toBeVisible();
    }

}