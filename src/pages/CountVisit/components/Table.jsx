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
  

    const onSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };
    console.log(data);
    const filterdata = data.filter((item) => {
        return item?.user?.firstName.toLowerCase().includes(search.toLowerCase());
    });
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterdata.slice(indexOfFirstItem, indexOfLastItem);
    const [sortedData, setSortedData] = useState(filterdata);

    // const sortByName = () => {
    //     const sorted = [...sortedData].sort((a, b) => {
    //         if (sortOrder === "asc") {
    //             return a.username.localeCompare(b.username);
    //         } else {
    //             return b.username.localeCompare(a.username);
    //         }
    //     });
    //     console.log(sorted);
    //     setSortedData(sorted);
    //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    // };
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


    const handleDownload = () => {
        const csv = Papa.unparse(filterdata);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Учет.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
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
                    <h1>Учет посещаемости</h1>
                    <div
                        style={{
                            display: "flex",
                            backgroundColor: "#CF5490",
                            padding: "1%",
                            borderRadius: "10px",
                        }}
                        onClick={handleDownload}
                    >
                        <div>
                            <h5>Скачать учет</h5>{" "}

                        </div>
                        <Icon icon='material-symbols:download' width="24" color="white"/>

                    </div>
                </div>

                <SearchBox onSearch={onSearch} placeholder='Поиск сотрудника' />
                <div style={{overflowX:'auto'}}>
                <table>
                    <thead className='thead-background'>
                        <tr>
                            <th>Имя сотрудника</th>
                            <th>Приход</th>
                            <th>Уход</th>
                            <th>Дата</th>
                            <th>Время на работе</th>
                            <th>Адрес</th>
                            <th>Кол-во приходов в этом месяце</th>
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
                                        {item?.user?.firstName}
                                    </div>
                                </td>
                                <td>{item.user.height}</td>
                                <td>{item.user.height}</td>
                                <td>{item.user.height}</td>

                            

                                <td>{item.user.height}</td>
                                <td>{item.gym.address}</td>
                                <td>
                                    {item?.subscriptionType?.durationInDays}
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
              
            </div>
        </>
    );
};

export default Table;
