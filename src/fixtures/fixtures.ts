import { test as base, createBdd } from 'playwright-bdd';
import { MyWorld} from "../support/world";

export const test = base.extend<{ myWorld: MyWorld }>({
    myWorld: async ({ page }, use, testInfo) => use(new MyWorld(page, testInfo)),
});

export const { Given, When, Then } = createBdd(test, {
    worldFixture: 'myWorld',
});
