import css from "./SearchBar.module.css";
import { useState } from "react";
import { Icon } from "../Icon/Icon";

type SearchBarProps = {
  onSearch: (value: string) => void;
  className: string;
};

export const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [value, setValue] = useState("");

  const handleClear = () => {
    setValue("");
    onSearch("");
  };
  return (
    <div className={`${css.inputWrapper} ${className}`}>
      <input
        className={`${css.search} ${className}`}
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        name="search"
      />
      <div className={css.buttons}>
        {value && (
          <button
            type="button"
            className={css.clearButton}
            onClick={handleClear}
          >
            <Icon name="icon-x" className={css.icon} />
          </button>
        )}
        <button type="submit" className={css.clearButton}>
          <Icon name="icon-search" className={css.icon} />
        </button>
      </div>
    </div>
  );
};
