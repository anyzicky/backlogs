import config from '../config'

class CategoriesService {

    static async getAll() {
        try {
            const response = await fetch(`${config.server.url}/categories`);          
            return await response.json();
        } catch (err) {
            console.log('error get category', err)
        }    
    }
}

export default CategoriesService