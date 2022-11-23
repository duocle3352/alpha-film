import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { genreService } from '~/services';
import style from './Genres.module.scss';

const cx = classNames.bind(style);

function Genres({ ids, type }) {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const genres = await genreService(type);

            setGenres(genres);
        };

        fetchApi();
    }, [type]);

    return (
        <ul className={cx('wrapper')}>
            {ids.map((id) => {
                const genre = genres.find((genre) => genre.id === id);

                return (
                    <li key={id} className={cx('item')}>
                        {genre?.name}
                    </li>
                );
            })}
        </ul>
    );
}

Genres.propTypes = {
    ids: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
};

export default Genres;
