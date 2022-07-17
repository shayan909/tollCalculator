import axios from 'axios';

class HttpService {

    constructor() {
        const baseURL = 'https://crudcrud.com/api/0de6f86092554f1a984f644dc24fb0f5/trips';
        this.service = axios.create({
            baseURL: baseURL
        });
    }

    get = (url, resolve, reject) => {
        this.service.get(url)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error)
            });
    };

    post = async (url, data) => {
        return await this.service.post(url, data);
    }

    put = async (url, data) => {
        return await this.service.put(url, data);
    }
}

export default new HttpService;