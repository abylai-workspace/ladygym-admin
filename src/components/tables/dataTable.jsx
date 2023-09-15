// src/components/DataTable.js
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import SearchBox from "../topnav/searchBox/SearchBox";
import SortingOptions from "./SortingOptions";
import classes from './table.css'
function DataTable({ data }) {
    const itemsPerPage = 5; // Number of items per page
    const [currentPage, setCurrentPage] = useState(0);
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('По алфавиту');
    const sortingOptions = [
      { value: 'По алфавиту', label: 'Sort by Title' },
      { value: 'Сначала новые', label: 'Sort by Body' },
      { value: 'Сначала старые', label: 'Sort by Body' },
    ];

    function sortData(data, sortBy, sortOrder) {
      return [...data].sort((a, b) => {
        if (sortBy === 'По алфавиту') {
          return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        } else if (sortBy === 'Сначала новые') {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return sortOrder === 'asc' ? dateB - dateA : dateA - dateB;
        } else if (sortBy === 'Сначала старые') {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return 0;
      });
    }

   const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };
    

    const displayedData = data.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

   

    const filteredData = displayedData.filter((item) => {
      return item.user.firstName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
  };
    const handleSearch = (term) => {
      setSearchTerm(term);
      console.log(term);
    };


    
    return (
        <div >
      <SearchBox onSearch={handleSearch}/>
      <SortingOptions
        sortingOptions={[
          { value: 'По алфавиту', label: 'По алфавиту' },
          { value: 'Сначала новые', label: 'Сначала новые' },
          { value: 'Сначала старые', label: 'Сначала старые' },
        ]}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSort}
      />
            <div lassName="data-table">
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Активация</th>
                            <th>Заморозка абонемента</th>
                            <th>Тренер</th>
                            <th>Срок абонемента</th>
                            <th>Ключ</th>
                            <th>Документы</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => {
                            console.log(item);
                            return (
                                <tr key={item.id}>
                                    {/* <td>{item.id}</td> */}
                                    <td>{item.user.firstName}</td>
                                    <td>
                                        {item.paid === true
                                            ? "Активирован"
                                            : "НеАктивирован"}
                                    </td>
                                    <td>{item.user.firstName}</td>
                                    <td>{item.subscriptionAdditionalType}</td>
                                    <td>{item.expirationDate}</td>
                                    <td>{item.key}</td>
                                    <td>{item.documents}</td>

                                    {/* <td>
    <ul>
      {item.documents.map((document, index) => (
        <li key={index}>{document}</li>
      ))}
    </ul>
  </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    totalPages={totalPages}
                />
                <p>
                    Page {currentPage + 1} of {pageCount}
                </p>
            </div>
        </div>
    );
}

export default DataTable;
