import { ApiClient } from "./APIClient";
import { ApiEndpoints } from "./ApiEndpoints";
import { ApiOrderRequest } from "../models/ApiOrderRequest";
import { ApiOrderResponse } from "../models/ApiOrderResponse";

export class OrderAPI extends ApiClient {

    async createOrder(token: string,request: ApiOrderRequest): Promise<ApiOrderResponse> {

        await this.initialize();

        const response = await this.apiContext.post(ApiEndpoints.CREATE_ORDER,
            {
                headers: {Authorization: token},

                data: {
                    orders: [request]
                }
            }
        );

        return await response.json();

    }

}