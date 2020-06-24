import React, { useEffect, useState } from "react";
import classes from './PaginationNav.module.css';
import Pagination from "@material-ui/lab/Pagination";

export const PaginationNav = (props) => {
  const { totalItems, fetchItems } = props;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const totalPages = Math.ceil(totalItems / 2);
    setTotalPages(totalPages);
  }, [totalItems]);

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
    </div>
  );
};

export default PaginationNav;
