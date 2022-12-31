import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card } from '~/components/Card';
import { Pagination } from '~/components/Pagination';
import { moviesInTheatresService, tvAiringTodayService, tvOnTheAirService } from '~/services';
import { MV_THEATRES, TV_ON_THE_AIR, TV_AIRING } from '~/constans';
import style from './Discovery.module.scss';
import { AlphaTitle } from '~/components/AlphaTitle';

const cx = classNames.bind(style);

function Discovery() {
    const params = useParams();
    const [movieNowPlayingTotalPage, setMovieNowPlayingTotalPage] = useState(0);
    const [tvAiringTodayTotalPage, setTvAiringTodayTotalPage] = useState(0);
    const [tvOnTheAirTotalPage, setTvOnTheAirTotalPage] = useState(0);

    const [movieNowPlaying, setMovieNowPlaying] = useState([]);
    const [tvAiringToday, setTvAiringToday] = useState([]);
    const [tvOnTheAir, setTvOnTheAir] = useState([]);

    let totalPage;
    let pageParam;
    if (params.type === MV_THEATRES) {
        totalPage = movieNowPlayingTotalPage;
        pageParam = `discovery/${MV_THEATRES}`;
    } else if (params.type === TV_AIRING) {
        totalPage = tvAiringTodayTotalPage;
        pageParam = `discovery/${TV_AIRING}`;
    } else if (params.type === TV_ON_THE_AIR) {
        totalPage = tvOnTheAirTotalPage;
        pageParam = `discovery/${TV_ON_THE_AIR}`;
    }

    useEffect(() => {
        const fetchApi = async () => {
            const res = await moviesInTheatresService(params.page);

            setMovieNowPlaying(res.results);
            setMovieNowPlayingTotalPage(res.total_pages);
        };

        fetchApi();
    }, [params.page]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await tvAiringTodayService(params.page);

            setTvAiringToday(res.results);
            setTvAiringTodayTotalPage(res.total_pages);
        };

        fetchApi();
    }, [params.page]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await tvOnTheAirService(params.page);

            setTvOnTheAir(res.results);
            setTvOnTheAirTotalPage(res.total_pages);
        };

        fetchApi();
    }, [params.page]);

    return (
        <section>
            {params.type === MV_THEATRES && (
                <>
                    <AlphaTitle title={MV_THEATRES} />
                    <ul className={cx('row', 'sm-gutter')}>
                        {movieNowPlaying.map((item) => (
                            <li key={item.id} className={cx('cart-item', 'col', 'l-2-4', 'm-3', 'c-6')}>
                                <Card item={item} type="movie" />
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {params.type === TV_AIRING && (
                <>
                    <AlphaTitle title={TV_AIRING} />
                    <ul className={cx('row', 'sm-gutter')}>
                        {tvAiringToday.map((item) => (
                            <li key={item.id} className={cx('cart-item', 'col', 'l-2-4', 'm-3', 'c-6')}>
                                <Card item={item} type="tv" />
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {params.type === TV_ON_THE_AIR && (
                <>
                    <AlphaTitle title={TV_ON_THE_AIR} />
                    <ul className={cx('row', 'sm-gutter')}>
                        {tvOnTheAir.map((item) => (
                            <li key={item.id} className={cx('cart-item', 'col', 'l-2-4', 'm-3', 'c-6')}>
                                <Card item={item} type="tv" />
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <Pagination
                totalPageCount={totalPage}
                currentPage={Number(params.page) || 1}
                siblingCount={1}
                page={pageParam}
            />
        </section>
    );
}

export default Discovery;
