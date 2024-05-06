"use client"

import React, { useContext, useEffect, useMemo, useState } from 'react'
import Style from '../order/Checkout.module.css'
import Header from '../components/Header/Header'
import { globalContext } from '@/Context API/ContextProvider'
import BackButton from '../components/BackButton/BackButton'
import MobileNavBar from '../components/MobileComp/MobileNavBar'
import Footer from '../components/Footer/Footer'

const page = () => {
    const { invoiceDetail } = useContext(globalContext);
    const [curProduct, setCurProduct] = useState({ ...invoiceDetail?.products[0]?.product })

    const cartTotalPrice = useMemo(() => {
        let value = 0;
        invoiceDetail?.products?.forEach(element => {
          if (element.totalPrice) {
            value += element.totalPrice;
          }
        });
        return value
      }, [invoiceDetail])

  return (
    <>
      <Header />
      <BackButton path={'/invoices'} text={'Back to Invoices'} />
      <div className={Style.checkoutContainer}> 
        <h1>Invoice</h1>
        <div>
          <div className={Style.left}>
            <div>
              <h2>1. Delivery address</h2>
              <div>
                <p>{invoiceDetail?.deliveryAddress?.name}</p>
                <textarea value={invoiceDetail?.deliveryAddress?.address} readOnly></textarea>
              </div>
            </div>
            <div>
              <h2>2. Payment method</h2>
              <div>
                <input type="phone" value={invoiceDetail?.phone} readOnly />
              </div>
            </div>
            <div>
              <h2>3. Review items and delivery</h2>
              <div>
                <div>
                  {
                    invoiceDetail?.products?.map((data, i) => (
                      <img key={i} src={data.product.images[0]} onClick={() => { setCurProduct(data.product) }} alt={(data.product.name).split(',')[0]} />
                    ))
                  }
                </div>
                <h1>{(curProduct.name).split(',')[0]}</h1>
                <p>category: {curProduct.category}</p>
                <h2>Estimated delivery : Monday — FREE Standard Delivery</h2>
                <h2>Pre-paid</h2>
              </div>
            </div>
          </div>
          <div className={Style.right}>
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
