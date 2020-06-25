import React, { useEffect, useState } from "react";
import classes from './PaginationNav.module.css';
import Pagination from "@material-ui/lab/Pagination";

const PaginationNav = (props) => {
  const { totalItems, fetchItems } = props;
  const [totalPages, setTotalPages] = useState(0);
  const pageNumbers = [];

  useEffect(() => {
    const totalPages = Math.ceil(totalItems / 2);
    setTotalPages(totalPages);
  }, [totalItems]);
  
  for(let i = 1; i <= Math.ceil(totalItems / 2); i++){
    pageNumbers.push(i);
  }
  const handlePageChange = (event, page) => {
    fetchItems(page);
  };

  return (
    <div className={classes.PaginationNav}>
      <Pagination
        count={totalPages}
        showFirstButton
        showLastButton
        onChange={handlePageChange}
      />
      {/* <ul className='pagination'>
        {pageNumbers.map(page => (
          <li key={page} onClick={() => fetchItems(page)} className='page-item page-link active'>
            {page}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default PaginationNav;
