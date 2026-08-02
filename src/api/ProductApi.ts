import { ApiClient } from "./APIClient";
import { ApiEndpoints } from "./ApiEndpoints";
import { ProductResponse } from "../models/ProductResponse";

export class ProductApi extends ApiClient {

    async getAllProducts(token: string): Promise<ProductResponse> {

        await this.initialize();

        const response = await this.apiContext.post(ApiEndpoints.GET_PRODUCTS,
            {
                headers: {Authorization: token },

                data: {
                    productName: "",
                    minPrice: null,
                    maxPrice: null,
                    productCategory: [],
                    productSubCategory: [],
                    productFor: []
                }

            }
        );

        return await response.json();

    }

    async getProductId(token: string,productName: string): Promise<string> {

    const response = await this.getAllProducts(token);
    const product = response.data.find(
        p => p.productName === productName
    );

    if (!product) {

        throw new Error(
            `Product '${productName}' not found`
        );

    }

    return product._id;

}
}