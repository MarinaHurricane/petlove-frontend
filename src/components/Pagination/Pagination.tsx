import css from './Pagination.module.css'


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({currentPage, totalPages, onPageChange}: PaginationProps) => {
    if(totalPages <= 1) return null;

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    return (
        <div>
            <button disabled={isFirstPage} onClick={() => onPageChange(1)}>
                        {'<<'}
            </button>
            <button disabled={isFirstPage} onClick={() => onPageChange(currentPage - 1)}>
                {'<'}
            </button>
            <button disabled={isLastPage} onClick={() => onPageChange(currentPage + 1)}>
                 {'>'}
            </button>
            <button disabled={isLastPage} onClick={() => onPageChange(totalPages)}>
                {'>>'}
            </button>
        </div>
    )
}


