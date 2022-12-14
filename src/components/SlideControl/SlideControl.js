import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import style from './SlideControl.module.scss';
import { memo, useEffect } from 'react';

const cx = classNames.bind(style);

function SlideControl({ count, setCount, length, display, step, delay, auto }) {
    useEffect(() => {
        if (auto) {
            const timeout = setTimeout(() => {
                handelIncrease();
            }, delay);

            return () => clearTimeout(timeout);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const handelIncrease = () => {
        if (count === length - display) {
            setCount(0);
        } else {
            setCount(count + step);
        }
    };

    const handelControl = (type) => {
        if (type === 'left') {
            if (count === 0) {
                setCount(length - display);
            } else {
                setCount(count - step);
            }
        } else {
            handelIncrease();
        }
    };
    return (
        <>
            <button className={cx('control')} onClick={() => handelControl('left')}>
                <BsChevronLeft />
            </button>
            <button className={cx('control', 'right')} onClick={handelControl}>
                <BsChevronRight />
            </button>
        </>
    );
}

SlideControl.propTypes = {
    count: PropTypes.number.isRequired,
    setCount: PropTypes.func.isRequired,
    length: PropTypes.number.isRequired,
    display: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    delay: PropTypes.number.isRequired,
    auto: PropTypes.bool,
};

export default memo(SlideControl);
