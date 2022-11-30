import * as httpRequest from '~/utils/httpRequest';

const appendService = async (type, id) => {
    const res = await httpRequest.get(`${type}/${id}`, {
        params: {
            api_key: '422c277f59a1913e0290741efbfa04e8',
            append_to_response: 'videos,images,credits,reviews,keywords,recommendations',
        },
    });

    return res;
};

export default appendService;
// https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos,images
