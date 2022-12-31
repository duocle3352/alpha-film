import PropTypes from 'prop-types';
import { Search } from '~/components/Search';
import { Header, Sidebar, Footer } from '../components';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <div className="wrapper">
            <Sidebar />
            <div className="container">
                <div className="header">
                    <Header />
                    {/* search on mobile */}
                    <div className="mobile-search">
                        <Search />
                    </div>
                </div>

                <div id="main" className="main">
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
