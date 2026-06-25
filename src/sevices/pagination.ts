

export const getVisiblePages = (currentPage, totalPages, visiblePages) => {

    const pages = [];

    let start = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let end = start + visiblePages - 1;

    if(end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - visiblePages + 1);
    };

    for(let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
};