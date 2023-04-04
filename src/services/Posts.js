import config from '../config'
import {param} from '../helpers/url'

class PostsService {

    static async create(post) {
        try {
            const response = await fetch(`${config.server.url}/posts`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(post)
                }
            );        
            return await response.json();
        } catch (err) {
            console.log('error create post', err)
        }
    }

    static async delete(id) {
        try {
            const response = await fetch(`${config.server.url}/posts/${id}`, {
                method: 'delete',
                headers: {
                    //'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });          
            console.log('response', response)
            return await response.json();
        } catch (err) {
            console.log('error get posts', err)
        }
    }

    static async getAll(page, filter = {}) {
        try {
            const url = `${config.server.url}/posts?page=${page}&${param(filter)}`
            const response = await fetch(url);          
            return await response.json();
        } catch (err) {
            console.log('error get posts', err)
        }
    }

    static async getYears() {
        try {
            const response = await fetch(`${config.server.url}/posts/years`);          
            return await response.json();
        } catch (err) {
            console.log('error get category', err)
        }    
    }
}

export default PostsService