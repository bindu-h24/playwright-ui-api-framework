import { ApiClient } from "./APIClient";
import { ApiEndpoints } from "./ApiEndpoints";
import { LoginRequest } from "../models/LoginRequest";
import { LoginResponse } from "../models/LoginResponse";

export class AuthApi extends ApiClient {

    async login(requestBody: LoginRequest): Promise<LoginResponse> {

        await this.initialize();
        const response = await this.apiContext.post(ApiEndpoints.LOGIN,{data: requestBody});
        return await response.json();
    }

}