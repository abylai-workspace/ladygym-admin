import { useEffect, useState } from "react";

const useFormattedTime = (inputDateString) => {
    const [formattedTime, setFormattedTime] = useState('');
  
    useEffect(() => {
      const inputDate = new Date(inputDateString);
      const hours = inputDate.getHours().toString().padStart(2, '0');
      const minutes = inputDate.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      setFormattedTime(formattedTime);
    }, [inputDateString]);
  
    return formattedTime;
  };
  export default useFormattedTime;