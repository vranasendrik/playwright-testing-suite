import { Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export async function verifyCurrentPage(page: Page, pageName: string) {
    const pagesPath = path.join(__dirname, "..", "..", "config", "pages.json");

    const pagesConfig = JSON.parse(fs.readFileSync(pagesPath, "utf-8"));

    const expectedUrl = pagesConfig[`${pageName.toLowerCase()}`];
    if (!expectedUrl) {
        throw new Error(`Page key '${pageName}-page' not found in pages.json`);
    }

    const currentUrl = await page.url();

    if (!currentUrl.startsWith(expectedUrl)) {
        throw new Error(
            `Expected to be on a page starting with '${expectedUrl}', but was on '${currentUrl}'`
        );
    }
}
