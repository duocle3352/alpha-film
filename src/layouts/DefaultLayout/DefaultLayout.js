import PropTypes from 'prop-types';
import { Header, Sidebar, Footer } from '../components';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <div className="default-wrapper">
            <Sidebar />
            <div className="default-container">
                <Header />
                <div className="default-main">
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
