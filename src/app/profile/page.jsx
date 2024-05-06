"use client"
import { globalContext } from '@/Context API/ContextProvider'
import React, { useContext } from 'react'
import Header from '../components/Header/Header'
import Link from 'next/link'
import Style from './profile.module.css'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Footer from '../components/Footer/Footer'

const page = () => {
    const router = useRouter();
    const { userData, setUserData, setIsAuthenticated } = useContext(globalContext)

    const logoutHandler =() =>{
        localStorage.clear('jwtToken');
        setUserData({});
        setIsAuthenticated(false)
        router.push('/')
        toast.success("Logged out successfully")
    }

    return (
        <>
            <Header />
            <div className={Style.profileCont}>
                <div><h1>{userData.name}</h1></div>
                <div className={Style.profileInfo}>
                    <div>
                        <div>
                            <label>Name:</label>
                            <h2>{userData.name}</h2>
                        </div>
                        <div>
                            <label>Email:</label>
                            <h2>{userData.email}</h2>
                        </div>
                        <div>
                        <label
                        style={{cursor: 'pointer'}}
                         onClick={logoutHandler}>Logout</label>
                        </div>
                    </div>
                    <div>
                        <Link href={'/update-profile'}>Update Profile</Link>
                        <Link href={'/update-password'}>Update Password</Link>
                    </div>
                </div>
            </div>
            <div className='footer'><Footer /></div>
        </>
    )
}

export default page
