import * as httpRequest from '~/utils/httpRequest';
// 422c277f59a1913e0290741efbfa04e8

const searchService = async (query, page) => {
    const res = await httpRequest.get('search/multi', {
        params: {
            api_key: '422c277f59a1913e0290741efbfa04e8',
            language: 'en-US',
            query,
            page,
            include_adult: false,
        },
    });

    return res.results;
};

export default searchService;
