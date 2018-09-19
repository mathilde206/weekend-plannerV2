import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    Pagination,
    PaginationItem,
    PaginationLink,
} from 'reactstrap';

import './Paginator.scss';

const Paginator = ({
    total_pages,
    previous,
    next,
    handlePageClick
}) => {
    const numberOfPagesArray = [ ...Array(total_pages).keys() ].map(page => page + 1);
    const currentPage = previous ? previous + 1 : 1;
    return (
        <div className="paginator-container">
            <Pagination aria-label="Page navigation example">
                <PaginationItem disabled={!previous}>
                    <PaginationLink previous onClick={() => handlePageClick(previous)} />
                </PaginationItem>
                {
                    numberOfPagesArray.map((page) => (
                        <PaginationItem active={page === currentPage} key={page}>
                            <PaginationLink onClick={() => handlePageClick(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }
                <PaginationItem disabled={!next}>
                    <PaginationLink next onClick={() => handlePageClick(next)} />
                </PaginationItem>
            </Pagination>
        </div>
    );
};

Paginator.defaultProps = {
    total_pages: 0,
    previous: 0,
    next: 0,
};

Paginator.propTypes = {
    total_pages: PropTypes.number,
    previous: PropTypes.number,
    next: PropTypes.number,
};

export default Paginator;