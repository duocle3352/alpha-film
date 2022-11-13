import { useEffect, useState } from 'react';
import imageService from '~/services/imageService';

function MediaImages({ type, id, className }) {
    const [listImg, setListImg] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const results = await imageService(type, id);

            setListImg(results.slice(0, 6));
        };

        fetchApi();
    }, [type, id]);

    // https://image.tmdb.org/t/p/original/cs3LpA38BS2XDPfUzdgMB537XOo.jpg
    return listImg.map((image, index) => (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
            className={className}
            src={`https://image.tmdb.org/t/p/original${image.file_path}`}
            alt={'image'}
            key={index}
        />
    ));
}

export default MediaImages;
