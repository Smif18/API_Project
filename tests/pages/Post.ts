import { APIRequestContext, APIResponse } from '@playwright/test';
export class Post {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createPost(title: string, content: string): Promise<APIResponse> {
        const response = await this.request.post('/wp-json/wp/v2/posts', {
            data: { title, content },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic` + Buffer.from('admin: Engineer_123').toString('base64'),
            },
        });
        return response.json();
}
}