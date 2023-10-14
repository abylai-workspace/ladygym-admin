import React, { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import SearchBox from "../../../components/topnav/searchBox/SearchBox";
import "./style.css";
import { Icon } from "@iconify/react";
import Modal from "../../../components/UI/modal/Modal";
import { images } from "../../../constants";
import CalendarModal from "../../../components/UI/CalendarModal/CalendarModal";
import Papa from "papaparse";
import { current } from "@reduxjs/toolkit";
import Popup from "reactjs-popup";
import Freeze from "./Freeze";
import AddUser from "./AddUser";
import Documents from "./Documents";

const Table = ({ data }) => {
    const [search, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Calculate the indexes for pagination

    //!Modal window data
    const [freezeVisible, setFreezeVisible] = useState(false);
    const [adduserVisible, setAdduserVisible] = useState(false);

    const [visibleDocuents, setVisibleDocuents] = useState(false);
    const [sortBy, setSortBy] = useState("all");

    const onSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const sortData = (data) => {
        console.log(data);
        if (sortBy === "newest") {
            return data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
        } else if (sortBy === "oldest") {
            return data.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            );
        } else if (sortBy === "alphabetical") {
            return data.sort((a, b) => a.firstName.localeCompare(b.firstName));
        }else if(sortBy === "all"){
            return data
        }
        return data;
    };

    const filterdata = data.filter((item) => {
        return item.firstName.toLowerCase().includes(search.toLowerCase());
    });
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortData(filterdata)?.slice(indexOfFirstItem, indexOfLastItem);
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
            <div>
                <div
                    style={{
                        marginBottom: "2%",
                        marginLeft: "2%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >
                    <h1>Клиенты</h1>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <h3>Показать:</h3>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                backgroundColor:'transparent',
                                width:'100%',
                                border:'none',
                                color:'#fff',
                                marginLeft:'4%'
                            }}
                        >
                            <option value='all'>Все</option>
                            <option value='newest'>Сначала новые</option>
                            <option value='oldest'>Сначала старые</option>
                            <option value='alphabetical'>По алфавиту</option>
                        </select>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h3>Всего:  </h3>
                        <h3 style={{color:'#fff'}}> {data.length} посетителей</h3>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#7536EA",
                            padding: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <div>
                            <h5 onClick={() => setAdduserVisible(true)}>
                                Добавить пользователя
                            </h5>{" "}
                        </div>
                    </div>
                </div>

                <SearchBox onSearch={onSearch} placeholder='Поиск сотрудника' />
                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead className='thead-background'>
                            <tr>
                                <th>Имя клиента</th>
                                <th>Активация</th>
                                <th>Заморозка</th>
                                <th>Тренер</th>
                                <th>Срок абонемента</th>
                                <th>Ключ</th>
                                <th>Документы</th>
                            </tr>
                        </thead>

                        <tbody className='table-row'>
                            {currentItems.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={
                                        index % 2 === 0 ? "even-row" : "odd-row"
                                    }
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
                                        {item?.subscription?.subscriptionType
                                            ?.freezingAmount || "0"}
                                    </td>
                                    <td>
                                        {item.subscription
                                            ?.subscriptionAdditionalType ||
                                            "нет тренер"}
                                    </td>

                                    <td>{item.birthDate}</td>

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
                                            <h5
                                                style={{
                                                    textAlign: "center",
                                                    backgroundColor: "#CF5490",
                                                    padding: 2,
                                                    borderTopRightRadius: 10,
                                                    borderBottomRightRadius: 10,
                                                    paddingRight: 10,
                                                }}
                                            >
                                                {" "}
                                                Выдать ключ
                                            </h5>
                                        </div>
                                    </td>

                                    <td>
                                        <div style={{ display: "flex" }}>
                                            <div
                                                style={{
                                                    backgroundColor: "#7536EA",
                                                    padding: "3%",
                                                    borderRadius: "10px",
                                                    fontSize: "13px",
                                                    color: "white",
                                                    textAlign: "center",
                                                }}
                                                onClick={() =>
                                                    setVisibleDocuents(true)
                                                }
                                            >
                                                <h5 style={{ padding: 3 }}>
                                                    Документы
                                                </h5>
                                            </div>
                                            <div
                                                style={{
                                                    padding: "3%",
                                                    width: 50,
                                                    height: 40,
                                                }}
                                                className='tooltipBoundary'
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
                                                    keepTooltipInside='.tooltipBoundary'
                                                >
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                "#000",
                                                            padding: 10,
                                                            borderRadius: 10,
                                                        }}
                                                    >
                                                        <h5
                                                            onClick={() => {
                                                                setFreezeVisible(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            Заморозить
                                                        </h5>
                                                    </div>
                                                </Popup>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <nav>
                    <ul className='pagination'>
                        <li
                            className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                            }`}
                        >
                            <button className='page-link' onClick={prevPage}>
                                <Icon
                                    className='icon'
                                    icon='fluent:arrow-left-28-filled'
                                />
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
                                    className='page-link'
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
                            <button className='page-link' onClick={nextPage}>
                                <Icon
                                    className='icon'
                                    icon='fluent:arrow-right-28-filled'
                                />
                            </button>
                        </li>
                    </ul>
                </nav>
                {freezeVisible && (
                    <Freeze onClose={() => setFreezeVisible(false)} />
                )}

                {visibleDocuents && (
                    <Documents onClose={() => setVisibleDocuents(false)} />
                )}
            </div>
            {adduserVisible && (
                <AddUser onClose={() => setAdduserVisible(false)} />
            )}
        </>
    );
};

export default Table;
