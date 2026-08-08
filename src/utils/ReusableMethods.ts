import { Locator, Page } from "@playwright/test";

export class ReusableMethods {

    //Current Date
    static getCurrentDate(): string {

        return new Date().toLocaleDateString();

    }

    // Current Time
    static getCurrentTime(): string {
        return new Date().toLocaleTimeString();

    }

    //Timestamp
    static getTimeStamp(): number {
        return Date.now();

    }

    //Random Number
    static getRandomNumber(max: number = 1000): number {
        return Math.floor(Math.random() * max);
    }

    //Random Email
    static getRandomEmail(): string {
        return `user${Date.now()}@gmail.com`;
    }

    //Random String
    static getRandomString(length = 8): string {
        return Math.random().toString(36).substring(2, 2 + length);
    }

    //Screenshot
    static async captureScreenshot(page: Page, fileName: string) {
        await page.screenshot({
            path: `screenshots/${fileName}.png`,
            fullPage: true
        });

    }

    //Scroll Into View
    static async scrollIntoView(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    //Pause
    static async wait(seconds: number) {
        await new Promise(resolve =>
            setTimeout(resolve, seconds * 1000)
        );
    }

}