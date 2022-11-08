import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import style from './PopperWrapper.module.scss';

const cx = classNames.bind(style);

function PopperWrapper({ children, classNames }) {
    return <section className={cx('wrapper', classNames)}>{children}</section>;
}

PopperWrapper.propTypes = {
    children: PropTypes.node.isRequired,
    classNames: PropTypes.string,
};

export default PopperWrapper;
