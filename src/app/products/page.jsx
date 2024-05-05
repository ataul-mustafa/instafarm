import React from 'react'
import SearchAndFilters from '../components/SearchAndFilters/SearchAndFilters'
import Header from '../components/Header/Header'
import Products from '../components/products/Products'

const page = () => {
  return (
    <div>
      <Header />
      <SearchAndFilters />
      <Products />
    </div>
  )
}

export default page
