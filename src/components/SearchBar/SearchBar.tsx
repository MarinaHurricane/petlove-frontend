import css from './SearchBar.module.css'
import { useState } from 'react';
import { Icon } from '../Icon/Icon';

export const SearchBar = ({ onSearch, className }) => {
    const [value, setValue] = useState('')
  const handleSubmit = (formData: FormData) => {
    const searchValue = formData.get("search") as string;

    onSearch(searchValue.trim());
  };

    const handleClear = (e) => {
        setValue('');
        onSearch('');
        e.target.value = '';
    }
  return (
    <form className={css.form} action={handleSubmit}>
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
      {value && <button type="button" className={css.clearButton} onClick={handleClear}>
        <Icon name="icon-x" className={css.icon}/>
        </button>}
        <button type="submit" className={css.clearButton} >
            <Icon name="icon-search" className={css.icon}/>
        </button>
        </div>
      </div>
    
    </form>
  );
};