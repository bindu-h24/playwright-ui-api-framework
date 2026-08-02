import { expect, Locator, Page } from '@playwright/test';

export class ToastComponent {

    private readonly successToast: Locator;
    private readonly loadingSpinner: Locator;

    constructor(private readonly page: Page) {

        this.successToast = this.page.locator('#toast-container');
        this.loadingSpinner = this.page.locator('.ng-animating');

    }

    async waitForSuccessToast(): Promise<void> {
        await expect(this.successToast).toBeVisible();

    }

    async waitForLoadingToDisappear(): Promise<void> {
        await this.loadingSpinner.waitFor({
            state: 'hidden'
        });

    }

}