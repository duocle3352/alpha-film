import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlphaTitle } from '~/components/AlphaTitle';
import { Card } from '~/components/Card';
import { Pagination } from '~/components/Pagination';
import { searchService } from '~/services';
import style from './Search.module.scss';

const cx = classNames.bind(style);

function Search() {
    const params = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [totalPageResult, setTotalPageResult] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await searchService(params.value, params.page);
            setSearchResults(res.results);
            setTotalPageResult(res.total_pages);
        };

        fetchApi();
    }, [params]);

    return (
        <section>
            <AlphaTitle title={`Search results: ${params.value}`} />

            <ul className={cx('row', 'sm-gutter')}>
                {searchResults.map((item) => (
                    <li key={item.id} className={cx('cart-item', 'col', 'l-2-4', 'm-3', 'c-6')}>
                        <Card item={item} type={item.type} />
                    </li>
                ))}
            </ul>

            <Pagination
                totalPageCount={totalPageResult}
                currentPage={Number(params.page) || 1}
                siblingCount={1}
                page={`search/${params.value}`}
            />
        </section>
    );
}

export default Search;
