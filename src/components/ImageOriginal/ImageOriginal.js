import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';

import images from '~/assets/image';
import style from './ImageOriginal.module.scss';

const ImageOriginal = forwardRef(
    (
        { path, alt, className, fallBack: customFallBack = images.noImageOriginal, ...props },
        ref,
    ) => {
        const [fallBack, setFallBack] = useState('');

        const handleError = () => {
            setFallBack(customFallBack);
        };

        return (
            <img
                // https://image.tmdb.org/t/p/original/cs3LpA38BS2XDPfUzdgMB537XOo.jpg
                className={classNames(style.wrapper, className)}
                src={fallBack || `https://image.tmdb.org/t/p/original/${path}`}
                alt={alt}
                ref={ref}
                {...props}
                onError={handleError}
            />
        );
    },
);

ImageOriginal.propTypes = {
    path: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};

export default ImageOriginal;
