import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './Navbar.module.scss';

const cx = classNames.bind(style);

function Navbar({ children, separate, onHide }) {
    return (
        <nav className={cx('wrapper', { separate })} onClick={onHide}>
            {children}
        </nav>
    );
}

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
    separate: PropTypes.bool,
    onHide: PropTypes.func,
};

export default Navbar;
