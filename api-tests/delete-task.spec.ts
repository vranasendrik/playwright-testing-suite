import { test, expect, request } from '@playwright/test';

test.describe('DELETE /tasks/{id} - Delete Task', () => {
    test('should create, delete the task and return status 200', async ({}) => {
        const apiContext = await request.newContext();


        const createData = {
            text: 'Task to be deleted',
        };
        // Create task for delete
        const createResponse = await apiContext.post('http://localhost:8080/tasks', {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(createData),
        });

        expect(createResponse.status()).toBe(200);

        const createdTask = await createResponse.json();
        const taskId = createdTask.id;

        const deleteResponse = await apiContext.delete(`http://localhost:8080/tasks/${taskId}`, {
            headers: {
                'accept': 'application/json',
            },
        });

        expect(deleteResponse.status()).toBe(200);

        const checkResponse = await apiContext.get(`http://localhost:8080/tasks/${taskId}`);
        expect(checkResponse.status()).toBe(404);
    });
});
