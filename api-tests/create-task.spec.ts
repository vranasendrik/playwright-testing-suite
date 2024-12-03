import { test, expect, request } from '@playwright/test';

test.describe('POST /tasks - Create New Task', () => {
    test('should create a new task with status 200', async ({}) => {
        const apiContext = await request.newContext();

        const requestData = {
            text: 'New Task Content',
        };

        const response = await apiContext.post('http://localhost:8080/tasks', {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(requestData),
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');
        expect(responseBody.id).toEqual(expect.any(String));
        expect(responseBody).toHaveProperty('text');
        expect(responseBody.text).toBe(requestData.text);
    });
});
