import * as httpRequest from '~/utils/httpRequest';

const tvAiringTodayService = async (page = 1) => {
    const res = await httpRequest.get('tv/airing_today', {
        params: {
            api_key: '422c277f59a1913e0290741efbfa04e8',
            language: 'en-US',
            page,
        },
    });

    return res;
};

export default tvAiringTodayService;
// https://api.themoviedb.org/3/tv/airing_today?api_key=422c277f59a1913e0290741efbfa04e8&language=en-US&page=1
