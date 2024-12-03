import {When} from "../fixtures/fixtures";

When('I choose {string} from select', async function (city: string) {
    const cityOptionLocator = this.page.locator(`.inp-custom-select__item[data-filter="${city}"]`);

    await cityOptionLocator.waitFor({ state: 'visible' });

    await cityOptionLocator.click();
});