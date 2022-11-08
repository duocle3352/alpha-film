import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCollectionPlay, BsDisplay, BsChevronDown } from 'react-icons/bs';
import {
    AiOutlineHome,
    AiOutlineVideoCamera,
    AiOutlineFieldTime,
    AiOutlineLike,
} from 'react-icons/ai';

import config from '~/config';
import images from '~/assets/image';
import { genreService } from '~/services';
import { Navbar } from '~/components/Navbar';
import { NavbarItem } from '~/components/NavbarItem';
import style from './Sidebar.module.scss';

const cx = classNames.bind(style);

function Sidebar() {
    const [movieGenres, setMovieGenre] = useState([]);
    const [tvGenres, setTvGenre] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await genreService('movie');

            setMovieGenre(result);
        };

        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await genreService('tv');

            setTvGenre(result);
        };

        fetchApi();
    }, []);

    return (
        <aside className={cx('wrapper')}>
            {/* Logo */}
            <section className={cx('logo-content')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img
                        src={images.logo}
                        alt={'New-Film logo'}
                        className={cx('logo-img')}
                    />
                </Link>
            </section>

            {/* navbar */}
            <nav className={cx('navbar')}>
                <Navbar separate>
                    <NavbarItem
                        title="Home"
                        link={config.routes.home}
                        leftIcon={<AiOutlineHome />}
                    />

                    <NavbarItem
                        title="Movies"
                        link={config.routes.movie}
                        leftIcon={<AiOutlineVideoCamera />}
                        rightIcon={<BsChevronDown />}
                        subMenus={movieGenres}
                    />

                    <NavbarItem
                        title="TV Series"
                        link={config.routes.tv}
                        leftIcon={<BsDisplay />}
                        rightIcon={<BsChevronDown />}
                        subMenus={tvGenres}
                    />
                </Navbar>

                <Navbar>
                    <NavbarItem
                        title="Thư Viện"
                        link={config.routes.library}
                        leftIcon={<BsCollectionPlay />}
                    />
                    <NavbarItem
                        title="Đã Xem"
                        link={config.routes.seen}
                        leftIcon={<AiOutlineFieldTime />}
                    />
                    <NavbarItem
                        title="Đã Thích"
                        link={config.routes.like}
                        leftIcon={<AiOutlineLike />}
                    />
                </Navbar>
            </nav>
            {/* make by */}
            <p className={cx('text')}>2020.By DuocLe</p>
        </aside>
    );
}

export default Sidebar;
