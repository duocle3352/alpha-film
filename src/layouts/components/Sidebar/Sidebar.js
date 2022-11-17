import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { BiBookBookmark, BiHelpCircle, BiTimeFive } from 'react-icons/bi';
import {
    AiOutlineHome,
    AiOutlineFieldTime,
    AiOutlineCompass,
    AiOutlineStar,
    AiOutlineDownload,
    AiOutlineSetting,
} from 'react-icons/ai';

import config from '~/config';
import images from '~/assets/image';
import { Navbar } from '~/components/Navbar';
import { NavbarItem } from '~/components/NavbarItem';
import { MV_THEATRES } from '~/constans';
import style from './Sidebar.module.scss';

const cx = classNames.bind(style);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            {/* Logo */}
            <section className={cx('logo-content')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt={'New-Film logo'} className={cx('logo-img')} />
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
                        title="Discovery"
                        link={`/discovery/${MV_THEATRES}`}
                        leftIcon={<AiOutlineCompass />}
                    />

                    <NavbarItem
                        title="Coming soon"
                        link={config.routes.coming}
                        leftIcon={<AiOutlineFieldTime />}
                    />
                </Navbar>

                <Navbar separate>
                    <NavbarItem
                        title="Recent"
                        link={config.routes.home}
                        leftIcon={<BiTimeFive />}
                    />
                    <NavbarItem
                        title="Bookmarked"
                        link={config.routes.home}
                        leftIcon={<BiBookBookmark />}
                    />
                    <NavbarItem
                        title="Top rated"
                        link={config.routes.home}
                        leftIcon={<AiOutlineStar />}
                    />

                    <NavbarItem
                        title="Downloaded"
                        link={config.routes.home}
                        leftIcon={<AiOutlineDownload />}
                    />
                </Navbar>

                <Navbar>
                    <NavbarItem
                        title="Settings"
                        link={config.routes.home}
                        leftIcon={<AiOutlineSetting />}
                    />

                    <NavbarItem
                        title="Help"
                        link={config.routes.home}
                        leftIcon={<BiHelpCircle />}
                    />
                </Navbar>
            </nav>
            {/* make by */}
            <p className={cx('text')}>2020.By DuocLe</p>
        </aside>
    );
}

export default Sidebar;
