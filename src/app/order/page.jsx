"use client"

import React, { useContext, useEffect, useMemo, useState } from 'react'
import Style from './Checkout.module.css'
import { useRouter } from 'next/navigation'
import { globalContext } from '@/Context API/ContextProvider'
import Header from '../components/Header/Header'
import BackButton from '../components/BackButton/BackButton'
import MobileNavBar from '../components/MobileComp/MobileNavBar'
import PaymentButton from '../components/PaymentButton/PaymentButton'
import Footer from '../components/Footer/Footer'

const page = () => {
  const router = useRouter();
  const { cartData, userData, setLoading, setCartData } = useContext(globalContext);
  const [curProduct, setCurProduct] = useState({ ...cartData[0]?.product })
  const [checkoutData, setCheckoutData] = useState({
    deliveryAdd: '',
    phone: '',
    products: [],
    totalPrice: '',
    totalAmount: ''
  })


  const cartTotalPrice = useMemo(() => {
    let value = 0;
    cartData.forEach(element => {
      if (element.totalPrice) {
        value += element.totalPrice;
      }
    });
    return value
  }, [cartData])

  useEffect(() => {
    setCheckoutData({ ...checkoutData, products: cartData, totalPrice: cartTotalPrice, totalAmount: cartTotalPrice + 45 })
  }, [])


  return (
    <>
      <Header />
      <BackButton path="/cart" text='Back to cart' />
      <div className={Style.checkoutContainer}>
        <h1>Checkout</h1>
        <div>
          <div className={Style.left}>
            <div>
              <h2>1. Delivery address</h2>
              <div>
                <p>{userData.name}</p>
                <textarea
                  onChange={(e) => { setCheckoutData({ ...checkoutData, deliveryAdd: e.target.value }) }}></textarea>
              </div>
            </div>
            <div>
              <h2>2.Mobile No.</h2>
              <div>
                <input type="phone"
                  onChange={(e) => { setCheckoutData({ ...checkoutData, phone: e.target.value }) }}
                  placeholder='Enter your phone no' />
              </div>
            </div>
            <div>
              <h2>3. Review items and delivery</h2>
              <div>
                <div>
                  {
                    cartData.map((data, i) => (
                      <img key={i}
                        src={data.product.images[0]}
                        onClick={() => { setCurProduct(data.product) }}
                        alt={(data.product.name).split(',')[0]} />
                    ))
                  }
                </div>
                <h1>{(curProduct.name).split(',')[0]}</h1>
                <p>Category: {curProduct.category}</p>
                <p>{curProduct.availability}</p>
                <h2>Estimated delivery : Monday — FREE Standard Delivery</h2>
              </div>
            </div>
            <div>
            <PaymentButton checkoutData={checkoutData} />
              <div>
                <h2>Order Total : ₹{cartTotalPrice + 45}.00 </h2>
              </div>
            </div>
          </div>
          <div className={Style.right}>
            <PaymentButton checkoutData={checkoutData} />
            <h1>Order Summary</h1>
            <h3><span>Items : </span><span>₹{cartTotalPrice}.00</span></h3>
            <h3><span>Delivery :</span><span>₹45.00</span></h3>
            <h2><span>Order Total :</span><span>₹{cartTotalPrice + 45}.00</span></h2>
          </div>
        </div>
      </div>
      <div className='footer'><Footer /></div>
      <MobileNavBar />
    </>
  )
}

export default page
