"use client"

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Style from './Products.module.css';
import { MdAddShoppingCart } from 'react-icons/md';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { globalContext } from '@/Context API/ContextProvider';
import SkelatonLoader from '../Loaders/SkelatonLoader';

const FeaturedProducts = () => {
  const { products, setLoading, productLoader, setCartData, prodViewMode } = useContext(globalContext);
  const addToCart = async (product) => {
    setLoading(true);

    try {
      const { data } = await axios.post('/api/cart/add-one', {
        product
      }, {
        headers: {
          Authorization: localStorage.getItem('jwtToken')
        }
      });

      setCartData(data.products);
      toast.success('Product added into cart');
    } catch (error) {
      toast.error(error.response.data.error);
    }

    setLoading(false);
  };


  return (
    <>
      {!productLoader ? (
        <>
        <h1 className={Style.heading}>Featured Products</h1>
          {products.length > 0 ? (
            <>
              
                <div className={Style.productsContainer}>
                  <div>
                    {products.map((product, i) => (
                      <Link href={`ProductDetail/${product._id}`} key={i}>
                        <div>
                          <img src={product.images[0]} alt={(product.name).split(',')[0]} />
                          <MdAddShoppingCart onClick={() => { addToCart(product) }} className={Style.cartIcon} />
                        </div>
                        <h2>{(product.name).split(',')[0]}</h2>
                        <h3>Price - ₹ {product.price}</h3>
                        <h3>{`${product.category} | ${product.availability}`}</h3>
                      </Link>
                    ))}
                  </div>
                </div>
            </>
          ) : (
            <div className={Style.noProducts}>No products found</div>
          )}
          {/* <Footer /> */}
        </>
      ) : (
        <SkelatonLoader />
      )}
    </>
  );
};

export default FeaturedProducts;