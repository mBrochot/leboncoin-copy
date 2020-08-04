import React from "react";
import arrowRightBlue from "../images/arrow-right-blue.svg";
import arrowLeftBlue from "../images/arrow-left-blue.svg";
import arrowRightGrey from "../images/arrow-right-grey.svg";
import arrowLeftGrey from "../images/arrow-left-grey.svg";

const Pagination = ({ limit, count, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(count / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination-nb">
        <li onClick={(event) => {event.preventDefault();
            if (currentPage > 1) paginate(currentPage - 1);}}>
              
          {currentPage > 1 ? <img src={arrowLeftBlue} alt="arrowLeft" /> : <img src={arrowLeftGrey} alt="arrowLeft" />}
        </li>
        {pageNumbers.map((number) => (
          <li key={number} onClick={(event) => {event.preventDefault();
              if (currentPage !== number) paginate(number); }}>
            <div className={currentPage === number ? "orangeBox" : "blue cursor"}>{number}</div>
          </li>))}

        <li onClick={(event) => {event.preventDefault();
            if (currentPage < pageNumbers.length) paginate(currentPage + 1);}}>
          {currentPage < pageNumbers.length? <img src={arrowRightBlue} alt="arrowLeft" /> : <img src={arrowRightGrey} alt="arrowLeft" />}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
