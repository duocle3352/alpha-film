import classNames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AlphaTitle } from '~/components/AlphaTitle';
import { Card } from '~/components/Card';
import { Button } from '~/components/Button';
import { Selector } from '~/components/Selector';
import { trendingService, popularService } from '~/services';
import style from './Home.module.scss';
import { SlideControl } from '~/components/SlideControl';

const cx = classNames.bind(style);

function Home() {
    const [dayTrending, setDayTrending] = useState([]);
    const [weekTrending, setWeekTrending] = useState([]);
    const [moviePopular, setMoviePopular] = useState([]);
    const [tvPopular, setTvPopular] = useState([]);

    const [showMoviePopular, setShowMoviePopular] = useState(true);
    const [showDayTrend, setShowDayTrend] = useState(true);
    const [showTrendMore, setShowTrendMore] = useState(false);
    const [count, setCount] = useState(0);

    const popularCartRef = useRef();
    const popularCarWidth = popularCartRef.current?.offsetWidth;

    useEffect(() => {
        const fetchApi = async () => {
            const results = await trendingService('day');

            setDayTrending(results);
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const results = await trendingService('week');

            setWeekTrending(results);
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const results = await popularService('movie');

            setMoviePopular(results);
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const results = await popularService('tv');

            setTvPopular(results);
        };

        fetchApi();
    }, []);

    const handleShowTrend = useCallback((type) => {
        if (type === 'Day') {
            setShowDayTrend(true);
        } else {
            setShowDayTrend(false);
        }
    }, []);

    const handleShowPopular = useCallback((type) => {
        if (type === 'In Theaters') {
            setShowMoviePopular(true);
        } else {
            setShowMoviePopular(false);
        }
    }, []);

    console.log('home reRENDER');
    return (
        <>
            {/* popular */}
            <section className={cx('wrapper')}>
                <AlphaTitle title="What's Popular" link="./">
                    <Selector
                        optionI="In Theaters"
                        optionII="On TV"
                        selectOptionI={showMoviePopular}
                        onSelect={handleShowPopular}
                    />
                </AlphaTitle>

                {/* popular media cart */}
                <ul
                    className={cx('list-item', 'nowrap', 'row', 'sm-gutter')}
                    style={{ transform: `translateX(calc(-${popularCarWidth}px * ${count}))` }}
                >
                    {showMoviePopular &&
                        moviePopular.map((item) => (
                            <li key={item.id} className={cx('col', 'l-2')} ref={popularCartRef}>
                                <Card item={item} />
                            </li>
                        ))}
                    {!showMoviePopular &&
                        tvPopular.map((item) => (
                            <li key={item.id} className={cx('col', 'l-2')} ref={popularCartRef}>
                                <Card item={item} />
                            </li>
                        ))}
                </ul>

                {/* cart control  */}
                <SlideControl
                    count={count}
                    setCount={setCount}
                    length={moviePopular.length}
                    display={6}
                />
            </section>

            {/* trending */}
            <section className={cx('wrapper')}>
                <AlphaTitle title="trending">
                    <Selector
                        optionI="Day"
                        optionII="Week"
                        selectOptionI={showDayTrend}
                        onSelect={handleShowTrend}
                    />
                </AlphaTitle>

                {/* trending media cart */}
                <ul
                    className={cx({ more: showTrendMore }, 'list-item', 'less', 'row', 'sm-gutter')}
                >
                    {showDayTrend &&
                        dayTrending.map((item) => (
                            <li key={item.id} className={cx('col', 'l-2')}>
                                <Card item={item} />
                            </li>
                        ))}
                    {!showDayTrend &&
                        weekTrending.map((item) => (
                            <li key={item.id} className={cx('col', 'l-2')}>
                                <Card item={item} />
                            </li>
                        ))}
                </ul>

                {/* trending show more */}
                <div className={cx('show-more')}>
                    {!showTrendMore && (
                        <Button primary onClick={() => setShowTrendMore(true)}>
                            More than
                        </Button>
                    )}
                    {showTrendMore && (
                        <Button primary onClick={() => setShowTrendMore(false)}>
                            Less than
                        </Button>
                    )}
                </div>
            </section>
        </>
    );
}

export default Home;
