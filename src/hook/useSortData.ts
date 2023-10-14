import { useState, useEffect } from 'react';

interface Item {
  id: number;
  firstName: string;
  createdAt: string;
}

type SortBy = 'newest' | 'oldest' | 'alphabetical' ;

interface UseSortDataProps {
  initialData: Item[];
}

interface UseSortData {
  sortedData: Item[];
  sortBy: SortBy;
  handleSortChange: (newSortBy: SortBy) => void;
}

const useSortData = ({ initialData }: UseSortDataProps): UseSortData => {
  const [data, setData] = useState<Item[]>(initialData);
  const [sortBy, setSortBy] = useState<SortBy>('newest');

  const sortData = (dataToSort: Item[]): Item[] => {
    if (sortBy === 'newest') {
      return dataToSort.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'oldest') {
      return dataToSort.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === 'alphabetical') {
      return dataToSort.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }
    return dataToSort;
  };

  const handleSortChange = (newSortBy: SortBy): void => {
    setSortBy(newSortBy);
  };

  useEffect(() => {
    // Sort the data whenever sortBy or initialData changes
    const sortedData = sortData(initialData);
    setData(sortedData);
  }, [sortBy, initialData]);

  return {
    sortedData: data,
    sortBy,
    handleSortChange,
  };
};

export default useSortData;
