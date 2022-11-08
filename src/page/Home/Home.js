// import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Popper } from '~/components/Popper';
import trendingService from '~/services/trendingService';
// import style from './Home.module.scss';

// const cx = classNames.bind(style);

function Home() {
    const [dayTrending, setDayTrending] = useState([]);
    const [weekTrending, setWeekTrending] = useState([]);

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

    console.log('home reRENDER');
    return (
        <>
            <Popper
                title="Trending"
                alphaOption="Today"
                alphaData={dayTrending}
                betaOption="This Week"
                betaDta={weekTrending}
                linkShow="./"
            />

            <Popper title="What's Popular" linkShow="./">
                <h1>Children 2</h1>
            </Popper>
        </>
    );
}

export default Home;
