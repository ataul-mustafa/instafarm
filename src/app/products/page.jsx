import React from 'react'
import SearchAndFilters from '../components/SearchAndFilters/SearchAndFilters'
import Header from '../components/Header/Header'
import Products from '../components/products/Products'
import MobileNavBar from '../components/MobileComp/MobileNavBar'

const page = () => {
  return (
    <div>
      <Header />
      <SearchAndFilters />
      <Products />
      <MobileNavBar />
    </div>
  )
}

export default page
