# Playwright UI & API Automation Framework

A scalable UI and API automation framework built using **Playwright, TypeScript, and Node.js**.

This project demonstrates a production-style automation framework using **Page Object Model (POM), Component Object Model, custom fixtures, authentication state, data-driven testing, API automation, API/UI integration, network mocking, API response modification, reusable utilities, logging, cross-browser configuration, reporting, and GitHub Actions CI**.

The framework is built around the **Rahul Shetty Academy E-Commerce application** and is designed to be maintainable, reusable, and easy to extend.

---

## 🚀 Key Features

- Playwright UI Automation
- Playwright API Automation
- TypeScript
- Page Object Model (POM)
- Component Object Model
- Custom Playwright Fixtures
- Authentication State Management
- Data-Driven Testing
- JSON Test Data Management
- API Request/Response Handling
- API Response Validation
- API + UI Hybrid Testing
- Network Request Mocking
- API Response Modification
- API-based Order Creation
- UI Order Validation
- Reusable Utility Methods
- Custom Logging
- Environment Configuration
- Cross-Browser Configuration
- Playwright HTML Reports
- Allure Reporting
- Screenshots on Failure
- Video on Failure
- Trace on Retry
- GitHub Actions CI

---

# 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| Playwright | UI & API Automation |
| TypeScript | Programming Language |
| Node.js | Runtime Environment |
| Playwright Test | Test Runner |
| REST APIs | API Automation |
| JSON | Test Data Management |
| dotenv | Environment Configuration |
| Git | Version Control |
| GitHub | Source Code Repository |
| GitHub Actions | CI Execution |
| Allure | Test Reporting |

---

# 🏗️ Framework Architecture

The framework follows a layered automation architecture.

```text
                         Test Specifications
                              src/tests
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
       Page Objects          API Classes           Fixtures
        src/pages             src/api            src/fixtures
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  │
                                  ▼
                         Reusable Components
                          src/components
                                  │
                                  ▼
                           Utility Layer
                            src/utils
                                  │
                                  ▼
                         Test Data / Config
                    src/testData / src/config
# Project Structure
Playwright-POM-Framework/
│
├── src/
│   │
│   ├── api/
│   │   ├── APIClient.ts
│   │   ├── ApiEndpoints.ts
│   │   └── OrderAPI.ts
│   │
│   ├── components/
│   │   ├── HeaderComponent.ts
│   │   ├── ProductCardComponent.ts
│   │   └── ToastComponent.ts
│   │
│   ├── config/
│   │   └── env.ts
│   │
│   ├── fixtures/
│   │   └── testFixture.ts
│   │
│   ├── hooks/
│   │
│   ├── models/
│   │   ├── ApiOrderRequest.ts
│   │   └── ApiOrderResponse.ts
│   │
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── CartPage.ts
│   │   ├── PaymentPage.ts
│   │   ├── OrderConfirmationPage.ts
│   │   └── OrdersPage.ts
│   │
│   ├── testData/
│   │   ├── users.json
│   │   └── orders.json
│   │
│   ├── tests/
│   │   ├── auth/
│   │   │   └── auth.setup.ts
│   │   ├── apiLogin.spec.ts
│   │   ├── apiResponseValidation.spec.ts
│   │   ├── mockProducts.spec.ts
│   │   ├── modifyProductResponse.spec.ts
│   │   └── placeOrder.spec.ts
│   │
│   └── utils/
│       ├── Logger.ts
│       ├── ReusableMethods.ts
│       └── TestDataLoader.ts
│
├── playwright/
│   └── .auth/
│       └── user.json
│
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
🧩 Framework Design Patterns
1. Page Object Model

Application pages are represented by dedicated page classes.

Examples:

BasePage
LoginPage
DashboardPage
CartPage
PaymentPage
OrderConfirmationPage
OrdersPage

Page-specific locators and business actions are maintained inside the corresponding page classes.

Example:

const dashboardPage = await loginPage.login(
    email,
    password
);

await dashboardPage.addProductToCart("ZARA COAT 3");

This keeps test cases clean and separates test logic from page implementation details.

2. Component Object Model

Reusable UI components are maintained separately.

Examples:

HeaderComponent
ProductCardComponent
ToastComponent

This avoids duplicating common UI interactions across multiple page classes.

3. Base Page

Common page-level functionality is centralized in BasePage.

Examples include:

Navigation
Page load handling
Common assertions
Generic locator interactions
Common reusable page functionality

Child page classes extend the base page.

BasePage
   │
   ├── LoginPage
   ├── DashboardPage
   ├── CartPage
   ├── PaymentPage
   ├── OrderConfirmationPage
   └── OrdersPage
🔐 Authentication State Management

The framework uses Playwright's storageState functionality to reuse an authenticated browser session.

Authentication is performed through the setup test:

auth.setup.ts
       │
       ▼
Login
       │
       ▼
Validate Dashboard
       │
       ▼
Save Storage State
       │
       ▼
playwright/.auth/user.json
       │
       ▼
Reuse Authentication

This avoids unnecessary login operations for tests that do not specifically need to validate the login functionality.

Tests that need a fresh login can override the authentication state and perform the login flow independently.

🌍 Environment Configuration

The application URL is configured using environment variables.

Example:

BASE_URL=https://rahulshettyacademy.com/client/

The framework loads the configuration through the environment configuration layer.

Tests can then use:

await page.goto('/');

instead of hard-coding the application URL throughout the test suite.

🧪 UI Automation

The framework covers an end-to-end e-commerce workflow.

Login
Navigate to Login
       ↓
Enter Email
       ↓
Enter Password
       ↓
Click Login
       ↓
Validate Dashboard
Place Order
Login
  ↓
Dashboard
  ↓
Find Product
  ↓
Add Product to Cart
  ↓
Open Cart
  ↓
Verify Product
  ↓
Checkout
  ↓
Enter Payment Details
  ↓
Select Country
  ↓
Place Order
  ↓
Capture Order ID
  ↓
Validate Order History
📊 Data-Driven Testing

Test data is separated from test implementation.

Example:

src/testData/users.json
src/testData/orders.json

The TestDataLoader utility provides test data to the test cases.

Example:

const users = TestDataLoader.getUsers();
const orders = TestDataLoader.getOrders();

Multiple products can then be tested without duplicating test code.

Example:

for (const order of orders) {

    test(
        `User should place order for ${order.productName}`,
        async ({ loginPage }) => {

            // Test implementation

        }
    );

}

Adding another product can be handled through the test data rather than creating another test implementation.

🔌 API Automation

The framework contains a dedicated API automation layer using Playwright's APIRequestContext.

Architecture:

APIClient
    │
    ├── API Context Initialization
    │
    └── APIRequestContext
             │
             ▼
          OrderAPI
             │
             └── Create Order

Example:

const response = await this.apiContext.post(
    ApiEndpoints.CREATE_ORDER,
    {
        headers: {
            Authorization: token
        },
        data: {
            orders: [request]
        }
    }
);

This keeps API communication separate from test implementation.

🔄 API + UI Hybrid Testing

The framework demonstrates combining API operations with UI validation.

Example flow:

API
 │
 ├── Authenticate
 │
 ├── Create Order
 │
 └── Capture Order ID
          │
          ▼
         UI
          │
          ├── Open Orders
          │
          └── Validate Order

This approach demonstrates how API automation can be used alongside UI automation for faster and broader test coverage.

🎭 Network Mocking

Playwright network interception is used to mock backend responses.

Example:

await page.route(
    '**/api/ecom/product/get-all-products',
    async route => {

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockedResponse)
        });

    }
);

This allows the UI to be tested against controlled API data without depending entirely on live backend responses.

✏️ API Response Modification

The framework also demonstrates modifying a real backend response before returning it to the browser.

Flow:

Browser
   │
   ▼
API Request
   │
   ▼
page.route()
   │
   ▼
route.fetch()
   │
   ▼
Real API Response
   │
   ▼
Modify Response
   │
   ▼
route.fulfill()
   │
   ▼
Browser Receives Modified Response
   │
   ▼
UI Validation

Example use case:

The product price of ZARA COAT 3 can be modified during test execution.

product.productPrice = 999;

The UI can then be validated against the modified response.

🔎 API Response Validation

The framework validates API responses and compares backend data with the UI.

Example flow:

Dashboard
    │
    ▼
Products API
    │
    ▼
Capture Response
    │
    ▼
Validate JSON
    │
    ▼
Find Product
    │
    ▼
Validate Product Data
    │
    ▼
Compare With UI

Example validations include:

API response message
Product count
Product existence
Product name
Product price
UI/API data consistency
🧱 Custom Playwright Fixtures

Custom fixtures provide commonly used page objects directly to tests.

Instead of repeatedly creating page objects:

new LoginPage(page);
new DashboardPage(page);

tests can use:

async ({ loginPage, dashboardPage }) => {

    // Test implementation

}

This keeps test cases focused on business scenarios and improves maintainability.

🛠️ Reusable Utilities

Common reusable functionality is maintained under:

src/utils/

Current utilities include:

Logger.ts
TestDataLoader.ts
ReusableMethods.ts

The reusable methods layer is intended for generic functionality that can be shared across test cases instead of duplicating the same implementation.

Examples of reusable functionality can include:

Date utilities
Random test-data generation
Common string operations
Common test-data helpers
Other framework-level utility methods
📝 Logging

A custom logger is used to provide useful execution information.

Example:

Logger.info(`Generated Order ID: ${orderId}`);

This helps during debugging and provides useful runtime information during test execution.

🌐 Cross-Browser Configuration

The framework uses Playwright browser projects and can be configured for multiple browsers through:

playwright.config.ts

Supported Playwright browser configurations can include:

Chromium
Firefox
WebKit

The required browser projects can be enabled based on execution requirements.

📸 Failure Diagnostics

Playwright is configured to capture debugging evidence when tests fail.

Screenshot
screenshot: 'only-on-failure'

Screenshots are automatically captured for failed tests.

Video
video: 'retain-on-failure'

Video recordings are retained for failed tests.

Trace
trace: 'on-first-retry'

Trace information is collected when a test is retried.

These features help investigate failures without requiring additional screenshot or video code inside individual tests.

📊 Test Reporting
Playwright HTML Report

After test execution:

npx playwright show-report

The HTML report provides:

Test execution results
Failed test information
Execution duration
Screenshots
Videos
Trace information
Allure Reporting

The framework also supports Allure reporting.

Generate the Allure report:

allure generate allure-results --clean

Open the generated report:

allure open

Allure Commandline must be installed and available in the system PATH.

▶️ Running the Framework
1. Clone the Repository
git clone https://github.com/bindu-h24/playwright-ui-api-framework.git

Navigate to the project:

cd playwright-ui-api-framework
2. Install Dependencies
npm install
3. Configure Environment

Create a local .env file based on .env.example.

Example:
BASE_URL=https://rahulshettyacademy.com/client/

Do not commit private credentials or local authentication state files.

4. Install Playwright Browsers
npx playwright install
5. Run All Tests
npx playwright test
6. Run Tests in Headed Mode
npx playwright test --headed
7. Run a Specific Test
npx playwright test src/tests/placeOrder.spec.ts
8. Run Smoke Tests
npm run smoke
9. Run Regression Tests
npm run regression
10. Run API Tests
npm run api
11. Debug a Test
npx playwright test --debug

📋 Example Test Scenarios
UI Tests
User Login
Dashboard Validation
Product Selection
Add Product to Cart
Cart Validation
Checkout
Payment Details
Country Selection
Place Order
Order ID Validation
Order History Validation
API Tests
API Login
Product API Validation
Order Creation API
API Response Validation
API + UI Tests
Create Order through API
Validate Order through UI
Compare API Product Data with UI
Network Testing
Mock Products API
Modify Product API Response
Validate UI against mocked data
Validate UI against modified API data

🔄 GitHub Actions CI
The project is configured with GitHub Actions for automated test execution.

The CI workflow follows the basic pipeline:

Git Push / Pull Request
          ↓
Checkout Repository
          ↓
Setup Node.js
          ↓
Install Dependencies
          ↓
Install Playwright Browsers
          ↓
Run Tests
          ↓
Generate Test Results
          ↓
Upload Test Report

GitHub Actions configuration is maintained under:

.github/workflows/

Jenkins is not currently configured for this project. It can be added as a future CI/CD enhancement.

🔒 Test Data & Credentials

Sensitive environment values and authentication state are intentionally excluded from Git.

The project uses:

.env
playwright/.auth/

for local environment configuration and authentication state.

A template is provided through:
.env.example

Developers should create their own local .env file before running the framework.

🌐 Demo Application
This framework uses the Rahul Shetty Academy E-Commerce application for automation practice.

Application:
https://rahulshettyacademy.com/client/

The application provides functionality for:
User Authentication
Product Listing
Shopping Cart
Checkout
Order Placement
Order History
Backend APIs

🎯 Project Goals
The primary goals of this project are to demonstrate how to build a maintainable automation framework rather than simply creating individual test scripts.

The framework focuses on:

Maintainability
      +
Reusability
      +
Scalability
      +
Test Data Separation
      +
UI Automation
      +
API Automation
      +
Hybrid Testing
      +
Network Mocking
      +
CI Execution
      +
Reporting

📚 Skills Demonstrated
This project demonstrates practical experience with:

Playwright
TypeScript
Node.js
UI Automation
API Automation
REST API Testing
Page Object Model
Component Object Model
Custom Fixtures
Authentication State
Data-Driven Testing
JSON Test Data
API Request Context
API Response Validation
API/UI Integration
Network Interception
API Mocking
API Response Modification
Reusable Framework Utilities
Logging
Cross-Browser Testing
Failure Diagnostics
HTML Reporting
Allure Reporting
Git
GitHub
GitHub Actions

🚀 Future Enhancements
Potential future improvements include:

Jenkins CI integration
Additional API coverage
Additional negative test scenarios
Advanced API schema validation
Database validation
Enhanced test-data generation
Docker-based test execution
Additional CI/CD optimizations

👩‍💻 Author
Himabindu

Automation Test Engineer | QA Automation | Playwright | TypeScript | Selenium | API Testing
