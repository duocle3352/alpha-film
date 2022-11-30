import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import images from '~/assets/image';
import style from './Image.module.scss';

const Image = forwardRef(({ path, alt, className, fallBack = images.noImage, ...props }, ref) => {
    let link = `https://image.tmdb.org/t/p/w300_and_h450_face${path}`;
    if (!path) link = fallBack;

    return <img className={classNames(style.wrapper, className)} src={link} alt={alt} ref={ref} {...props} />;
});

Image.propTypes = {
    path: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};

export default Image;
