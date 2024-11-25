import { test, expect } from '@playwright/test';
import { Post } from './pages/Post'; // Путь к вашему классу Post

test.describe('Post Page', () => {
    let post: Post;

    test.beforeEach(async ({ request }) => {
        post = new Post(request);
    });

    test('Создание статьи с валидными и обязательными полями', async () => {
        const title = 'New Article';
        const content = 'This is a new article';

        const response = await post.createPost(title, content);


        expect(response.status()).toBe(201);
        expect(response).toHaveProperty('id');
        expect(response).toHaveProperty('date');
        const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
        expect(response.date).toMatch(iso8601Regex); 
        expect(response).toHaveProperty('slug');
        expect(response).toHaveProperty('title');
        expect(response).toHaveProperty('content');
        expect(response).toHaveProperty('author');
        expect(response).toHaveProperty('format');


        if (response.id === null || response.id === '') {
            console.log('Ошибка: id не может быть пустым или null');
            console.log('Фактическое значение id:', response.id);
        } else {
            expect(response.id).not.toBeNull();
            expect(response.id).not.toBe('');
        }
        
        if (response.title.raw !== title) {
            console.log('Ошибка: title не совпадает с ожидаемым');
            console.log('Ожидаемое значение:', title);
            console.log('Фактическое значение title:', response.title.raw);
        } else {
            expect(response.title.raw).toBe(title);
        }

        expect(response.content.raw).toBe(content);
        expect(response.slug).not.toBeNull();
        expect(response.slug).toBe('');
        expect(response.date).not.toBeNull();
        expect(response.date).not.toBe('');
        expect(response.title).not.toBeNull();
        expect(response.title.raw).toBe(title);
        expect(response.author).toBe(1);
        expect(response.format).toBe('standard');
        expect(response.content.protected).toBe(false);
        

        
        expect(typeof response.id).toBe('number');
        expect(typeof response.date).toBe('string');
        expect(typeof response.sticky).toBe('boolean');
        
     
        //expect(response.slug).toMatch(/^[a-z0-9-]+$/); 
        //expect(new Date(response.date).toISOString()).toBe(response.date); 
    });
});