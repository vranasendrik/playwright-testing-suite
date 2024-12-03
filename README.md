# Playwright Testing Suite

This project is a testing suite using Playwright for both GUI and API testing. It leverages Playwright BDD for GUI testing with Gherkin syntax and Playwright for API testing.
## Table of Contents

- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running Tests](#running-tests)


## Installation

To get started with the Playwright Testing Suite, follow these steps to set up the environment:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/playwright-testing-suite.git
   cd playwright-testing-suite
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

## Environment Configuration

The project uses environment variables that can be configured in a `.env` file. Here's an example:

```bash
HOST_FILE_PATH="./path/to/hosts.json"
INSTANCE=localhost - (For this case not used)
```

Ensure that the `.env` file is properly configured for your environment.

## Running Tests

To run the tests, you can use the following commands:

- **Run test in UI mode:**

   ```bash
   npm test
   ```

  This will run tests in UI mode

- **Run tests for specific tags (e.g., smoke, regression):**

   ```bash
   npm run test-smoke
   ```

  This will run only the tests tagged with `@smoke`.

- **Run tests for tag dev:**

   ```bash
   npm run test-dev
   ```

- **Run specific regression tests:**

   ```bash
   npm run test-regression
   ```
- **Run api tests :**

   ```bash
   npm run test-api
   ```
