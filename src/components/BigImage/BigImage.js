import PropTypes from 'prop-types';

function BigImage({ path, alt, classNames }) {
    return (
        <img
            src={`https://image.tmdb.org/t/p/original${path}`}
            alt={alt}
            className={classNames}
        />
    );
}

BigImage.propTypes = {
    path: PropTypes.string.isRequired,
    alt: PropTypes.string,
    classNames: PropTypes.string,
};

export default BigImage;
