import classNames from 'classnames/bind';
import style from './ComingSoon.module.scss';

const cx = classNames.bind(style);

function ComingSoon() {
    return (
        <div className={cx('wrapper')}>
            <h3>ComingSoon page</h3>
        </div>
    );
}

export default ComingSoon;
