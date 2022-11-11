import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';

import images from '~/assets/image';
import style from './Image.module.scss';

const Image = forwardRef(
    ({ path, alt, className, fallBack: customFallBack = images.noImage, ...props }, ref) => {
        const [fallBack, setFallBack] = useState('');

        const handleError = () => {
            setFallBack(customFallBack);
        };

        return (
            <img
                className={classNames(style.wrapper, className)}
                src={fallBack || `https://image.tmdb.org/t/p/w220_and_h330_face${path}`}
                alt={alt}
                ref={ref}
                {...props}
                onError={handleError}
            />
        );
    },
);

Image.propTypes = {
    path: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};

export default Image;
