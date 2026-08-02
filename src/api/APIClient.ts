import { APIRequestContext, request } from "@playwright/test";

export class ApiClient {

    protected apiContext!: APIRequestContext;

    async initialize(): Promise<void> {

        this.apiContext = await request.newContext({

            baseURL: process.env.API_BASE_URL

        });

    }

}