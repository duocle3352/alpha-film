import * as httpRequest from '~/utils/httpRequest';

const popularService = async (type, page = '1') => {
    const res = await httpRequest.get(`${type}/popular`, {
        params: {
            api_key: '422c277f59a1913e0290741efbfa04e8',
            language: 'en-US',
            page: page,
        },
    });

    return res.results;
};

export default popularService;
// https://api.themoviedb.org/3/movie/popular?api_key=422c277f59a1913e0290741efbfa04e8&language=en-US&page=1
