import * as httpRequest from '~/utils/httpRequest';

const moviesInTheatresService = async (page = 1) => {
    const res = await httpRequest.get('movie/now_playing', {
        params: {
            api_key: '422c277f59a1913e0290741efbfa04e8',
            language: 'en-US',
            page,
        },
    });

    return res;
};

export default moviesInTheatresService;
// https://api.themoviedb.org/3/movie/now_playing?api_key=422c277f59a1913e0290741efbfa04e8&language=en-US&page=1
