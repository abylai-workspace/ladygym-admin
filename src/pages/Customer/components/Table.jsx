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
import CustomerEdit from "./CustomerEdit";
import Regali from "./Regali";
import UserInfo from "./UserInfo";
import AddUser from "./AddUser";
import { deletePersonal } from "../../../config/axios";
import { useSelector } from "react-redux";

const Table = ({ data }) => {
    const user = useSelector((state) => state?.auth);
    const token = user.token;
    const [search, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Calculate the indexes for pagination
    const [sortBy, setSortBy] = useState("all");

    useEffect(() => {}, [data]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendarModal, setShowCalendarModal] = useState(false);

    const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

    //!Modal window data
    const [editData, setEditData] = useState(null);
    const [editvisible, setEditvisible] = useState(false);

    const [regali, setRegali] = useState(null);
    const [regaliVisble, setRegaliVisble] = useState(false);

    const [userInfo, setUserInfo] = useState(null);
    const [userInfoVisble, setUserInfoVisble] = useState(false);

    const [adduserVisible, setAdduserVisible] = useState(false);

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
    const currentItems = sortData(filterdata).slice(indexOfFirstItem, indexOfLastItem);
    

    
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

    const onEditCustomer = (customer) => {
        setEditData(customer);
        setEditvisible(true);
    };

    const onRegaliCustomer = (customer) => {
        setRegali(customer);
        setRegaliVisble(true);
    };

    const onUserInfo = (userInfo) => {

        if(userInfo?.trainerDetails!==null){
            setUserInfo(userInfo);
            console.log('User info',userInfo)
            setUserInfoVisble(true);
        }else{

            return alert('User info is not available')
        }
      
    };

    const deletePerson = async (id) => {
        try {
            const response = await deletePersonal(token, id);
        } catch (error) {
            console.log(error)
        }
    };

    console.log(currentItems)

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
                    <h1>Новый сотрудника</h1>
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
                            cursor: "pointer",
                        }}
                    >
                        <div>
                            <h5 onClick={() => setAdduserVisible(true)}>
                                Добавить сотрудника
                            </h5>{" "}
                        </div>
                    </div>
                </div>

                <SearchBox onSearch={onSearch} placeholder='Поиск сотрудника' />
                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead className='thead-background'>
                            <tr>
                                <th>Имя сотрудника</th>
                                <th>Email</th>
                                <th>Номер телефона</th>
                                <th>Роль</th>
                                <th>Пароль</th>
                                <th>Рейтинг</th>
                                <th>Информация</th>
                                <th>Регалии</th>
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
                                    <td>{item.email}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.role}</td>

                                    <td>
                                        {item?.password?.substring(0, 5)}...
                                    </td>

                                    <td>{item.rating}</td>
                                    <td>
                                        {item.role === "TRAINER" && (
                                            <>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        backgroundColor:
                                                            "#CF5490",
                                                        padding: "4%",
                                                        borderRadius: "10px",
                                                        fontSize: "13px",
                                                        color: "white",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <h5
                                                        style={{
                                                            textAlign: "center",
                                                            marginLeft: 15,
                                                        }}
                                                        onClick={() =>
                                                            onUserInfo(item)
                                                        }
                                                    >
                                                        {" "}
                                                        Подробнее
                                                    </h5>
                                                </div>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                      
                                            <>
                                                <div
                                                    style={{ display: "flex" }}
                                                >
                                                      {item.role === "TRAINER" && (
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                "#7536EA",
                                                            padding: "2%",
                                                            borderRadius:
                                                                "10px",
                                                            fontSize: "13px",
                                                            color: "white",
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                        <h5
                                                            style={{
                                                                paddingRight: 5,
                                                                paddingLeft: 5,
                                                                marginTop: 5,
                                                            }}
                                                            onClick={() =>
                                                                onRegaliCustomer(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            Регалии
                                                        </h5>
                                                    </div>
                                                      )}
                                                    <div
                                                        style={{
                                                            padding: "3%",
                                                            width: 50,
                                                            height: 40,
                                                        }}
                                                        className='tooltipBoundary'
                                                    >
                                                        <Popup
                                                            trigger={
                                                                <h4>....</h4>
                                                            }
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
                                                                        deletePerson(
                                                                            item.id
                                                                        );
                                                                       
                                                                    }}
                                                                >
                                                                    Удалить
                                                                    сотрудника
                                                                </h5>
                                                                <h5
                                                                    onClick={() =>
                                                                        onEditCustomer(
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    Редактировать
                                                                    данные
                                                                </h5>
                                                            </div>
                                                        </Popup>
                                                    </div>
                                                </div>
                                            </>
                                        
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
                {editvisible && (
                    <CustomerEdit
                        onClose={() => setEditvisible(false)}
                        data={editData}
                    />
                )}
                {regaliVisble && (
                    <Regali
                        onClose={() => setRegaliVisble(false)}
                        data={regali}
                    />
                )}
                {userInfoVisble && (
                    <UserInfo
                        data={userInfo}
                        onClose={() => setUserInfoVisble(false)}
                    />
                )}
                {adduserVisible && (
                    <AddUser onClose={() => setAdduserVisible(false)} />
                )}
            </div>
        </>
    );
};

export default Table;
