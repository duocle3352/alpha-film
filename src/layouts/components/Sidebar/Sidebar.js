import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiBookBookmark, BiHelpCircle, BiMovie, BiTimeFive } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';
import { BsDisplay } from 'react-icons/bs';
import { HiMenu } from 'react-icons/hi';
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
import { useDispatch, useSelector } from 'react-redux';
import { hideSidebar } from '~/features/sidebarSlice';
import style from './Sidebar.module.scss';

const cx = classNames.bind(style);

function Sidebar() {
    const dispatch = useDispatch();
    const isShowSidebar = useSelector((state) => state.sidebar);

    const [isDiscovery, setIsDiscovery] = useState(false);
    const [isComingSoon, setIsComingSoon] = useState(false);

    const handleHideSidebar = () => {
        dispatch(hideSidebar());
    };

    const handleShowNavbarItem = (type) => {
        if (type === 'discovery') {
            setIsDiscovery(true);
            setIsComingSoon(false);
        }
        if (type === 'coming') {
            setIsDiscovery(false);
            setIsComingSoon(true);
        }
    };

    const handleHideNavbarItem = () => {
        setIsDiscovery(false);
        setIsComingSoon(false);
    };

    return (
        <aside className={cx('wrapper', { show: isShowSidebar })}>
            {/* Logo */}
            <div className={cx('logo-content')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt={'New-Film logo'} className={cx('logo-img')} />
                </Link>
            </div>

            {/* close sidebar button on tablet and mobile */}
            <button className={cx('menu-toggle')} onClick={handleHideSidebar}>
                <HiMenu />
            </button>

            {/* navbar */}
            <nav className={cx('navbar')}>
                <Navbar separate>
                    <NavbarItem
                        title="Home"
                        to={config.routes.home}
                        leftIcon={<AiOutlineHome />}
                        onHide={handleHideNavbarItem}
                    />

                    <div
                        className={cx('navbar-children', { show: isDiscovery })}
                        onClick={() => handleShowNavbarItem('discovery')}
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
                            <NavbarItem title={MV_THEATRES} to={`/discovery/${MV_THEATRES}`} leftIcon={<BiMovie />} />

                            <NavbarItem title={TV_AIRING} to={`/discovery/${TV_AIRING}`} leftIcon={<BsDisplay />} />

                            <NavbarItem
                                title={TV_ON_THE_AIR}
                                to={`/discovery/${TV_ON_THE_AIR}`}
                                leftIcon={<BsDisplay />}
                            />
                        </div>
                    </div>

                    <div
                        className={cx('navbar-children', { show: isComingSoon })}
                        onClick={() => handleShowNavbarItem('coming')}
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
                            <NavbarItem title={MV_COMING} to={`/coming/${MV_COMING}`} leftIcon={<BiMovie />} />

                            <NavbarItem title={TV_COMING} to={`/coming/${TV_COMING}`} leftIcon={<BsDisplay />} />
                        </div>
                    </div>
                </Navbar>

                <Navbar separate onHide={handleHideNavbarItem}>
                    <NavbarItem title="Recent" to={config.routes.recent} leftIcon={<BiTimeFive />} />
                    <NavbarItem title="Bookmarked" to={config.routes.bookmark} leftIcon={<BiBookBookmark />} />
                    <NavbarItem title="Downloaded" to={config.routes.download} leftIcon={<AiOutlineDownload />} />
                </Navbar>

                <Navbar onHide={handleHideNavbarItem}>
                    <NavbarItem title="Settings" to={config.routes.setting} leftIcon={<AiOutlineSetting />} />
                    <NavbarItem title="Help" to={config.routes.help} leftIcon={<BiHelpCircle />} />
                </Navbar>
            </nav>
            {/* make by */}
            <p className={cx('text')}>2022.By DuocLe</p>
        </aside>
    );
}

export default Sidebar;
