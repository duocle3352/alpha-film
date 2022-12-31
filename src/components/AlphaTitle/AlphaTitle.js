import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import style from './AlphaTitle.module.scss';

const cx = classNames.bind(style);

function AlphaTitle({ title, link, children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2 className={cx('title')}>{title.replace(/-/g, ' ')}</h2>
                {children}
            </div>
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
    children: PropTypes.node,
};

export default AlphaTitle;
