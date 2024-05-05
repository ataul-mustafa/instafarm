"use client"

import React, { useContext, useState } from 'react'
import Style from './SearchAndFilter.module.css'
import SearchBar from './SearchBar'
import { IoGridOutline } from "react-icons/io5";
import { IoGrid } from "react-icons/io5";
import { TfiViewListAlt } from "react-icons/tfi";
import { FaThList } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import { globalContext } from '@/Context API/ContextProvider';

const SearchAndFilters = () => {

  const { setProductLoader, searchValue, setProducts, prodViewMode, setProdViewMode } = useContext(globalContext)

  const filt = {
    category: '',
    price: '',
    availability: '',
    sortBy: '',
  }
  const [filters, setFilters] = useState(filt);

  const onFilterChange = async (e, filterName) => {
    const filterValue = e.target.value;

    setFilters({...filters, [filterName]: filterValue})
    filters[filterName] = filterValue;
    setProductLoader(true)
     try {
      const { data } = await axios.get(`/api/product/filters?name=${searchValue}&category=${filters.category}&price=${filters.price}&availability=${filters.availability}&sortBy=${filters.sortBy}`, {
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

  return (
    <div className={Style.filterWrapper} >
      <SearchBar />
      <div className={Style.filters}>
        <div>
          <div>
            {
              prodViewMode == 'grid' ?
                <div>
                  <IoGrid />
                  <TfiViewListAlt onClick={() => { setProdViewMode('list') }} />
                </div> :
                <div>
                  <IoGridOutline onClick={() => { setProdViewMode('grid') }} />
                  <FaThList />
                </div>
            }
            <div>
              <select className={Style.select} onChange={(e) => { onFilterChange(e, 'category') }} >
                <option value="" >Categories</option>
                <option value="" disabled>Featured</option>
                <option value="crops">Crops</option>
                <option value="spices">Spices</option>
                <option value="dairy">Dairy</option>
                <option value="fruits">fruits</option>
                <option value="flowers">flowers</option>
              </select>
              <select className={Style.select} onChange={(e) => { onFilterChange(e, 'price') }}>
                <option value="">Price</option>
                <option value="" disabled>Featured</option>
                <option value="0-1000" >₹0 - ₹1000</option>
                <option value="1000-2000" >₹1000 - ₹10000</option>
                <option value="10000-5000" >₹10000 - ₹20000</option>
              </select>

              <select className={Style.select} onChange={(e) => { onFilterChange(e, 'availability') }}>
                <option value="">Availability</option>
                <option value="" disabled>Featured</option>
                <option value="in-stock" >In Stock</option>
                <option value="out-of-stock" >Out Of Stock</option>
              </select>
            </div>
          </div>
          <select className={Style.select} onChange={(e) => {onFilterChange(e, 'sortBy') }}>
            <option value="" >Sort By </option>
            <option value="" disabled>Featured</option>
            <option value="priceAscending" >Price : Lowest</option>
            <option value="priceDescending" >Price : Highest</option>
            <option value="nameAscending" >Name : (A-Z)</option>
            <option value="nameDescending" >Name : (Z-A)</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilters
