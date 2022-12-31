/* eslint-disable no-unused-vars */
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSun, BsMoonStars } from 'react-icons/bs';
import HeadlessTippy from '@tippyjs/react/headless';
import { BiHelpCircle, BiCommentError } from 'react-icons/bi';
import { AiOutlineUser, AiOutlineSetting, AiOutlineLogout, AiOutlineClose } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { useDispatch } from 'react-redux';

import config from '~/config';
import images from '~/assets/image';
import { useOutsideCloser } from '~/hook';
import { Navbar } from '~/components/Navbar';
import { NavbarItem } from '~/components/NavbarItem';
import { Search } from '~/components/Search';
import { Button } from '~/components/Button';
import { showSidebar } from '~/features/sidebarSlice';
import RegisterFrom from './RegisterForm';
import SignInForm from './SignInForm';
import style from './Header.module.scss';

const cx = classNames.bind(style);

function Header() {
    const dispatch = useDispatch();

    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [isSignInModal, setIsSignInModal] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    // const [showUserMenu, setShowUserMenu] = useState(false);
    const signInModalRef = useRef();
    useOutsideCloser(signInModalRef, setIsSignInModal);

    const handleToggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const handleToggleSignInModal = () => {
        setIsSignInModal(!isSignInModal);
    };

    const closeSignInModal = () => {
        setIsSignInModal(false);
    };

    const openSignInModal = () => {
        setIsRegister(false);
    };

    const openRegisterModal = () => {
        setIsRegister(true);
    };

    const handleShowSidebar = () => {
        dispatch(showSidebar());
    };

    return (
        <div className={cx('wrapper', 'row')}>
            {/* Logo on tablet and mobile*/}
            <div className={cx('col', 'l-0', 'm-4', 'c-7')}>
                <div className={cx('logo-content')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img src={images.logo} alt={'New-Film logo'} className={cx('logo-img')} />
                    </Link>
                </div>

                {/* close sidebar button on tablet and mobile */}
                <button className={cx('menu-toggle')} onClick={handleShowSidebar}>
                    <HiMenu />
                </button>
            </div>

            <div className="col l-9 m-5 c-0">
                <Search />
            </div>

            <div className="col l-3 m-3 c-5">
                <div className={cx('tool-content')}>
                    {/* theme */}
                    <button className={cx('theme')} onClick={handleToggleTheme}>
                        {!isDarkTheme && <BsSun />}
                        {isDarkTheme && <BsMoonStars />}
                    </button>

                    {/* sign in btn */}
                    <button className={cx('sign-in_btn')} onClick={handleToggleSignInModal}>
                        Sign in
                    </button>

                    {/* Sign In Modal */}
                    <div className={cx('sign-in_modal', { active: isSignInModal })}>
                        <div className={cx('modal-content')} ref={signInModalRef}>
                            <button className={cx('modal-close')} onClick={closeSignInModal}>
                                <AiOutlineClose />
                            </button>

                            <button
                                className={cx('modal-header', 'modal-header_separate', { active: !isRegister })}
                                onClick={openSignInModal}
                            >
                                LOG IN
                            </button>
                            <button className={cx('modal-header', { active: isRegister })} onClick={openRegisterModal}>
                                CREATE YOUR ACCOUNT
                            </button>

                            {isRegister ? <RegisterFrom /> : <SignInForm />}
                        </div>
                    </div>

                    {/* user menu */}
                    {/* <HeadlessTippy
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
                    </HeadlessTippy> */}
                </div>
            </div>
        </div>
    );
}

export default Header;
