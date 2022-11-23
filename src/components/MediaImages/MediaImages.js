import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState, memo } from 'react';
import imageService from '~/services/imageService';
import style from './MediaImages.module.scss';

const cx = classNames.bind(style);

function MediaImages({ type, id, className, currentSlide, onGetPath }) {
    const [listImg, setListImg] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const results = await imageService(type, id);
            if (results) {
                setListImg(results.slice(0, 6));
            } else {
                setListImg([]);
            }
        };

        fetchApi();
    }, [type, id]);

    // https://image.tmdb.org/t/p/original/cs3LpA38BS2XDPfUzdgMB537XOo.jpg
    return listImg.map((image, index) => (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <img
            className={cx({ [className]: className }, { active: currentSlide === image.file_path })}
            src={`https://image.tmdb.org/t/p/original${image.file_path}`}
            alt={'image'}
            key={index}
            onClick={() => onGetPath(image.file_path)}
        />
    ));
}

MediaImages.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    currentSlide: PropTypes.string,
    onGetPath: PropTypes.func,
    className: PropTypes.string,
};

export default memo(MediaImages);
