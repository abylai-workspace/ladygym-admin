import React, { useMemo, useState } from "react";
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


const Table = ({ data }) => {
    const [search, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Calculate the indexes for pagination

    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendarModal, setShowCalendarModal] = useState(false);

    const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

    //!Modal window data
    const [editData, setEditData] = useState(null);
    const [editvisible, setEditvisible] = useState(false);

    const [regali, setRegali] = useState(null);
    const [regaliVisble, setRegaliVisble] = useState(false);

    const onSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };
    console.log(data);
    const filterdata = data.filter((item) => {
        return item.firstName.toLowerCase().includes(search.toLowerCase());
    });
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterdata.slice(indexOfFirstItem, indexOfLastItem);
    const [sortedData, setSortedData] = useState(filterdata);

    const sortByName = () => {
        const sorted = [...sortedData].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.username.localeCompare(b.username);
            } else {
                return b.username.localeCompare(a.username);
            }
        });
        console.log(sorted);
        setSortedData(sorted);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };
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


    const onDownLoadSvg = () => {
        //download data svg format
        const link = document.createElement("a");
        link.href = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
            data.toString() + ";base64," + encodeURIComponent
        )
        

    }
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
                    <h1>Персонал</h1>
                    <div
                        style={{
                            display: "flex",
                            backgroundColor: "#CF5490",
                            padding: "1%",
                            borderRadius: "10px",
                        }}
                    >
                        <div>
                            <h5>Скачать учет</h5>{" "}

                        </div>
                        <Icon icon='material-symbols:download' width="24" color="white"/>

                    </div>
                </div>

                <SearchBox onSearch={onSearch} placeholder='Поиск сотрудника' />

                <table>
                    <thead className='thead-background'>
                        <tr>
                            <th>Имя сотрудника</th>
                            <th>Email</th>
                            <th>Номер телефона</th>
                            <th>Роль</th>
                            <th>Пароль</th>
                            <th>Рейтинг</th>
                            {/* <th>Информация</th>
                            <th>Регалии</th> */}
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
                                <td>{item.height}</td>
                                <td>{item.height}</td>
                                <td>{item.birthDate}</td>

                                <td>{item.birthDate}</td>

                                <td>{item.address.address}</td>
                                <td>
                                    <div
                                        style={{
                                            display: "flex",
                                            backgroundColor: "#CF5490",
                                            padding: "4%",
                                            borderRadius: "10px",
                                            fontSize: "13px",
                                            color: "white",
                                            textAlign: "center",
                                        }}
                                    >
                                        <h5 style={{ textAlign: "center" }}>
                                            {" "}
                                            Подробнее
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
                                        >
                                            <h5
                                                style={{ paddingRight: 15 }}
                                               
                                            >
                                                Регалии
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
                                                        backgroundColor: "#000",
                                                        padding: 10,
                                                        borderRadius: 10,
                                                    }}
                                                >
                                                    <h5>Удалить сотрудника</h5>
                                                    <h5
                                                       
                                                    >
                                                        Редактировать данные
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
              
            </div>
        </>
    );
};

export default Table;