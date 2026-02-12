# SauceDemo Automation Project

This repository contains automated frontend tests for [SauceDemo](https://www.saucedemo.com/) using **Playwright**.

## Test Scenarios
I have implemented test cases covering:
1. **Login & Security**: Success/Failure flows and locked-out user handling.
2. **Cart Management**: Adding and removing items with badge verification.
3. **Product Sorting**: Price (High-Low/Low-High) and Alphabetical (A-Z/Z-A) logic.

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
npx playwright install