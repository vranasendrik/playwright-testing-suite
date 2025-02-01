import { test, expect, request } from '@playwright/test';

test.describe('POST /tasks/{id} - Update Task Information', () => {
    test('should update the task and return status 200', async ({}) => {
        const apiContext = await request.newContext();

        const taskId = '1wPwKFUFCzTJIVq-BFRBO';

        const updateData = {
            text: 'Updated Task Content',
        };

        const response = await apiContext.post(`http://localhost:8080/tasks/${taskId}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(updateData),
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('id');
        expect(responseBody.id).toEqual(taskId);
        expect(responseBody).toHaveProperty('text');
        expect(responseBody.text).toBe(updateData.text);
    });
});
