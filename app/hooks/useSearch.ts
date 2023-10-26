import { useState } from 'react';

const useSearch = (initialData) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(initialData);

  const search = (query) => {
    const filteredData = initialData.filter(item =>
      item.user.firstName.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
    setSearchQuery(query);
  };

  return {
    searchQuery,
    data,
    search,
  };
};

export default useSearch;
