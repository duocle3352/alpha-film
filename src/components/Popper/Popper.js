import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';

import { Button } from '~/components/Button';
import { Image } from '../Image';
import style from './Popper.module.scss';

const cx = classNames.bind(style);

function Popper({ children, title, alphaOption, alphaData, betaOption, betaDta, showLink }) {
    const [showAlphaOption, setShowAlphaOption] = useState(true);

    const handleShow = (type) => {
        if (type === 'tv') {
            setShowAlphaOption(true);
        } else {
            setShowAlphaOption(false);
        }
    };

    const renderItem = (data) => {
        return data.map((item) => (
            <div key={item.id} className={cx('item', 'col', 'l-2')}>
                <Link to={`/tv/${item.id}`} className={cx('item-inner')}>
                    <Image
                        className={cx('item-img')}
                        path={item.poster_path}
                        alt={item.original_title || item.name}
                        size="200"
                    />
                </Link>
                <div className={cx('item-info')}>
                    <Link to={`/tv/${item.id}`} className={cx('item-name')}>
                        {item.original_title || item.name}
                    </Link>
                    <p className={cx('item-time')}>{item.release_date || item.first_air_date}</p>
                </div>
            </div>
        ));
    };

    return (
        <section className={cx('wrapper', 'row', 'sm-gutter')}>
            <div className={cx('header', 'col', 'l-12')}>
                <div className={cx('header__inner')}>
                    <h2 className={cx('title')}>{title}</h2>
                    {/*  */}
                    {alphaOption && alphaData && betaOption && betaDta && (
                        <div className={cx('selector__wrap')}>
                            <div className={cx('btn__wrap', { active: showAlphaOption })}>
                                <div className={cx('btn-bg')} />
                                <Button text onClick={() => handleShow('tv')}>
                                    {alphaOption}
                                </Button>
                            </div>
                            <div className={cx('btn__wrap', { active: !showAlphaOption })}>
                                <div className={cx('btn-bg', 'right')} />
                                <Button text onClick={() => handleShow('theaters')}>
                                    {betaOption}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* show more */}
                {showLink && (
                    <Link to={showLink} className={cx('view-more')}>
                        View more
                        <BsChevronRight />
                    </Link>
                )}
            </div>

            {/* select result place */}
            {/* alpha option */}
            {showAlphaOption && alphaOption && alphaData && renderItem(alphaData)}
            {/* beta option */}
            {!showAlphaOption && betaOption && betaDta && renderItem(betaDta)}

            {/* children */}
            {children}
        </section>
    );
}

Popper.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired,
    alphaOption: PropTypes.string,
    betaOption: PropTypes.string,
    alphaData: PropTypes.array,
    betaDta: PropTypes.array,
    showLink: PropTypes.string,
};

export default Popper;
