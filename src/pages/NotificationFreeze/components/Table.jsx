import React, { useState } from "react";
import "./style.css";
import { Icon } from "@iconify/react";
import TodayCard from "./TodayCard";
function Table({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // Calculate the indexes for pagination

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const totalPages = Math.ceil(data.length / itemsPerPage);

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

    const getToday = currentItems?.map((item) => item);
    const reactivedata = getToday.filter((item) => {
        return item.applied == true;
    });
    console.log(reactivedata, "applied");

    console.log(getToday, "getToday");
    return (
        <>
            <div style={styles.table}>
                <table style={{ overflowX: "auto" }}>
                    <thead></thead>
                    <tbody
                        style={{
                            backgroundColor: "transparent",
                            color: "white",
                            marginBottom: "10px",
                        }}
                    >
                        <tr>
                            <td>Сегодня</td>
                            <td>Вчера</td>
                        </tr>
                        {currentItems.map((item, index) => {
                                const reactivedata = getToday.filter((item) => {
                                    return item.applied == true;
                                });
                                console.log(reactivedata, "applied");
                            return (
                                <>
                                    <tr
                                        key={index}
                                        style={{ marginBottom: 20 }}
                                    >
                                        <td
                                            style={{
                                                marginBottom: 10,
                                                marginTop: 20,
                                            }}
                                        >
                                            <TodayCard data={item} />
                                        </td>

                                        <td>
                                            <TodayCard data={item} />
                                        </td> 
                                    </tr>
                                </>
                            );
                        })}
                        
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
        </>
    );
}

//create filter

const styles = {
    table: {
        width: "100%",
        borderCollapse: "collapse",
        padding: "1%",
        borderSpacing: 0,
        borderRadius: "10px",
        marginTop: "2%",
        overflowX: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    thead: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderCollapse: "collapse",
        padding: "2%",
        color: "#fff",
    },
};
export default Table;
