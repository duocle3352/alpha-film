import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useRef } from 'react';
import { BsPlayCircle } from 'react-icons/bs';

import { Button } from '~/components/Button';
import { ImageOriginal } from '~/components/ImageOriginal';
import { Genres } from '~/components/Genres';
import style from './SlideComp.module.scss';

const cx = classNames.bind(style);

function SlideComp({ listItem, count }) {
    const sliderRef = useRef();
    const sliderWidth = sliderRef.current?.offsetWidth;
    return (
        <ul
            className={cx('list', 'nowrap', 'row', 'sm-gutter')}
            style={{ transform: `translateX(calc(-${sliderWidth}px * ${count}))` }}
        >
            {listItem.map((item) => (
                <li key={item.id} className={cx('item', 'col', 'l-12', 'c-12')} ref={sliderRef}>
                    <ImageOriginal
                        className={cx('img')}
                        path={item.backdrop_path}
                        alt={item.original_title || item.original_name}
                    />

                    <div className={cx('info')}>
                        <h1 className={cx('title')}>{item.original_title || item.original_name}</h1>
                        <Genres ids={item.genre_ids} type={item.media_type} />
                        <div className={cx('info__inner')}>
                            <h4 className={cx('subtitle')}>{item.media_type}</h4>
                            <h4 className={cx('subtitle')}>{`${item.vote_average.toFixed(
                                1,
                            )}/10`}</h4>
                        </div>
                        <p className={cx('desc')}>{item.overview}</p>
                        <div className={cx('btn')}>
                            <Button to={`${item.media_type}/${item.id}`} primary large>
                                Learn More
                            </Button>
                            <Button
                                to={`${item.media_type}/${item.id}`}
                                outline
                                large
                                leftIcon={<BsPlayCircle />}
                            >
                                Play Trailer
                            </Button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

SlideComp.propTypes = {
    listItem: PropTypes.array.isRequired,
    count: PropTypes.number,
};

export default SlideComp;
