import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { memo } from 'react';
import { Button } from '~/components/Button';
import style from './Selector.module.scss';

const cx = classNames.bind(style);

function Selector({ optionI, optionII, selectOptionI, onSelect }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('btn__wrap', { active: selectOptionI })}>
                <div className={cx('btn-bg')} />
                <Button text onClick={() => onSelect(optionI)}>
                    {optionI}
                </Button>
            </div>
            <div className={cx('btn__wrap', { active: !selectOptionI })}>
                <div className={cx('btn-bg', 'right')} />
                <Button text onClick={() => onSelect(optionII)}>
                    {optionII}
                </Button>
            </div>
        </div>
    );
}

Selector.propTypes = {
    optionI: PropTypes.string.isRequired,
    optionII: PropTypes.string.isRequired,
    selectOptionI: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default memo(Selector);
