import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { PaymentDetails } from '../models/PaymentDetails';
import { HeaderComponent } from '../components/HeaderComponent';
import { OrderConfirmationPage } from "./OrderConfirmationPage";

export class PaymentPage extends BasePage{

        private readonly cardNumberInput: Locator;
        private readonly expiryMonthDropdown: Locator;
        private readonly expiryYearDropdown: Locator;
        private readonly cvvInput: Locator;
        private readonly cardHolderInput: Locator;

        private readonly countryInput: Locator;
        private readonly countrySuggestions: Locator;
        private readonly placeOrderButton: Locator;
        readonly header: HeaderComponent;
        

    constructor (page: Page){
        super(page);

         this.cardNumberInput =this.inputByTitle('Credit Card Number');

         this.expiryMonthDropdown = this.selectByTitle("Expiry Date").first();
         this.expiryYearDropdown = this.selectByTitle("Expiry Date").nth(1);
         
         this.cvvInput = this.inputByTitle('CVV Code');
         this.cardHolderInput =this.inputByTitle('Name on Card');

         this.countryInput =this.page.locator("[placeholder='Select Country']");
         this.countrySuggestions =this.page.locator(".ta-results button");
         this.placeOrderButton =this.page.locator(".action__submit");
                this.header = new HeaderComponent(page);
         
    }
    
    async verifyPageLoaded(): Promise<void> {
    await expect(this.placeOrderButton).toBeVisible();
}

async enterCardDetails(payment: PaymentDetails): Promise<void> {

    await this.cardNumberInput.clear();
    await this.cardNumberInput.fill(payment.cardNumber);

    await this.expiryMonthDropdown.selectOption(payment.expiryMonth);
    await this.expiryYearDropdown.selectOption(payment.expiryYear);

    await this.cvvInput.fill(payment.cvv);
    await this.cardHolderInput.fill(payment.cardHolder);
}

async selectCountry(country: string): Promise<void> {
    await this.countryInput.click();
    await this.countryInput.pressSequentially(country.substring(0,3));
    await expect(this.countrySuggestions.first()).toBeVisible();

    const suggestions = await this.countrySuggestions.all();
    for (const suggestion of suggestions) {
        const text = (await suggestion.textContent())?.trim();
        if (text === country) {
            await suggestion.click();
            return;
        }
    }
    throw new Error(`Country '${country}' not found`);
}

async placeOrder():Promise<OrderConfirmationPage>{
    await this.placeOrderButton.click();
    return new OrderConfirmationPage(this.page);
}

}