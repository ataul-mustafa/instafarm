"use client"

import React, { useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Style from './Cart.module.css'
import { PiBag } from "react-icons/pi";
import { useRouter } from 'next/navigation';
import { globalContext } from '@/Context API/ContextProvider';
import Header from '../components/Header/Header';
import BackButton from '../components/BackButton/BackButton';
import MobileNavBar from '../components/MobileComp/MobileNavBar';
import Footer from '../components/Footer/Footer';

const page = () => {
  const router = useRouter()
  const { setLoading, cartData, setCartData, setSelectedNav } = useContext(globalContext)

  const cartTotalPrice = useMemo(() => {
    let value = 0;
    cartData.forEach(element => {
      if (element.totalPrice) {
        value += element.totalPrice;
      }
    });
    return value
  }, [cartData])

  const changeQuanFun = async (quantity, id) => {
    setLoading(true);

    try {
      const { data } = await axios.post('/api/cart/update-quantity', {
        id, quantity
      }, {
        headers: {
          Authorization: localStorage.getItem('jwtToken')
        }
      })
      setCartData(data.products)
    } catch (error) {
      toast.error(error.response.data.error)
    }
    setLoading(false)
  }


  const getCartData = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get('/api/cart/get-all', {
        headers: {
          Authorization: localStorage.getItem('jwtToken')
        }
      })
      setCartData(data.products);
    } catch (error) {
      toast.error(error.response.data.error);
    }

    setLoading(false)
  }

  useEffect(() => {
    setSelectedNav('cart');
    getCartData();
  }, [])

  return (
    <>
      <Header pathName={'Home/ View Cart'} />
      <BackButton path={'/'} text={'Back to products'} />
      {
        cartData.length > 0 ?
          <div className={Style.cartContainer}>
            <div>
              <div className={Style.heading}><PiBag /> My Cart</div>
              <div className={Style.wrapper}>
                <div>
                  <div>
                    {
                      cartData?.map((data, i) => (
                        <div className={Style.top} key={i}>
                          <div><img src={data.product.images[0]} alt={(data.product.name).split(',')[0]} /></div>
                          <div>
                            <h1>{(data.product.name).split(',')[0]}</h1>
                            <p>colour: {data.product.color}</p>
                            <p>{data.product.availability}</p>
                          </div>
                          <div><h1>Price</h1><h1>₹{data.product.price}</h1></div>
                          <div>
                            <label htmlFor="quantity">Kg</label>
                            <select name="quantity" id="quantity" value={data.quantity} onChange={(e) => { changeQuanFun(e.target.value, data.product._id) }}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                          </div>
                          <div><h1>Total</h1><h1>{data.totalPrice}</h1></div>
                        </div>
                      ))
                    }

                  </div>
                  <div>
                    <h2>{cartData.length} Item</h2>
                    <h2>₹{cartTotalPrice}</h2>
                  </div>
                </div>
                <div className={Style.border}></div>
                <div>
                  <h1>PRICE DETAILS</h1>
                  <h2><span>Total MRP</span><span>₹{cartTotalPrice}</span></h2>
                  <h2><span>Discount on MRP</span><span>₹0</span></h2>
                  <h2><span>Convenience Fee</span><span>₹45</span></h2>
                  <div>
                    <h2><span>Total Amount</span><span>₹{cartTotalPrice + 45}</span></h2>
                    <button onClick={() => { router.push('/order') }}>PLACE ORDER</button>
                  </div>
                </div>
              </div>
            </div>
          </div> :
          <h1 className={'noProduct'}>No product in the cart</h1>
      }
      <div className='footer'><Footer /></div>
      <MobileNavBar />
    </>
  )
}

export default page