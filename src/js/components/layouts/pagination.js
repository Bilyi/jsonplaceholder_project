import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ movies, fetchData }) => {
    if(!Object.keys(movies).length) {
        return null;
    }

    const { total_results } = movies;
    const totalPages = Math.ceil(total_results/20);

    const changePage = (e) => {
        const value = e.selected ? e.selected + 1 : 1;
        fetchData(value);

    };

    return (
        <div className="pagination-wrapper">
            <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                onPageChange={changePage}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    )
};

export default Pagination;