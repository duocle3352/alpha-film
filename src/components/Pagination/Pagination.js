import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { usePagination, DOTS } from '~/hook';
import style from './Pagination.module.scss';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

const cx = classNames.bind(style);
let keyNumber = 0;

function Pagination({ totalPageCount, currentPage, siblingCount = 1, page, className }) {
    const paginationRange = usePagination({
        currentPage,
        totalPageCount,
        siblingCount,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    let lastPage = paginationRange[paginationRange.length - 1];

    const defaultMain = document.getElementsByClassName('default-main');
    const scrollToTop = () => {
        defaultMain.scrollTo(0, 0);
    };

    return (
        <div
            className={cx('pagination-container', 'l-8', 'l-o-2', 'm-12', 'c-12', {
                [className]: className,
            })}
        >
            {/* Left navigation arrow */}

            <Link
                to={`/${page}/${currentPage - 1}`}
                className={cx('pagination-item', {
                    disabled: currentPage === 1,
                })}
                onClick={scrollToTop}
            >
                <BiChevronLeft />
            </Link>

            {/* main pagination */}
            {paginationRange.map((pageNumber) => {
                // If the pageItem is a DOT, render the DOTS unicode character
                keyNumber += DOTS;
                if (pageNumber === DOTS) {
                    return (
                        <span
                            key={`${pageNumber}${keyNumber}`}
                            className={cx('pagination-item', 'dots')}
                        >
                            &#8230;
                        </span>
                    );
                }

                // Render our Page Pills
                return (
                    <Link
                        key={pageNumber}
                        to={`/${page}/${pageNumber}`}
                        className={cx('pagination-item', {
                            selected: pageNumber === currentPage,
                        })}
                        onClick={scrollToTop}
                    >
                        {pageNumber}
                    </Link>
                );
            })}
            {/*  Right Navigation arrow */}

            <Link
                to={`/${page}/${currentPage + 1}`}
                className={cx('pagination-item', {
                    disabled: currentPage === lastPage,
                })}
                onClick={scrollToTop}
            >
                <BiChevronRight />
            </Link>
        </div>
    );
}

Pagination.propTypes = {
    totalPageCount: PropTypes.number.isRequired,
    siblingCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    page: PropTypes.string,
    className: PropTypes.string,
};

export default Pagination;
