import React from 'react';
import { View, Text } from 'react-native';

const useDateFormat = (inputDateString) => {
  const formatDate = (inputDateString) => {
    const inputDate = new Date(inputDateString);
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = inputDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return formatDate(inputDateString);
};
export default useDateFormat;