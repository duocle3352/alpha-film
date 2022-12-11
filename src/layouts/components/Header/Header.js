import classNames from 'classnames/bind';
import { useState } from 'react';
import { BsSun, BsMoonStars } from 'react-icons/bs';
import { BiHelpCircle, BiCommentError } from 'react-icons/bi';
import { AiOutlineUser, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';
import HeadlessTippy from '@tippyjs/react/headless';

import config from '~/config';
import images from '~/assets/image';
import { Navbar } from '~/components/Navbar';
import { NavbarItem } from '~/components/NavbarItem';
import style from './Header.module.scss';
import { Search } from '~/components/Search';

const cx = classNames.bind(style);

function Header() {
    const [darkTheme, setDarkTheme] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const handleToggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    return (
        <header className={cx('wrapper', 'row')}>
            <div className="col l-9">
                <Search />
            </div>
            <div className="col l-3">
                <div className={cx('tool-content')}>
                    {/* theme */}
                    <button className={cx('theme')} onClick={handleToggleTheme}>
                        {!darkTheme && <BsSun />}
                        {darkTheme && <BsMoonStars />}
                    </button>

                    {/* user menu */}
                    <HeadlessTippy
                        visible={showUserMenu}
                        interactive
                        placement="top-end"
                        onClickOutside={() => setShowUserMenu(false)}
                        render={(attrs) => (
                            <div className={cx('user-menu')} tabIndex="-1" {...attrs}>
                                <Navbar separate>
                                    <NavbarItem title="Hồ sơ" link={config.routes.home} leftIcon={<AiOutlineUser />} />
                                    <NavbarItem
                                        title="Cài đặt"
                                        link={config.routes.home}
                                        leftIcon={<AiOutlineSetting />}
                                    />
                                </Navbar>

                                <Navbar separate>
                                    <NavbarItem
                                        title="Trợ giúp"
                                        link={config.routes.home}
                                        leftIcon={<BiHelpCircle />}
                                    />
                                    <NavbarItem
                                        title="Gửi phản hồi"
                                        link={config.routes.home}
                                        leftIcon={<BiCommentError />}
                                    />
                                </Navbar>

                                <Navbar>
                                    <NavbarItem
                                        title="Đăng xuất"
                                        link={config.routes.home}
                                        leftIcon={<AiOutlineLogout />}
                                    />
                                </Navbar>
                            </div>
                        )}
                    >
                        <button className={cx('user')} onClick={() => setShowUserMenu(true)}>
                            <img src={images.avatar} alt="user name" className={cx('user-avatar')} />
                        </button>
                    </HeadlessTippy>
                </div>
            </div>
        </header>
    );
}

export default Header;
