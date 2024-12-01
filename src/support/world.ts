import { expect, Page, TestInfo } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

// World class definition to manage the state and actions related to the tests
export class MyWorld {
    public currentScreen: string | null = null; // To track the current screen

    constructor(public page: Page, testInfo: TestInfo) {}

    /**
     * Method to set the current screen name.
     * @param screenName - The name of the current screen to be set.
     */
    setCurrentScreen(screenName: string) {
        this.currentScreen = `${screenName}-page`;
    }

    /**
     * Method to open the homepage.
     */
    async navigateToPage(pageKey: string) {
        const pagesPath = process.env.PAGES_PATH || "../config/pages.json";
        const pagesConfig = JSON.parse(
            fs.readFileSync(path.join(__dirname, "..", "..", pagesPath), "utf-8")
        );

        const pageUrl = pagesConfig[`${pageKey}-page`];
        if (!pageUrl) {
            throw new Error(`URL for pageKey '${pageKey}' not found in pages.json`);
        }

        await this.page.goto(pageUrl);
    }

}
