import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import style from './AlphaTitle.module.scss';

const cx = classNames.bind(style);

function AlphaTitle({ title, link }) {
    return (
        <div className={cx('header')}>
            <h2 className={cx('title')}>{title}</h2>
            {link && (
                <Link to={link} className={cx('view-more')}>
                    View more
                    <BsChevronRight />
                </Link>
            )}
        </div>
    );
}

AlphaTitle.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
};

export default AlphaTitle;
