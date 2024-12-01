import { Page } from '@playwright/test';

// A global object to store variables during the test
export const GlobalState = {
    currentPage: null as Page | null,  // To store the current Playwright page object
    elementMappings: {} as Record<string, any>  // To store element mappings from JSON
};
