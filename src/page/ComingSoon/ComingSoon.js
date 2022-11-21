import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { moviesUpcomingService } from '~/services';
import { SlideComp } from '~/components/SlideComp';
import style from './ComingSoon.module.scss';

const cx = classNames.bind(style);

function ComingSoon() {
    const [mvUpcoming, setMvUpcoming] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await moviesUpcomingService();

            setMvUpcoming(res.results);
        };

        fetchApi();
    }, []);

    // console.log(mvUpcoming);

    return (
        <div className={cx('wrapper')}>
            <div className="row">
                <div className={cx('slide-box', 'col', 'l-8')}>
                    <SlideComp listItem={mvUpcoming} />
                </div>
                <div className="col l-4"></div>
            </div>
        </div>
    );
}

export default ComingSoon;
