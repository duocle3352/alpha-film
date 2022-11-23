import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdDateRange } from 'react-icons/md';
import { AiOutlineStar } from 'react-icons/ai';
import { BsPlayCircle } from 'react-icons/bs';

import { MV_COMING, TV_COMING } from '~/constans';
import { moviesUpcomingService, tvOnTheAirService } from '~/services';
import { AlphaTitle } from '~/components/AlphaTitle';
import { ImageOriginal } from '~/components/ImageOriginal';
import { MediaImages } from '~/components/MediaImages';
import { Image } from '~/components/Image';
import { Genres } from '~/components/Genres';
import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Pagination } from '~/components/Pagination';
import style from './ComingSoon.module.scss';

const cx = classNames.bind(style);

function ComingSoon() {
    const params = useParams();
    const [slideImg, setSlideImg] = useState('');
    const [mvUpcoming, setMvUpcoming] = useState([]);
    const [tvUpcoming, setTvUpcoming] = useState([]);
    const [mvTotalPage, setMvTotalPage] = useState(0);
    const [tvTotalPage, setTvTotalPage] = useState(0);

    let comingSoonData;
    let pageTitle;
    let mediaType;
    let totalPage;
    let pageParam;
    if (params.type === MV_COMING) {
        comingSoonData = mvUpcoming;
        pageTitle = MV_COMING;
        mediaType = 'movie';
        totalPage = mvTotalPage;
        pageParam = `coming/${MV_COMING}`;
    } else if (params.type === TV_COMING) {
        comingSoonData = tvUpcoming;
        pageTitle = TV_COMING;
        mediaType = 'tv';
        totalPage = tvTotalPage;
        pageParam = `coming/${TV_COMING}`;
    }

    useEffect(() => {
        setSlideImg('');
    }, [params.type]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await moviesUpcomingService(params.page);

            setMvUpcoming(res.results);
            setMvTotalPage(res.total_pages);
        };

        fetchApi();
    }, [params.page]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await tvOnTheAirService(params.page);

            setTvUpcoming(res.results);
            setTvTotalPage(res.total_pages);
        };

        fetchApi();
    }, [params.page]);

    const handleGetPath = (path) => {
        setSlideImg(path);
    };

    return (
        <div className={cx('wrapper')}>
            {/* slide */}
            {comingSoonData.length > 0 && (
                <div className={cx('slide-box')}>
                    {/* backdrop */}
                    <ImageOriginal
                        className={cx('slide-img')}
                        path={slideImg || comingSoonData[0].backdrop_path}
                        alt={comingSoonData[0].title || comingSoonData[0].name}
                    />
                    <div className={cx('slide-info')}>
                        {/* poster */}
                        <Image
                            className={cx('slide-poster')}
                            path={comingSoonData[0]?.poster_path}
                            alt={comingSoonData[0].title || comingSoonData[0].name}
                        />
                        <div className={cx('slide-info__inner')}>
                            {/* title */}
                            <h1 className={cx('slide-title')}>
                                {comingSoonData[0].title || comingSoonData[0].name}
                            </h1>
                            {/* genres */}
                            <Genres ids={comingSoonData[0].genre_ids} type={mediaType} />
                            {/* date */}
                            <p className={cx('slide-date')}>
                                <span>
                                    <MdDateRange />
                                </span>
                                {comingSoonData[0].release_date || comingSoonData[0].first_air_date}
                            </p>
                            {/* rate */}
                            <p className={cx('slide-rate')}>
                                <span>
                                    <AiOutlineStar />
                                </span>
                                {`${comingSoonData[0].vote_average.toFixed(1)}/10`}
                            </p>
                            {/* description */}
                            <p className={cx('slide-dsc')}>{comingSoonData[0].overview}</p>
                            {/* button */}
                            <div className={cx('slide-btn')}>
                                <Button to={`/${mediaType}/${comingSoonData[0].id}`} primary large>
                                    Learn More
                                </Button>
                                <Button
                                    to={`/${mediaType}/${comingSoonData[0].id}`}
                                    outline
                                    large
                                    leftIcon={<BsPlayCircle />}
                                >
                                    Play Trailer
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* mini image */}
                    <div className={cx('slide-box__inner')}>
                        <MediaImages
                            className={cx('slide-img__sb')}
                            type={mediaType}
                            id={comingSoonData[0]?.id}
                            currentSlide={slideImg}
                            onGetPath={handleGetPath}
                        />
                    </div>
                </div>
            )}

            {/* title */}
            <AlphaTitle title={pageTitle} />

            {/* cart-item */}
            <ul className={cx('row', 'sm-gutter')}>
                {comingSoonData.map((item) => (
                    <li key={item.id} className={cx('cart-item', 'col', 'l-2-4', 'c-3')}>
                        <Card item={item} type={mediaType} />
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <Pagination
                totalPageCount={totalPage}
                currentPage={Number(params.page) || 1}
                siblingCount={2}
                page={pageParam}
            />
        </div>
    );
}

export default ComingSoon;
