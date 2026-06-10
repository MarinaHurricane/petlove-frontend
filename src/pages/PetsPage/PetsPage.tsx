import css from './PetsPage.module.css'
import { Title } from "../../components/Title/Title"
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { useState } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export const PetsPage = () => {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');

      const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    // const options =  await getCategories();
  };
      const getCategories = async() => {
        const { data } = await axios.get('https://petlove-backend-jniu.onrender.com/api/pets/categories');
        console.log(data);
        return data;
    }

    const {data: categories} = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    })
    console.log(categories);

    const options = categories.map(category => {
        return {value: category, label: category[0].toUpperCase() + category.slice(1)}
    })
    return (
        <>
        <Title>Find your favorite pet</Title>
        <div className={css.filtersContainer}>
            <SearchBar onSearch={handleSearch}/>
            <div className={css.categoryGender}>
               <Select
            //    options={[{value: 'show all', label: 'Show all'},
            //     {value: 'sell', label: 'Sell'},
            //      {value: 'free', label: 'Free'},
            //      {value: 'lost', label: 'Lost'},
            //      {value: 'found', label: 'Found'},]}/>
           
            options={options}
                 placeholder='Category'/>
       

            </div>

        </div>
        </>
    )
}