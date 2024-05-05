"use client"
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { MdOutlinePhoneInTalk } from "react-icons/md";
import Style from './Header.module.css'
import Logo from '../Logo/Logo';
import { globalContext } from '@/Context API/ContextProvider';
import { IoCartOutline } from "react-icons/io5";
import { FaSearch } from 'react-icons/fa'; // Import the desired icon component
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();
    const { isAuthenticated, setIsAuthenticated, setSearchValue, setProducts, setProductLoader, cartData, userData } = useContext(globalContext)
    const [name, setName] = useState('A');

    function getFirstLetters(name) {
        const words = name.split(' ');
        let initials = '';
        words.forEach(word => {
            if (word.length > 0) {
                initials += word[0].toUpperCase();
            }
        });
        return initials;
    }

    const noOfCartItems = useMemo(() => {
        let no = 0;
        cartData.forEach((data) => {
            console.log()
            no += data.quantity;
        })
        return no;
    }, [cartData])

    useEffect(() => {
        if (userData.name) {
            setName(getFirstLetters(userData.name));
        }
    }, [userData])

    const logoutHandler = (close) => {
        localStorage.clear();
        setIsAuthenticated(false);
        if (close) {
            close();
        }
        router.push('/')
    }

    const onSearchChange = async (e) => {
        setProductLoader(true);
        try {
            const { data } = await axios.get(`https://musicart-backend-c8rh.onrender.com/api/product/filter?name=${e.target.value}`, {
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

    const inputClickHandler = () => {
        router.push('/')
    }

    return (
        <>
            <div className={Style.wrraper}>
                <div className={Style.logoCart}>
                    <div>
                        <Logo />

                        <div>
                            <Link href={'/'}>Home</Link>
                            <Link href={'/products'}>Products</Link>
                            {
                                isAuthenticated &&
                                <Link href={'/invoice'}>Invoice</Link>
                            }
                        </div>
                    </div>
                    <div>
                        {
                            isAuthenticated && <>
                                <Link href={'/cart'}><IoCartOutline /> View Cart {noOfCartItems}</Link>

                                <Popup
                                    trigger={<div><p>{name}</p></div>}
                                    position="bottom center"
                                    arrow={false}
                                >
                                    {
                                        close => (<div className={Style.profileInfo}>
                                            <h1>{userData.name}</h1>
                                            <button onClick={() => { logoutHandler(close) }}>Logout</button>
                                        </div>)
                                    }
                                </Popup>

                            </>
                            
                        }
                    </div>
                    {
                        !isAuthenticated &&
                        <div className={Style.authButton}>
                                <Link href={'/sign-in'}>Login</Link>
                                <Link href={'/sign-up'}>Sign-up</Link>
                        </div>
                    }
                    <div></div>
                </div>
            </div>

            <div className={Style.mobileHeaderWrapper}>
                <div className={Style.mobileHeader}>
                    <input type="text" onChange={onSearchChange} onClick={inputClickHandler} placeholder='Search Musicart' />
                    <FaSearch />
                </div>
            </div>
        </>
    )
}

export default Header
