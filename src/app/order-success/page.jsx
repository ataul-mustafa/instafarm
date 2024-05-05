import React from 'react'
import confetti from '@/images/confetti.png'
import Style from './Successfull.module.css'
// import Footer from '../Footer/Footer';
import Logo from '../components/Logo/Logo';
import MobileNavBar from '../components/MobileComp/MobileNavBar';
import Link from 'next/link';

const page = () => {
    return ( 
        <>
            <div className={Style.logo}><Logo /></div>
            <div className={Style.confetti}>
                <div>
                    <img src={confetti} alt="Order placed successfully" />
                    <h1>Order placed successfully</h1>
                    <h3>You will be receiving a confirmation email with order details</h3>
                    <Link href={'/'}>Go back to Home page</Link>
                </div>
            </div>
            {/* <div className='footer'><Footer /></div> */}
            <MobileNavBar />
        </>
    )
}

export default page
