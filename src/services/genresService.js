import * as httpRequest from '~/utils/httpRequest';

const genreService = async (type) => {
    const res = await httpRequest.get(`genre/${type}/list`, {
        params: {
            api_key: '422c277f59a1913e0290741efbfa04e8',
            language: 'en-US',
        },
    });

    return res.genres;
};

export default genreService;
