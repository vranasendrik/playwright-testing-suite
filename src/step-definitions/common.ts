import {Given, Then, When} from "../fixtures/fixtures";
import {getElementLocator} from "../support/locator-helper";
import {MyWorld} from "../support/world";
import {expect} from "@playwright/test";
import {handleCookies} from "../support/cookies-handler";
import {verifyCurrentPage} from "../support/verifiy-current-page";

Given("Open {string} page", async function (pageKey) {
    await this.navigateToPage(pageKey);
    this.setCurrentScreen(pageKey);

});

When("I click on {string}", async function (elementKey: string) {

    const elementLocator = getElementLocator(
        this.page,
        this.currentScreen,
        elementKey
    );
    console.log(elementLocator)

    await elementLocator.first().waitFor({ state: 'visible' });
    await elementLocator.first().click();

    await this.page.waitForLoadState("domcontentloaded");
});

When(
    "I enter {string} in the {string}",
    async function (this: MyWorld, value: string, elementKey: string) {
   // await handleCookies( 'accept-cookies-button')
        const elementLocator = getElementLocator(
            this.page,
            this.currentScreen,
            elementKey
        );

        await expect(elementLocator).toBeVisible();
        await elementLocator.fill(value);
    }
);

Then("I am on the {string} page", async function (pageKey: string) {
    await verifyCurrentPage(this.page, pageKey);

    this.setCurrentScreen(pageKey);
});

When('I hover {string} and click on {string}', async function (hoverElementKey: string, dropdownElementKey: string) {
    const hoverElementLocator = getElementLocator(this.page, this.currentScreen, hoverElementKey);
    const dropdownElementLocator = getElementLocator(this.page, this.currentScreen, dropdownElementKey);

    console.log(hoverElementLocator)
    await hoverElementLocator.hover();

    await dropdownElementLocator.waitFor({ state: 'visible' });
    await dropdownElementLocator.click();
});

Then('I check that {string} is present in all {string}', async function (value: string, elementKey: string) {
    const elements = getElementLocator(this.page, this.currentScreen, elementKey)

    const texts = await elements.allTextContents();

    texts.forEach(text => {
        expect(text).toContain(value);
    });
});
