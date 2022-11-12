import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import style from './NavbarItem.module.scss';

const cx = classNames.bind(style);

function NavbarItem({ title, link, leftIcon }) {
    return (
        <NavLink to={link} end className={(nav) => cx('wrapper', { active: nav.isActive })}>
            {/* main */}
            <div className={cx('content')}>
                <span className={cx('left-icon')}>{leftIcon}</span>
                {title}
            </div>
            {/* submenu */}
            {/* {subMenus.length > 0 && (
                <div className={cx('submenu')}>
                    {subMenus.map((item) => (
                        <button key={item.id} className={cx('menu-btn')}>
                            {item.name}
                        </button>
                    ))}
                </div>
            )} */}
        </NavLink>
    );
}

NavbarItem.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    leftIcon: PropTypes.node.isRequired,
};

export default NavbarItem;
