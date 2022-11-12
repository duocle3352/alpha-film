import classNames from 'classnames/bind';
import footerData from './footerData';
import style from './Footer.module.scss';
import { Link } from 'react-router-dom';
import images from '~/assets/image';

const cx = classNames.bind(style);

function Footer() {
    return (
        <section className={cx('wrapper', 'row')}>
            <div className={cx('col', 'l-2-4')}>
                <Link to="./" className={cx('logo-link')}>
                    <img src={images.logoSquare} alt="logo" />
                </Link>
            </div>

            {footerData.map((data, index) => (
                <ul key={index} className={cx('link-content', 'col', 'l-2-4')}>
                    <h4 className={cx('title')}>{data.title}</h4>
                    {data.elements.map((element, index) => (
                        <li key={index}>
                            <Link to="./" className={cx('link')}>
                                {element}
                            </Link>
                        </li>
                    ))}
                </ul>
            ))}
        </section>
    );
}

export default Footer;
