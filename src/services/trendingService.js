import * as httpRequest from '~/utils/httpRequest';

const trendingService = async (time) => {
    const res = await httpRequest.get(`trending/all/${time}`, {
        params: {
            api_key: '422c277f59a1913e0290741efbfa04e8',
        },
    });

    return res.results;
};

export default trendingService;
// https://api.themoviedb.org/3/trending/tv/day?api_key=422c277f59a1913e0290741efbfa04e8
