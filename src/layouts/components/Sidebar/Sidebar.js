import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { BiBookBookmark, BiHelpCircle, BiMovie, BiTimeFive } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';
import { BsDisplay } from 'react-icons/bs';
import {
    AiOutlineHome,
    AiOutlineFieldTime,
    AiOutlineCompass,
    AiOutlineDownload,
    AiOutlineSetting,
} from 'react-icons/ai';

import config from '~/config';
import images from '~/assets/image';
import { Navbar } from '~/components/Navbar';
import { NavbarItem } from '~/components/NavbarItem';
import { MV_THEATRES, TV_AIRING, TV_ON_THE_AIR, MV_COMING, TV_COMING } from '~/constans';
import style from './Sidebar.module.scss';
import { useState } from 'react';

const cx = classNames.bind(style);

function Sidebar() {
    const [isDiscovery, setIsDiscovery] = useState(false);
    const [isComingSoon, setIsComingSoon] = useState(false);

    const handleShow = (type) => {
        if (type === 'discovery') {
            setIsDiscovery(true);
            setIsComingSoon(false);
        }
        if (type === 'coming') {
            setIsDiscovery(false);
            setIsComingSoon(true);
        }
    };
    const handleHide = () => {
        setIsDiscovery(false);
        setIsComingSoon(false);
    };

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
                        onHide={handleHide}
                    />

                    <div
                        className={cx('navbar-children', { show: isDiscovery })}
                        onClick={() => handleShow('discovery')}
                    >
                        <span className={cx('navbar-icon', 'icon-right')}>
                            <FiChevronDown />
                        </span>
                        <h3 className={cx('navbar-title')}>
                            <span className={cx('navbar-icon', 'icon-left')}>
                                <AiOutlineCompass />
                            </span>
                            Discovery
                        </h3>
                        <div className={cx('navbar-item')}>
                            <NavbarItem
                                title={MV_THEATRES}
                                link={`/discovery/${MV_THEATRES}`}
                                leftIcon={<BiMovie />}
                            />

                            <NavbarItem
                                title={TV_AIRING}
                                link={`/discovery/${TV_AIRING}`}
                                leftIcon={<BsDisplay />}
                            />

                            <NavbarItem
                                title={TV_ON_THE_AIR}
                                link={`/discovery/${TV_ON_THE_AIR}`}
                                leftIcon={<BsDisplay />}
                            />
                        </div>
                    </div>

                    <div
                        className={cx('navbar-children', { show: isComingSoon })}
                        onClick={() => handleShow('coming')}
                    >
                        <span className={cx('navbar-icon', 'icon-right')}>
                            <FiChevronDown />
                        </span>
                        <h3 className={cx('navbar-title')}>
                            <span className={cx('navbar-icon', 'icon-left')}>
                                <AiOutlineFieldTime />
                            </span>
                            Coming soon
                        </h3>
                        <div className={cx('navbar-item')}>
                            <NavbarItem
                                title={MV_COMING}
                                link={`/coming/${MV_COMING}`}
                                leftIcon={<BiMovie />}
                            />

                            <NavbarItem
                                title={TV_COMING}
                                link={`/coming/${TV_COMING}`}
                                leftIcon={<BsDisplay />}
                            />
                        </div>
                    </div>
                </Navbar>

                <Navbar separate onHide={handleHide}>
                    <NavbarItem
                        title="Recent"
                        link={config.routes.recent}
                        leftIcon={<BiTimeFive />}
                    />
                    <NavbarItem
                        title="Bookmarked"
                        link={config.routes.bookmark}
                        leftIcon={<BiBookBookmark />}
                    />
                    <NavbarItem
                        title="Downloaded"
                        link={config.routes.home}
                        leftIcon={<AiOutlineDownload />}
                    />
                </Navbar>

                <Navbar onHide={handleHide}>
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
