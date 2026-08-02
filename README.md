# Playwright UI & API Automation Framework

## Overview

This project is a production-style automation framework built using Playwright and TypeScript.

It demonstrates end-to-end UI automation, API automation, API + UI integration, Authentication State, Network Mocking, Data Driven Testing and reusable Page Object Model design.

The framework follows enterprise automation practices and is designed to be scalable, maintainable and easy to extend.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright API Testing
- Page Object Model (POM)
- Component Object Model
- Fixtures
- Authentication State
- JSON Data Driven Testing
- GitHub Actions (CI/CD)

---

## Project Structure

```text
src
│
├── api
├── components
├── config
├── fixtures
├── models
├── pages
├── testData
├── tests
└── utils
```

---

## Framework Features

✔ Page Object Model
✔ Component Object Model
✔ Base Page
✔ Fixtures
✔ Authentication State
✔ Environment Configuration
✔ UI Automation
✔ API Automation
✔ API + UI Integration
✔ Network Mocking
✔ Modify API Response
✔ API Response Validation
✔ Data Driven Testing
✔ Logger Utility
✔ GitHub Actions CI/CD

---

## Test Scenarios

### UI

- Login
- Add Product to Cart
- Checkout
- Place Order
- Orders Validation

### API

- Login API
- Get Products API
- Create Order API

### Hybrid

- Create Order using API
- Validate Order using UI

### Mocking

- Mock Products API
- Modify Product Response

---

## Installation

Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/playwright-ui-api-framework.git
```

Install dependencies

```bash
npm install
```

Run all tests

```bash
npx playwright test
```

Run Smoke Suite

```bash
npm run smoke
```

Run API Suite

```bash
npm run api
```

Run Regression Suite

```bash
npm run regression
```

---

## Reports

Generate HTML Report

```bash
npx playwright show-report
```

---

## Authentication

Authentication State is used to avoid repeated logins and improve execution speed.

Authentication file:

```
playwright/.auth/user.json
```

---

## Demo Application

Rahul Shetty Academy

https://rahulshettyacademy.com/client

---

## Demo Credentials

This project uses demo credentials for Rahul Shetty Academy site for automation practice.

No production or private credentials are included.

---

## Author

Bindusree Himabindu

Automation Test Engineer