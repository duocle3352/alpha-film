import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavLink, useParams } from 'react-router-dom';

import style from './NavbarItem.module.scss';

const cx = classNames.bind(style);

function NavbarItem({ title, link, leftIcon, onHide }) {
    const params = useParams();

    return (
        <NavLink
            to={link}
            end
            className={(nav) => cx('wrapper', { active: nav.isActive || params.type === title })}
            onClick={onHide}
        >
            {/* main */}
            <div className={cx('content')}>
                <span className={cx('left-icon')}>{leftIcon}</span>
                {title.replace(/-/g, ' ')}
            </div>
        </NavLink>
    );
}

NavbarItem.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    leftIcon: PropTypes.node,
    onHide: PropTypes.func,
};

export default NavbarItem;
