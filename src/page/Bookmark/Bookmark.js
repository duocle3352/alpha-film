import classNames from 'classnames/bind';
import { AlphaTitle } from '~/components/AlphaTitle';
import { Card } from '~/components/Card';
import { LIST_BOOKMARK } from '~/constans';
import style from './Bookmark.module.scss';

const cx = classNames.bind(style);

function Bookmark() {
    const bookmarkList = JSON.parse(localStorage.getItem(LIST_BOOKMARK));

    return (
        <section>
            <AlphaTitle title="Bookmarked" />
            {bookmarkList ? (
                <ul className={cx('row', 'sm-gutter')}>
                    {bookmarkList.map((bookmark) => (
                        <li key={bookmark.item.id} className={cx('cart-item', 'col', 'l-2-4', 'm-3', 'c-6')}>
                            <Card item={bookmark.item} type={bookmark.type} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>We don't find any bookmarked media.</p>
            )}
        </section>
    );
}

export default Bookmark;
