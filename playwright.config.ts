import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import { env, getJsonFromFile } from "./src/setup/parseEnv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const testDir = defineBddConfig({
    features: "./e2e/src/features/*.feature",
    steps: "./e2e/src/**/*.ts",
});

const hostFilePath = env("HOST_FILE_PATH");
const hosts = getJsonFromFile<Record<string, string>>(hostFilePath);
const instance = env("INSTANCE") || "localhost";
const baseUrl = hosts[instance];

export default defineConfig({
    testDir,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [["html", { open: "never" }], ["line"]],
    use: {
        baseURL: baseUrl,

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        video: "on",
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: {
                browserName: "chromium",
            },
        },

        // {
        //   name: "firefox",
        //   use: {
        //     browserName: "firefox",
        //   },
        // },
    ],
});
