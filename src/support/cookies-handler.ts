import { Page } from "@playwright/test";
import { getElementLocator } from "./locator-helper";

export async function handleCookies( buttonSelector: string) {
    const cookiesButton = getElementLocator(this.page, this.currentScreen, buttonSelector);
    console.log(cookiesButton)
    if (await cookiesButton.isVisible()) {
        await cookiesButton.click();
    }
}
