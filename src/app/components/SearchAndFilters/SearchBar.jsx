import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the desired icon component
import Style from './SearchBar.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { globalContext } from '@/Context API/ContextProvider';

function SearchInput() {

  const { setProductLoader, setProducts, setSearchValue } = useContext(globalContext)

  const getProducts = async () => {
    setProductLoader(true)
    try {
      const { data } = await axios.get('/api/product/get-all', {
        headers: {
          authorization: localStorage.getItem('jwtToken')
        }
      });
      setProducts(data);
    } catch (error) {
      toast.error(error.response.data.error)
    }
    setProductLoader(false)
  }

  const onSearchChange = async (e) => {

    setProductLoader(true);
    try {
      const {data} = await axios.get(`/api/product/filters?name=${e.target.value}`, {
        headers: {
          Authorization: localStorage.getItem('jwtToken')
        }
      })
      setProducts(data);
    } catch (error) {
      toast.error(error.response.data.error)
    }
    setProductLoader(false)
    setSearchValue(e.target.value)

  }

  return (
    <div className={Style.searchContainer}>
      <input type="text" onChange={onSearchChange} placeholder="Search products..." />
      <FaSearch />
    </div>
  );
}

export default SearchInput;
