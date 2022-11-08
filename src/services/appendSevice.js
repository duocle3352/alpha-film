import * as httpRequest from '~/utils/httpRequest';

const appendService = async () => {
    const res = await httpRequest.get();

    console.log(res);
    // return res
};

export default appendService;
// https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos,images
