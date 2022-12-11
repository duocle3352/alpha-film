import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BsFillBookmarkDashFill, BsFillBookmarkPlusFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import { addBookmark, removeBookmark } from '~/features/bookmarkSlice';
import { Image } from '../Image';
import style from './Card.module.scss';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);

function Card({ item, type }) {
    const dispatch = useDispatch();
    const bookmarkList = useSelector((state) => state.bookmark);
    // eslint-disable-next-line eqeqeq
    const bookmarked = bookmarkList.some((bookmark) => bookmark.item.id == item.id);
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);

    const toastMassage = (massage) =>
        toast.success(massage, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });

    const handleAddToBookmark = () => {
        const payload = { item, type: type || item.media_type };
        dispatch(addBookmark(payload));
        setIsBookmarked(true);
        toastMassage('Đã thêm vào bookmark');
    };

    const handleMoveOutBookmark = () => {
        dispatch(removeBookmark(item.id));
        setIsBookmarked(false);
        toastMassage('Đã xóa khỏi bookmark');
    };

    return (
        <div className={cx('wrapper')}>
            {isBookmarked ? (
                <button className={cx('bookmark-btn', { active: isBookmarked })} onClick={handleMoveOutBookmark}>
                    <BsFillBookmarkDashFill />
                </button>
            ) : (
                <button className={cx('bookmark-btn')} onClick={handleAddToBookmark}>
                    <BsFillBookmarkPlusFill />
                </button>
            )}

            <Link to={`/${item.media_type || type}/${item.id}`} className={cx('inner')}>
                <Image className={cx('img')} path={item.poster_path} alt={item.original_title || item.name} />
                <span className={cx('play-icon')}>
                    <FaPlay />
                </span>
            </Link>

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
