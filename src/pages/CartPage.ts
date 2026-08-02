import {expect, Locator, Page} from '@playwright/test'
import { BasePage} from './BasePage'
import { PaymentPage} from './PaymentPage'
import { HeaderComponent } from '../components/HeaderComponent';

export class CartPage extends BasePage{
    private readonly cartProducts: Locator;
    private readonly checkoutButton: Locator;
    readonly header: HeaderComponent;

    constructor(page : Page)
    {
        super(page)
        this.cartProducts = this.page.locator("h3");
       this.checkoutButton = this.page.locator("text=Checkout");
       this.header = new HeaderComponent(page);
    }

    async verifyProductExists(productName : string): Promise<void>{
     await expect(this.cartProducts.filter({hasText: productName})).toBeVisible();
    }

     async proceedToCheckout(): Promise<PaymentPage>{
        await this.checkoutButton.click();
        return new PaymentPage(this.page);
    }

    
}
