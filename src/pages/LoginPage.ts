import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { DashboardPage } from "./DashboardPage";

export class LoginPage extends BasePage{
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly loginErrorMessage: Locator;

    constructor(page : Page){
        super(page);

        this.emailInput = page.locator('#userEmail');
        this.passwordInput = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
        this.loginErrorMessage = page.locator("[class*='flyInOut']");
    }

    /**
     * Business action.
     */
    async login(email: string, password: string): Promise<DashboardPage> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        return new DashboardPage(this.page);
    }

    /**
     * Exposes page state.
     * Assertion stays in the test.
     */
    async getLoginError(): Promise<string> {
        return (await this.loginErrorMessage.textContent()) ?? '';
    }

    toDashboard(): DashboardPage {
    return new DashboardPage(this.page);
}
}