import classNames from 'classnames/bind';
import { AlphaTitle } from '~/components/AlphaTitle';
import { Card } from '~/components/Card';
import { LIST_RECENT } from '~/constans';
import style from './Recent.module.scss';

const cx = classNames.bind(style);

function Recent() {
    const recentList = JSON.parse(localStorage.getItem(LIST_RECENT));

    return (
        <section className={cx('wrapper')}>
            <AlphaTitle title="Recent" />
            {recentList ? (
                <ul className={cx('row', 'sm-gutter')}>
                    {recentList.map((item) => (
                        <li key={item.id} className={cx('cart-item', 'col', 'l-2-4', 'c-3')}>
                            <Card item={item} type={item.type} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>We don't find any recent media.</p>
            )}
        </section>
    );
}

export default Recent;
