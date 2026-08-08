import { test } from '@playwright/test';

test.beforeEach(async ({ }, testInfo) => {

    console.log("====================================");
    console.log(`Starting Test: ${testInfo.title}`);
    console.log("====================================");

});

test.afterEach(async ({ }, testInfo) => {

    console.log("====================================");
    console.log(`Finished Test: ${testInfo.title}`);
    console.log(`Status : ${testInfo.status}`);
    console.log("====================================");

});