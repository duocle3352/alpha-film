import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import images from '~/assets/image';
import style from './ImageOriginal.module.scss';

const ImageOriginal = forwardRef(({ path, alt, className, fallBack = images.noImageOriginal, ...props }, ref) => {
    let link = `https://image.tmdb.org/t/p/original/${path}`;
    if (!path) link = fallBack;

    return (
        <img
            // https://image.tmdb.org/t/p/original/cs3LpA38BS2XDPfUzdgMB537XOo.jpg
            className={classNames(style.wrapper, className)}
            src={link}
            alt={alt}
            ref={ref}
            {...props}
        />
    );
});

ImageOriginal.propTypes = {
    path: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};

export default ImageOriginal;
