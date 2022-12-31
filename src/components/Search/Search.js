import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';

import { useDebounce } from '~/hook';
import { searchService } from '~/services';
import { Image } from '../Image';
import { Genres } from '../Genres';
import style from './Search.module.scss';

const cx = classNames.bind(style);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const debounceValue = useDebounce(searchValue, 800);

    useEffect(() => {
        if (!debounceValue.trim()) return;

        const fetchApi = async () => {
            const res = await searchService(debounceValue);
            setSearchResults(res.results.slice(0, 5));
        };

        fetchApi();
    }, [debounceValue]);

    const handleChangeValue = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <HeadlessTippy
            visible={searchResults.length > 0 && showResults}
            interactive
            placement="auto"
            onClickOutside={() => setShowResults(false)}
            render={(attrs) => (
                <div className={cx('result')} tabIndex="-1" {...attrs}>
                    <h3>{`Search results: "${searchValue}"`}</h3>
                    <div className={cx('result-list-item')}>
                        {searchResults.map((result) => (
                            <Link
                                key={result.id}
                                to={`/${result.media_type}/${result.id}`}
                                className={cx('result-item')}
                                onClick={() => setShowResults(false)}
                            >
                                <Image
                                    className={cx('result-image')}
                                    path={result.poster_path}
                                    alt={result.original_title || result.original_name}
                                />
                                <div className={cx('result-info')}>
                                    <h4>{result.original_title || result.original_name}</h4>
                                    <Genres ids={result.genre_ids} type={result.media_type} />
                                    <p>{result.media_type}</p>
                                    <p>{result.release_date || result.first_air_date}</p>
                                    <p className={cx('result-rate')}>
                                        {`${result.vote_average}/10`}
                                        <AiFillStar />
                                    </p>
                                </div>
                            </Link>
                        ))}

                        {searchResults.length === 5 && (
                            <div className={cx('result-more')}>
                                <Link to={`/search/${searchValue}`} onClick={() => setShowResults(false)}>
                                    See more
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        >
            <div className={cx('wrapper')}>
                <input
                    value={searchValue}
                    placeholder="Search your films..."
                    className={cx('input')}
                    onChange={(e) => handleChangeValue(e)}
                    onFocus={() => setShowResults(true)}
                />

                <div className={cx('search-icon')} onClick={() => setShowResults(false)}>
                    <BsSearch />
                </div>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
