import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

import classes from "./SearchBox.module.scss";

function SearchBox({onSearch,placeholder}: any) {
  const { t } = useTranslation();
  const handleInputChange = (e:any) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm);
  };
  return (
    <div className={classes.searchBox}>
      <Icon
        icon="fluent:search-28-filled"
        width="24"
        style={{ fontWeight: "bold" }}
      />
      <input
        type="search"
        placeholder={placeholder}
        name="search"
        
        onChange={handleInputChange}
        className={classes.searchBox_input}
      />
    </div>
  );
}

export default SearchBox;
