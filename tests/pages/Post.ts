import { APIRequestContext, APIResponse } from '@playwright/test';
export class Post {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createPost(title: string, content: string): Promise<any> {
        const response = await this.request.post('/wp-json/wp/v2/posts', {
            data: { title, content },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ` + Buffer.from('admin:Engineer_123').toString('base64'),
            },
    
        });
    
        // Проверяем, успешен ли запрос
        if (!response.ok()) {
            const error = await response.json(); // Парсим ошибку
            console.error('Ошибка при создании поста:', error);
            throw new Error(`Ошибка API: ${response.status()} ${response.statusText()}`);
        }
    
        return response.json(); // Возвращаем разобранный JSON
    }
}