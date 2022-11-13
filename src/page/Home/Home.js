import classNames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';

import { AlphaTitle } from '~/components/AlphaTitle';
import { Card } from '~/components/Card';
import { Button } from '~/components/Button';
import { Selector } from '~/components/Selector';
import { SlideControl } from '~/components/SlideControl';
import { ImageOriginal } from '~/components/ImageOriginal';
import { MediaImages } from '~/components/MediaImages';
import { trendingService, popularService, topRateService } from '~/services';
import images from '~/assets/image';
import style from './Home.module.scss';

const cx = classNames.bind(style);

function Home() {
    const [dayTrending, setDayTrending] = useState([]);
    const [weekTrending, setWeekTrending] = useState([]);
    const [moviePopular, setMoviePopular] = useState([]);
    const [tvPopular, setTvPopular] = useState([]);
    const [movieTopRate, setMovieTopRate] = useState([]);
    const [tvTopRate, setTvTopRate] = useState([]);
    //
    const [showMovie, setShowMovie] = useState(true);
    const [showDayTrend, setShowDayTrend] = useState(true);
    const [showTrendMore, setShowTrendMore] = useState(false);
    //
    const [popularCarCount, setPopularCarCount] = useState(0);
    const [sliderCount, setSliderCount] = useState(0);
    //
    const sliderItems = [...weekTrending.slice(0, 6)];

    const popularCartRef = useRef();
    const sliderRef = useRef();
    const popularCarWidth = popularCartRef.current?.offsetWidth;
    const sliderWidth = sliderRef.current?.offsetWidth;

    // call trending api
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

    // call popular api
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

    // call top rate api
    useEffect(() => {
        const fetchApi = async () => {
            const results = await topRateService('movie');

            setMovieTopRate(results.slice(0, 10));
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const results = await topRateService('tv');

            setTvTopRate(results.slice(0, 10));
        };

        fetchApi();
    }, []);

    //
    //
    const handleShowTrend = useCallback((type) => {
        if (type === 'Day') {
            setShowDayTrend(true);
        } else {
            setShowDayTrend(false);
        }
    }, []);

    const handleShowPopular = useCallback((type) => {
        if (type === 'In Theaters') {
            setShowMovie(true);
        } else {
            setShowMovie(false);
        }
    }, []);

    console.log('home reRENDER');

    //
    //
    return (
        <>
            {/* slider */}
            <section className={cx('wrapper')}>
                {/* popular media cart */}
                <ul
                    className={cx('slider-list', 'nowrap', 'row', 'sm-gutter')}
                    style={{ transform: `translateX(calc(-${sliderWidth}px * ${sliderCount}))` }}
                >
                    {sliderItems.map((item) => (
                        <li
                            key={item.id}
                            className={cx('slider-item', 'col', 'l-12')}
                            ref={sliderRef}
                        >
                            <ImageOriginal
                                className={cx('slider-img')}
                                path={item.backdrop_path}
                                alt={item.original_title || item.original_name}
                            />

                            <div className={cx('display')}>
                                <MediaImages
                                    className={cx('display-img')}
                                    type={item.media_type}
                                    id={item.id}
                                />
                            </div>

                            <div className={cx('slider-title')}>
                                <h1 className={cx('slider-name')}>
                                    {item.original_title || item.original_name}
                                </h1>
                                <Button to={`${item.media_type}/${item.id}`} primary large>
                                    Watch Now
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* cart control  */}
                <SlideControl
                    count={sliderCount}
                    setCount={setSliderCount}
                    length={sliderItems.length}
                    display={1}
                    step={1}
                    delay={5000}
                    auto
                />
            </section>

            {/* popular */}
            <section
                className={cx('wrapper')}
                style={{ backgroundImage: `url(${images.popularBg})` }}
            >
                <AlphaTitle title="What's Popular" link="./">
                    <Selector
                        optionI="In Theaters"
                        optionII="On TV"
                        selectOptionI={showMovie}
                        onSelect={handleShowPopular}
                    />
                </AlphaTitle>

                {/* popular media cart */}

                <ul
                    className={cx('list-item', 'nowrap', 'row', 'sm-gutter')}
                    style={{
                        transform: `translateX(calc(-${popularCarWidth}px * ${popularCarCount}))`,
                    }}
                >
                    {showMovie &&
                        moviePopular.map((item) => (
                            <li
                                key={item.id}
                                className={cx('cart-item', 'col', 'l-2')}
                                ref={popularCartRef}
                            >
                                <Card item={item} type="movie" />
                            </li>
                        ))}
                    {!showMovie &&
                        tvPopular.map((item) => (
                            <li
                                key={item.id}
                                className={cx('cart-item', 'col', 'l-2')}
                                ref={popularCartRef}
                            >
                                <Card item={item} type="tv" />
                            </li>
                        ))}
                </ul>
                {/* cart control  */}
                <SlideControl
                    count={popularCarCount}
                    setCount={setPopularCarCount}
                    length={moviePopular.length}
                    display={6}
                    step={2}
                    delay={3000}
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
                            <li key={item.id} className={cx('cart-item', 'col', 'l-2-4')}>
                                <Card item={item} />
                            </li>
                        ))}
                    {!showDayTrend &&
                        weekTrending.map((item) => (
                            <li key={item.id} className={cx('cart-item', 'col', 'l-2-4')}>
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

            {/* top rate */}
            <section className={cx('wrapper')}>
                <AlphaTitle title="top rate" link="./">
                    <Selector
                        optionI="In Theaters"
                        optionII="On TV"
                        selectOptionI={showMovie}
                        onSelect={handleShowPopular}
                    />
                </AlphaTitle>

                {/* top rate media cart */}
                <ul className={cx('list-item', 'row', 'sm-gutter')}>
                    {showMovie &&
                        movieTopRate.map((item) => (
                            <li key={item.id} className={cx('cart-item', 'col', 'l-2-4')}>
                                <Card item={item} type="movie" />
                            </li>
                        ))}
                    {!showMovie &&
                        tvTopRate.map((item) => (
                            <li key={item.id} className={cx('cart-item', 'col', 'l-2-4')}>
                                <Card item={item} type="tv" />
                            </li>
                        ))}
                </ul>
            </section>
        </>
    );
}

export default Home;
