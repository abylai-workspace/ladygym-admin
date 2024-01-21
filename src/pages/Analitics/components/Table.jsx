import React, { useMemo, useState } from "react";
import Calendar from "react-calendar";
import SearchBox from "../../../components/topnav/searchBox/SearchBox";
import "./style.css";
import { Icon } from "@iconify/react";
import Modal from "../../../components/UI/modal/Modal";
import { images } from "../../../constants";
import CalendarModal from "../../../components/UI/CalendarModal/CalendarModal";
import Papa from "papaparse";
import { formatDate } from "../../../utils/formatEndTime";

import Popup from "reactjs-popup";

const Table = ({ data }) => {
  const [search, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Calculate the indexes for pagination

  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  //!Modal window data
  const [freezeVisible, setFreezeVisible] = useState(false);
  const [adduserVisible, setAdduserVisible] = useState(false);

  const [visibleDocuents, setVisibleDocuents] = useState(false);

  const onSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const filterdata = data.filter((item) => {
    return item.firstName.toLowerCase().includes(search.toLowerCase());
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterdata.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(filterdata.length / itemsPerPage);

  // Handle next and previous buttons
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div style={{ marginTop: 40 }}>
        <SearchBox onSearch={onSearch} placeholder=" Поиск клиента" />
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead className="thead-background">
              <tr>
                <th>Имя клиента</th>
                <th>Куплен</th>
                <th>Срок абонемента</th>
                <th>Замороженные дни</th>
                <th>Всего посещений</th>
                <th>Осталось</th>
              </tr>
            </thead>

            <tbody className="table-row">
              {currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>
                    <div style={{ display: "flex" }}>
                      <img
                        src={images.user}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginTop: "0px",
                          marginRight: "5px",
                        }}
                        alt={item.firstName}
                      />
                      &nbsp;&nbsp;
                      {item.firstName}
                    </div>
                  </td>
                  <td>
                    {item?.subscription?.createdAt
                      ? formatDate(item?.subscription?.createdAt)
                      : "--"}
                  </td>
                  <td>
                    {item?.subscription?.subscriptionType?.durationInDays ||
                      "0"}
                  </td>
                  <td>
                    {item.subscription?.subscriptionType?.freezingAmount ||
                      "--"}
                  </td>

                  <td>
                    {item.subscription?.subscriptionType?.arrivalAmount || "--"}
                  </td>

                  <td>
                    <div
                      style={{
                        display: "flex",

                        padding: "4%",
                        borderRadius: "10px",
                        fontSize: "13px",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      <h4
                        style={{
                          backgroundColor: "#292932",
                          paddingLeft: 10,
                          paddingRight: 10,
                        }}
                      >
                        000
                      </h4>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={prevPage}>
                <Icon className="icon" icon="fluent:arrow-left-28-filled" />
              </button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={nextPage}>
                <Icon className="icon" icon="fluent:arrow-right-28-filled" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Table;
