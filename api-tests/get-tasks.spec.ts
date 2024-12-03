import { test, expect, request } from '@playwright/test';

test.describe('GET /tasks - Retrieve Task List', () => {
    test('should return a list of tasks with status 200', async ({}) => {
        const apiContext = await request.newContext();

        const response = await apiContext.get('http://localhost:8080/tasks', {
            headers: {
                'accept': 'application/json',

            },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);

        for (const task of responseBody) {
            expect(task).toHaveProperty('id');
            expect(task.id).toEqual(expect.any(String));

            expect(task).toHaveProperty('text');
            expect(task.text).toEqual(expect.any(String));

            expect(task).toHaveProperty('completed');
            expect(task.completed).toEqual(expect.any(Boolean));

            expect(task).toHaveProperty('createdDate');
            expect(task.createdDate).toEqual(expect.any(Number));

            if (task.completedDate != null) {
                expect(task.completedDate).toEqual(expect.any(Number));
            }
        }

    });
});
