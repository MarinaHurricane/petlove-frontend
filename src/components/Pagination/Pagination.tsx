import css from './Pagination.module.css'
import { useMediaQuery } from "react-responsive";
import { getVisiblePages } from '../../sevices/pagination';


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {
const isMobile = useMediaQuery({maxWidth: 767});

const visiblePages = isMobile? 2 : 3;
if(totalPages <= 1) return null;

const pages = getVisiblePages(currentPage, totalPages, visiblePages);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div className={css.pagination}>
            <button disabled={isFirstPage} onClick={() => onPageChange(1)} className={css.arrows}>
                        {'<<'}
            </button>
            <button disabled={isFirstPage} onClick={() => onPageChange(currentPage - 1)} className={css.arrows}>
                {'<'}
            </button>
            {pages[0] > 1 && <span>...</span>}

            {pages.map(page => (
                <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`${css.arrows} ${page === currentPage ? css.active : css.arrows}`}
                >
                {page}

                </button>
            ))}

            {pages[pages.length - 1] < totalPages && (
                <span className={css.arrows}>...</span>
            )}
            <button disabled={isLastPage} onClick={() => onPageChange(currentPage + 1)} className={css.arrows}>
                 {'>'}
            </button>
            <button disabled={isLastPage} onClick={() => onPageChange(totalPages)} className={css.arrows}>
                {'>>'}
            </button>
        </div>
    )
}


