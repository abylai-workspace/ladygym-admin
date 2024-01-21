import React, { useMemo, useState } from "react";
import Calendar from "react-calendar";
import SearchBox from "../../../components/topnav/searchBox/SearchBox";
import "./style.css";
import { Icon } from "@iconify/react";

import { images } from "../../../constants";

import Popup from "reactjs-popup";

const TableNext = ({ data }) => {
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
      <div style={{ marginTop: 10 }}>
        <SearchBox onSearch={onSearch} placeholder="Поиск сотрудника" />
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead className="thead-background">
              <tr>
                <th>Имя тренра</th>
                <th>Номер телефона</th>
                <th>Период</th>
                <th>Кол-во подопечных </th>
                <th>Новые подопечные</th>
                <th>Кол-во продлений</th>
                <th>Кол-во посещений</th>
                <th>Сумма</th>
                <th></th>
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
                      {item.firstName}
                    </div>
                  </td>
                  <td>{item.paid ? "Да" : "Нет"}</td>
                  <td>
                    {item?.subscription?.subscriptionType?.freezingAmount ||
                      "0"}
                  </td>
                  <td>
                    {item.subscription?.subscriptionAdditionalType ||
                      "нет тренер"}
                  </td>

                  <td>{item.birthDate}</td>

                  <td>
                    <div>
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

                  <td>
                    <h2>asd</h2>
                  </td>
                  <td>
                    <h2>asd</h2>
                  </td>
                  <td>
                    {" "}
                    <div
                      style={{
                        padding: "3%",
                        width: 50,
                        height: 40,
                      }}
                      className="tooltipBoundary"
                    >
                      <Popup
                        trigger={<h4>....</h4>}
                        position={[
                          "right bottom",
                          "bottom left",
                          "bottom center",
                          "bottom right",
                        ]}
                        closeOnDocumentClick
                        keepTooltipInside=".tooltipBoundary"
                      >
                        <div
                          style={{
                            backgroundColor: "#000",
                            padding: 10,
                            borderRadius: 10,
                          }}
                        >
                          <h5
                            onClick={() => {
                              setFreezeVisible(true);
                            }}
                          >
                            Заморозить
                          </h5>
                        </div>
                      </Popup>
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

export default TableNext;
