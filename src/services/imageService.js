import * as httpRequest from '~/utils/httpRequest';

// https://api.themoviedb.org/3/tv/{tv_id}/images?api_key=422c277f59a1913e0290741efbfa04e8&language=en-US
const imageService = async (type, id) => {
    const res = await httpRequest.get(`${type}/${id}/images`, {
        params: {
            api_key: '422c277f59a1913e0290741efbfa04e8',
            language: 'en-US',
            include_image_language: 'en',
        },
    });
    return res?.backdrops;
};

export default imageService;
