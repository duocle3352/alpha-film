import * as httpRequest from '~/utils/httpRequest';

const topRateService = async (type, page = 1) => {
    const res = await httpRequest.get(`${type}/top_rated`, {
        params: {
            api_key: '422c277f59a1913e0290741efbfa04e8',
            language: 'en-US',
            page,
        },
    });

    return res.results;
};

export default topRateService;
// https://api.themoviedb.org/3/tv/top_rated?api_key=422c277f59a1913e0290741efbfa04e8&language=en-US&page=1
