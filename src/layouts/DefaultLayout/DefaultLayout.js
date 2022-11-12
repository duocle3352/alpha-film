import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Header, Sidebar, Footer } from '../components';
import style from './DefaultLayout.module.scss';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('container')}>
                <Header />
                <div className={cx('main')}>
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
