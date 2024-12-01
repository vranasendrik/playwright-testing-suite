import { Page, Locator } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

config();

/**
 * Function to get the locator for a given element based on the current screen and key.
 * @param page - The Playwright Page instance.
 * @param currentScreen - The name of the current screen (can be null).
 * @param elementKey - The key for the element we want to find.
 * @returns The locator for the specified element.
 */
export const getElementLocator = (
    page: Page,
    currentScreen: string | null,
    elementKey: string
): Locator => {
    const elementsPath =
        process.env.PAGE_ELEMENTS_PATH || "../../config/mappings";
    console.log("Current Screen", currentScreen);

    // Adjust the file path based on the structure of your project
    const specificFilePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "config",
        "mappings",
        `${currentScreen}.json`
    );
    let locators = {};

    // Load locators from the specific file if it exists
    if (currentScreen && fs.existsSync(specificFilePath)) {
        locators = JSON.parse(fs.readFileSync(specificFilePath, "utf-8"));

        // Load locators from the default common.json file
        const commonFilePath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "config",
            "mappings",
            "common.json"
        );
        const commonLocators = JSON.parse(fs.readFileSync(commonFilePath, "utf-8"));

        // Search for the locator first in the specific file, then in common.json
        const locator = locators[elementKey] || commonLocators[elementKey];

        if (!locator) {
            throw new Error(
                `Element with key '${elementKey}' not found on screen '${currentScreen}'`
            );
        }

        return page.locator(locator); // Return the locator directly
    }
};
