import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Image } from '../Image';
import style from './Card.module.scss';

const cx = classNames.bind(style);

function Card({ item }) {
    return (
        <div className={cx('wrapper')}>
            <Link to={`/${item.media_type}/${item.id}`} className={cx('inner')}>
                <Image
                    className={cx('img')}
                    path={item.poster_path}
                    alt={item.original_title || item.name}
                    size="200"
                />
            </Link>
            <div className={cx('info')}>
                <Link to={`/${item.media_type}/${item.id}`} className={cx('name')}>
                    {item.original_title || item.name}
                </Link>
                <p className={cx('time')}>{item.release_date || item.first_air_date}</p>
            </div>
        </div>
    );
}

Card.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Card;
