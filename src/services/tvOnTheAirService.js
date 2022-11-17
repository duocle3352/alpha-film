import * as httpRequest from '~/utils/httpRequest';

const tvOnTheAirService = async (page = 1) => {
    const res = await httpRequest.get('tv/on_the_air', {
        params: {
            api_key: '422c277f59a1913e0290741efbfa04e8',
            language: 'en-US',
            page,
        },
    });

    return res;
};

export default tvOnTheAirService;
// https://api.themoviedb.org/3/tv/on_the_air?api_key=422c277f59a1913e0290741efbfa04e8&language=en-US&page=1
