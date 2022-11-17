import * as httpRequest from '~/utils/httpRequest';

const moviesUpcomingService = async (page = 1) => {
    const res = await httpRequest.get('movie/upcoming', {
        params: {
            api_key: '422c277f59a1913e0290741efbfa04e8',
            language: 'en-US',
            page,
        },
    });
    return res;
};

export default moviesUpcomingService;
// https://api.themoviedb.org/3/movie/upcoming?api_key=422c277f59a1913e0290741efbfa04e8&language=en-US&page=1
