import { test, expect } from "@playwright/test";
import { AuthApi } from "../api/AuthApi";
import users from "../testData/users.json";

test("Login API", async () => {

    const authApi = new AuthApi();

    const response = await authApi.login({
        userEmail: users.validUser.email,
        userPassword: users.validUser.password
    });

    expect(response.message).toBe("Login Successfully");

    expect(response.token).toBeTruthy();

    console.log(response.token);

});