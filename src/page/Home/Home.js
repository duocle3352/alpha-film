import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { PopperWrapper } from '~/components/PopperWrapper';
import { AlphaTitle } from '~/components/AlphaTitle';
import { Card } from '~/components/Card';
import { Button } from '~/components/Button';
import trendingService from '~/services/trendingService';
import style from './Home.module.scss';

const cx = classNames.bind(style);

function Home() {
    const [dayTrending, setDayTrending] = useState([]);
    const [weekTrending, setWeekTrending] = useState([]);
    const [showDayTrend, setShowDayTrend] = useState(true);
    const [showTrendMore, setShowTrendMore] = useState(false);

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

    const handleShowTrend = (type) => {
        if (type === 'day') {
            setShowDayTrend(true);
        } else {
            setShowDayTrend(false);
        }
    };

    console.log('home reRENDER');
    return (
        <>
            <PopperWrapper>
                <AlphaTitle title="trending" />

                <div className={cx('selector__wrap')}>
                    <div className={cx('btn__wrap', { active: showDayTrend })}>
                        <div className={cx('btn-bg')} />
                        <Button text onClick={() => handleShowTrend('day')}>
                            Day
                        </Button>
                    </div>
                    <div className={cx('btn__wrap', { active: !showDayTrend })}>
                        <div className={cx('btn-bg', 'right')} />
                        <Button text onClick={() => handleShowTrend()}>
                            Week
                        </Button>
                    </div>
                </div>

                <div className={cx({ more: showTrendMore }, 'list-item', 'row', 'sm-gutter')}>
                    {showDayTrend &&
                        dayTrending.map((item) => (
                            <div key={item.id} className={cx('col', 'l-2')}>
                                <Card item={item} />
                            </div>
                        ))}
                    {!showDayTrend &&
                        weekTrending.map((item) => (
                            <div key={item.id} className={cx('col', 'l-2')}>
                                <Card item={item} />
                            </div>
                        ))}
                </div>

                {/* show more */}
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
            </PopperWrapper>
        </>
    );
}

export default Home;
