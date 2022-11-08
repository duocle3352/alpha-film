import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

export const get = async (past, options = {}) => {
    try {
        const response = await httpRequest.get(past, options);

        return response.data;
    } catch (error) {
        console.log('Have Error:', error);
    }
};

export default httpRequest;
