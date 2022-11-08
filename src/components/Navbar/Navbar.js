import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Navbar.module.scss';

const cx = classNames.bind(style);

function Navbar({ children, separate }) {
    return <nav className={cx('wrapper', { separate })}>{children}</nav>;
}

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
    separate: PropTypes.bool,
};

export default Navbar;
