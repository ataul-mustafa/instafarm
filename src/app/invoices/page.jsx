"use client";

import React, { useContext, useEffect, useMemo, useState } from 'react'
import Style from './invoice.module.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import Header from '../components/Header/Header'
import Link from 'next/link'
import { globalContext } from '@/Context API/ContextProvider'
import BackButton from '../components/BackButton/BackButton'
import MobileNavBar from '../components/MobileComp/MobileNavBar'
import { RiFileEditFill } from "react-icons/ri";
import Footer from '../components/Footer/Footer';


const page = () => {

    const { setSelectedNav, setInvoiceDetail, setLoading } = useContext(globalContext);
    const [invoiceData, setInvoiceData] = useState([])

    const getInvoiceData = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get('/api/order', {
                headers: {
                    Authorization: localStorage.getItem('jwtToken')
                }
            })
            setInvoiceData(data.invoices)
        } catch (error) {
            toast.error(error.response.data.error)
        }
        setLoading(false)
    }

    useEffect(() => {
        setSelectedNav('invoice')
        getInvoiceData()
    }, [])

    return (
        <>
            <Header pathName={'Home/ invoice'} />
            <BackButton path={'/'} text={'Back to Home'} />
            {
                invoiceData.length > 0 ?
                    <div className={Style.invoiceContainer}>
                        <h1><RiFileEditFill className={Style.headIcon} />My Invoices</h1>
                        <div>
                            {
                                invoiceData?.map((invoice, i) => (
                                    <div key={i}>
                                        <div>
                                            <RiFileEditFill className={Style.docIcon} />
                                            <div>
                                                <h2>{invoice.deliveryAddress.name}</h2>
                                                <h3>{invoice.deliveryAddress.address}</h3>
                                            </div>
                                        </div>
                                        <Link onClick={() => { setInvoiceDetail(invoice) }} href={`/invoice-detail`}>View Invoice</Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div> :
                    <h1 className='noProduct'>No invoice found</h1>
            }
            <div className='footer'><Footer /></div>
            <MobileNavBar />
        </>
    )
}

export default page
