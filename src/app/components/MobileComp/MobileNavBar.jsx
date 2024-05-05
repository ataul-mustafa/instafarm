import React, { useContext, useMemo, useState } from 'react'
import Style from './MobileNavBar.module.css'
import { GoHome } from "react-icons/go";
import { MdAddShoppingCart } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { toast } from 'react-toastify';
import { globalContext } from '@/Context API/ContextProvider';
import Link from 'next/link';


const MobileNavBar = () => {
    const { isAuthenticated, setIsAuthenticated, cartData, selectedNav, setSelectedNav } = useContext(globalContext)

    const noOfCartItems = useMemo(() => {
        let no = 0;
        cartData.forEach((data) => {
            console.log()
            no += data.quantity;
        })
        return no;
    }, [cartData])

    const logoutHandler = () => {
        localStorage.clear();
        setIsAuthenticated(false);
        if (isAuthenticated) toast.success('Logged out successfully');
    }

    return (
        <div className={Style.navWrapper}>
            <div className={Style.MobileNavBarCon}>
                <Link
                    onClick={() => { setSelectedNav('home') }}
                    href={'/'}>
                    <div className={selectedNav == 'home' ? Style.curNav : ''}><GoHome /></div>
                    <p>Home</p>
                </Link>
                <Link
                    onClick={() => { setSelectedNav('cart') }}
                    href={'/cart'}>
                    <div className={selectedNav == 'cart' ? Style.curNav : ''}><MdAddShoppingCart /></div>
                    <p>Cart</p>
                    <h2 className={Style.cartNo}><p>{noOfCartItems}</p></h2>
                </Link>
                {
                    isAuthenticated &&
                    <Link
                        onClick={() => { setSelectedNav('invoice') }}
                        href={'/invoice'}>
                        <div className={selectedNav == 'invoice' ? Style.curNav : ''}><LiaFileInvoiceSolid /></div>
                        <p>Invoice</p>
                    </Link>
                }
                <Link
                    onClick={() => {logoutHandler(); setSelectedNav('profile') }}
                    href={isAuthenticated ? '/' : '/sign-in'}>
                    <div className={selectedNav == 'profile' ? Style.curNav : ''}><RxAvatar /></div>
                    {
                        isAuthenticated ?
                            <p>Logout</p> :
                            <p>Login</p>
                    }
                </Link>
            </div>
        </div>
    )
}

export default MobileNavBar
