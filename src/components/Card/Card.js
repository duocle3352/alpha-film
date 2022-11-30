import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { FaPlay } from 'react-icons/fa';
import { BsFillBookmarkHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Image } from '../Image';
import style from './Card.module.scss';

const cx = classNames.bind(style);

function Card({ item, type }) {
    return (
        <div className={cx('wrapper')}>
            <Link to={`/${item.media_type || type}/${item.id}`} className={cx('inner')}>
                <Image className={cx('img')} path={item.poster_path} alt={item.original_title || item.name} />
                <span className={cx('play-icon')}>
                    <FaPlay />
                </span>
            </Link>
            <button className={cx('heart-icon')}>
                <BsFillBookmarkHeartFill />
            </button>

            <div className={cx('title')}>
                <Link to={`/${item.media_type || type}/${item.id}`} className={cx('name')}>
                    {item.original_title || item.name}
                </Link>
                <p className={cx('time')}>{item.release_date || item.first_air_date}</p>
            </div>
        </div>
    );
}

Card.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string,
};

export default Card;
