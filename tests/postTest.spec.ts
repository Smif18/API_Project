import { test, expect, APIResponse } from '@playwright/test';
import { Post } from './pages/Post';

test.describe('Post Page', () => {
    let post: Post;

    test.beforeEach(async ({ request }) => {
        post = new Post(request);
    
    });

    test('Создание статьи с валидными и обязательными полями', async () => {
        const title = 'New Article';
        const content = 'This is a new article';
        const response = await post.createPost(title, content);
        //expect(response.status()).toBe(201);
        //const responseBody = await response.json();
        expect(response.title.rav).toBe(title);
        expect(response.content.rav).toBe(content);

    })

});