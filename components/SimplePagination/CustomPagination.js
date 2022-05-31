import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

const CustomPagination = (props) => {

    console.log('props', props);

    const { data, itemsPerPage,count } = props;


    const [pageCount, setPageCount] = useState(0);
    console.log('data', count);
    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = data + itemsPerPage;
        let countData = count / itemsPerPage;
        setPageCount(countData);

        // setCurrentItems(data.slice(itemOffset, endOffset));
        // setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [data, itemsPerPage,count]);

    const handlePageClick = (event) => {

        const newOffset = (event.selected * itemsPerPage) % count;
        props.handlePageInfo(newOffset); 
           
        // console.log(
        //   `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        // setItemOffset(newOffset);
        };


    return (
        <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            // onChange={handleLangChange}
            // onPageChange={handleLangChange}
            // onChange={handleLangChange}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
        />
    );

};
export default CustomPagination;
