import {expect, Page} from '@playwright/test'
import { Locator } from '@playwright/test'; 

export class BasePage {
    // Accessible only to child pages.
    protected readonly page: Page;
    
    constructor(page : Page){
        this.page = page;
    }
    
    /**
     * Navigates to a page using Playwright's configured baseURL.
     */
    async navigate(path: string = ''){
        await this.page.goto(path)
    }

    async click(Locator: Locator) : Promise<void>{
    await Locator.click();
    }
    
    /**
     * Waits until network activity is complete.
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Generic page title verification.
     */
    async verifyTitle(title: string): Promise<void> {
        await expect(this.page).toHaveTitle(title);
    }

    /**
     * Returns current URL.
     */
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }


    protected inputByTitle(title: string): Locator {
    return this.page.locator(
        `.field:has(.title:has-text("${title}")) input`
    );
    }

    protected selectByTitle(title: string): Locator {
    return this.page.locator(
        `.field:has(.title:text-is('Expiry Date')) select`
    );

}
}