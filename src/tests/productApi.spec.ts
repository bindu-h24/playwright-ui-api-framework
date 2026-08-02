import { test, expect } from "@playwright/test";
import { AuthApi } from "../api/AuthApi";
import { ProductApi } from "../api/ProductApi";
import { Logger } from '../utils/Logger';

import users from "../testData/users.json";

test("Get Product Id", async () => {

    const auth = new AuthApi();
    const login = await auth.login({userEmail: users.validUser.email, userPassword: users.validUser.password});

    const productApi = new ProductApi();
    const productId = await productApi.getProductId(login.token,users.products.product1);
    Logger.info(`Product Id : ${productId}`);
    
    expect(productId).toBeTruthy();

});