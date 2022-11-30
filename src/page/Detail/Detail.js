import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { FaHeart, FaPlay, FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { AlphaTitle } from '~/components/AlphaTitle';
import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Image } from '~/components/Image';
import { ImageOriginal } from '~/components/ImageOriginal';
import { SlideControl } from '~/components/SlideControl';
import appendService from '~/services/appendSevice';
import style from './Detail.module.scss';

const cx = classNames.bind(style);

function Detail() {
    const params = useParams();
    const id = params?.id;
    const type = params?.type;

    const recommendRef = useRef();
    const [recommendCarCount, setRecommendCarCount] = useState(0);
    const recommendCarWidth = recommendRef.current?.offsetWidth;

    const [isVideos, setIsVideos] = useState(true);
    const [isBackdrops, setIsBackdrops] = useState(false);
    const [isPosters, setIsPosters] = useState(false);
    const [isCurrentSeason, setIsCurrentSeason] = useState(true);
    const [isFullSeason, setIsFullSeason] = useState(false);
    const [data, setData] = useState({});

    const name = data.name || data.original_title;
    const tagline = data.tagline;
    const releaseDate = data.first_air_date || data.release_date;
    const poster = data.poster_path;
    const voteAverage = data.vote_average || 0;
    const currentSeason = data.number_of_seasons;
    const lisVideo = data.videos?.results || [];
    const listBackdrop = data.images?.backdrops || [];
    const listPoster = data.images?.posters || [];
    const listReview = data.reviews?.results || [];
    const keywords = data.keywords?.keywords || data.keywords?.results || [];

    useEffect(() => {
        const fetchApi = async () => {
            const results = await appendService(type, id);
            setData(results);
        };

        fetchApi();
    }, [type, id]);

    const handleSetMediaType = (type) => {
        if (type === 'videos') {
            setIsVideos(true);
            setIsBackdrops(false);
            setIsPosters(false);
        } else if (type === 'backdrops') {
            setIsVideos(false);
            setIsBackdrops(true);
            setIsPosters(false);
        } else {
            setIsVideos(false);
            setIsBackdrops(false);
            setIsPosters(true);
        }
    };

    const handleSetSeasonType = (type) => {
        if (type === 'current') {
            setIsCurrentSeason(true);
            setIsFullSeason(false);
        } else {
            setIsCurrentSeason(false);
            setIsFullSeason(true);
        }
    };

    return (
        <section className="row">
            {/* header */}
            <section className={cx('original_header')}>
                <ImageOriginal className={cx('backdrop')} path={data.backdrop_path} alt={name} />
                <div className={cx('poster-box', 'col', 'l-3', 'c-3')}>
                    <Image className={cx('poster')} path={poster} alt={name} />
                </div>
                <div className={cx('info', 'col', 'l-9', 'c-9')}>
                    <h1>{name}</h1>
                    <div className={cx('subtitle')}>
                        <span className={cx('type')}>{type}</span>
                        <span className={cx('release-date')}>{releaseDate}</span>
                        <span className={cx('rate')}>
                            {`${voteAverage.toFixed(1)}/10`}
                            <FaStar />
                        </span>
                        {data.genres &&
                            data.genres.map((genre) => (
                                <span className={cx('genre')} key={genre.id}>
                                    {genre.name}
                                </span>
                            ))}
                    </div>
                    <div className={cx('action')}>
                        <Button primary small leftIcon={<FaPlay />}>
                            Play Now
                        </Button>
                        <Button outline small leftIcon={<FaPlay />}>
                            Play Trailer
                        </Button>
                        <Button outline small leftIcon={<FaHeart />}>
                            Add To Bookmark
                        </Button>
                    </div>
                    <p className={cx('description')}>{data.overview}</p>
                    <ul className={cx('creator')}>
                        {data.created_by &&
                            data.created_by.map((creator) => (
                                <li key={creator.id}>
                                    <h4>{creator.name}</h4>
                                    <span>Creator</span>
                                </li>
                            ))}
                    </ul>
                </div>
                {tagline && <p className={cx('tagLine')}>{`"${tagline}"`}</p>}
            </section>

            {/* media */}
            <section className={cx('content')}>
                <AlphaTitle title="Media">
                    <Button primary={isVideos} text={!isVideos} onClick={() => handleSetMediaType('videos')}>
                        Videos
                        <span className={cx('media-quantity')}>{lisVideo.length}</span>
                    </Button>
                    <Button primary={isBackdrops} text={!isBackdrops} onClick={() => handleSetMediaType('backdrops')}>
                        BackDrops
                        <span className={cx('media-quantity')}>{listBackdrop.length}</span>
                    </Button>
                    <Button primary={isPosters} text={!isPosters} onClick={() => handleSetMediaType('posters')}>
                        Posters
                        <span className={cx('media-quantity')}>{listPoster.length}</span>
                    </Button>
                </AlphaTitle>

                <ul className={cx('media-list-cart', 'row', 'sm-gutter')}>
                    {isVideos &&
                        lisVideo.map((video) => (
                            <li key={video.id} className="col l-6">
                                <iframe
                                    width="100%"
                                    height="330px"
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title={video.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                ></iframe>
                            </li>
                        ))}

                    {isBackdrops &&
                        listBackdrop.map((backdrop, index) => (
                            <li key={index} className="col l-6">
                                <div className={cx('media-cart')}>
                                    <ImageOriginal
                                        path={backdrop.file_path}
                                        alt="backdrop"
                                        className={cx('media-image')}
                                    />
                                </div>
                            </li>
                        ))}

                    {isPosters &&
                        listPoster.map((backdrop, index) => (
                            <li key={index} className="col l-2">
                                <div className={cx('media-cart')}>
                                    <Image path={backdrop.file_path} alt="backdrop" className={cx('media-image')} />
                                </div>
                            </li>
                        ))}
                </ul>
            </section>

            {/* cast */}
            <section className={cx('content')}>
                <AlphaTitle title="Main cast" />
                <ul className={cx('media-list-cart', 'row', 'sm-gutter')}>
                    {data?.credits?.cast &&
                        data.credits.cast.map((cast) => (
                            <li key={cast.id} className="col l-2">
                                <div className={cx('media-cart')}>
                                    <Image path={cast.profile_path} alt={cast.name} className={cx('cart-image')} />
                                    <div className={cx('cart-info')}>
                                        <h4 className={cx('cart-title')}>{cast.name}</h4>
                                        <p className={cx('cart-subtitle')}>{cast.character}</p>
                                        <p className={cx('cart-subtitle')}>{cast.known_for_department}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </section>

            {/* Season */}
            {currentSeason && data?.seasons && (
                <section className={cx('content')}>
                    <AlphaTitle title="Season">
                        <Button
                            primary={isCurrentSeason}
                            text={!isCurrentSeason}
                            onClick={() => handleSetSeasonType('current')}
                        >
                            Current Season
                        </Button>
                        <Button primary={isFullSeason} text={!isFullSeason} onClick={() => handleSetSeasonType('full')}>
                            Full Season
                        </Button>
                    </AlphaTitle>

                    {isCurrentSeason && (
                        <div className={cx('current-season')}>
                            <Image path={poster} alt={name} className={cx('current-season-img')} />
                            <div className={cx('current-season-info')}>
                                <h3>{`Season ${currentSeason}`}</h3>
                                <h4>{`${releaseDate.slice(0, 4)} | ${data.number_of_episodes} Episodes`}</h4>

                                <p>{`Season ${currentSeason} of ${
                                    data.name || data.original_title
                                } premiered on ${releaseDate}.`}</p>
                            </div>
                        </div>
                    )}

                    {isFullSeason && (
                        <ul className={cx('media-list-cart', 'row', 'sm-gutter')}>
                            {data.seasons.map((season) => (
                                <li key={season.id} className="col l-2">
                                    <div className={cx('media-cart')}>
                                        <Image
                                            path={season.poster_path}
                                            alt={season.name}
                                            className={cx('cart-image')}
                                        />
                                        <div className={cx('cart-info')}>
                                            <h3 className={cx('cart-title')}>{season.name}</h3>
                                            <p className={cx('cart-subtitle')}>{`${season.episode_count} Episodes`}</p>
                                            <p className={cx('cart-subtitle')}>{season.air_date}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}

            {/* Reviews */}
            <section className={cx('content')}>
                <AlphaTitle title="Reviews" />
                <ul className={cx('list-review')}>
                    {listReview.map((review) => (
                        <li key={review.id} className={cx('review-item')}>
                            <ImageOriginal path={review.author_details.avatar_path} className={cx('author-avatar')} />

                            <div className={cx('review-info')}>
                                <h4 className={cx('review-title')}>
                                    {`A review by ${review.author}`}
                                    <span className={cx('review-rate')}>
                                        {review.author_details.rating && review.author_details.rating.toFixed(1)}
                                        <FaStar />
                                    </span>
                                </h4>
                                <p className={cx('review-subtitle')}>
                                    {`Written by ${review.author} on ${review.created_at.slice(0, 10)}`}
                                </p>
                                <p>{review.content}</p>
                            </div>
                        </li>
                    ))}

                    {listReview.length < 1 && <li>{`We don't have any reviews for ${name}`}</li>}
                </ul>
            </section>

            {/* Facts */}
            <section className={cx('content')}>
                <AlphaTitle title="Facts" />
                <ul className={cx('facts-list-item')}>
                    <li className={cx('facts-item', 'facts-item__inline')}>
                        <div className={cx('facts-item__inner')}>
                            <h4>Status</h4>
                            <p className={cx('facts-dsc')}>{data.status}</p>
                        </div>
                        {data.type && (
                            <div className={cx('facts-item__inner')}>
                                <h4>Type</h4>
                                <p className={cx('facts-dsc')}>{data.type}</p>
                            </div>
                        )}
                        <div className={cx('facts-item__inner')}>
                            <h4>Original Language</h4>
                            <p className={cx('facts-dsc')}>{data.original_language}</p>
                        </div>
                        {data.budget && (
                            <div className={cx('facts-item__inner')}>
                                <h4>Budget</h4>
                                <p className={cx('facts-dsc')}>
                                    {data.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </p>
                            </div>
                        )}
                        {data?.revenue && (
                            <div className={cx('facts-item__inner')}>
                                <h4>Revenue</h4>
                                <p className={cx('facts-dsc')}>
                                    {data.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </p>
                            </div>
                        )}
                    </li>
                    {data.networks && (
                        <li className={cx('facts-item')}>
                            <h4>Network</h4>
                            <ul className={cx('facts-list-logo')}>
                                {data.networks.map((network) => (
                                    <li key={network.id} className={cx('facts-logo-item')}>
                                        <ImageOriginal
                                            path={network.logo_path}
                                            alt={network.name}
                                            className={cx('facts-logo')}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                    <li className={cx('facts-item')}>
                        <h4>Keywords</h4>
                        <ul className={cx('facts-list-key')}>
                            {keywords.length > 0 ? (
                                keywords.map((key) => (
                                    <li key={key.id} className={cx('facts-key-item')}>
                                        {key.name}
                                    </li>
                                ))
                            ) : (
                                <li>No keywords have been added.</li>
                            )}
                        </ul>
                    </li>
                </ul>
            </section>

            {/* Recommendations */}
            <section className={cx('content', 'content-have-control')}>
                <AlphaTitle title="Recommendations" />
                {data?.recommendations?.results.length > 0 ? (
                    <>
                        <ul
                            className={cx('recommend-list-item', 'nowrap', 'row', 'sm-gutter')}
                            style={{
                                transform: `translateX(calc(-${recommendCarWidth}px * ${recommendCarCount}))`,
                            }}
                        >
                            {data.recommendations.results.map((item) => (
                                <li
                                    key={item.id}
                                    className={cx('recommend-cart-item', 'col', 'l-2', 'c-3')}
                                    ref={recommendRef}
                                >
                                    <Card item={item} type={item.media_type} />
                                </li>
                            ))}
                        </ul>
                        {data.recommendations.results.length > 7 && (
                            <SlideControl
                                count={recommendCarCount}
                                setCount={setRecommendCarCount}
                                length={data?.recommendations?.results.length}
                                display={6}
                                step={1}
                                delay={3000}
                            />
                        )}
                    </>
                ) : (
                    <p>No recommendations have been added.</p>
                )}
            </section>
        </section>
    );
}

export default Detail;
