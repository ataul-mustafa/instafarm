import React from 'react'
import Style from './Logo.module.css';
import logo from '@/images/logo.png'
import Image from 'next/image';

const Logo = () => {
  return (
    <div className={Style.logoContainer} >
      {/* <img src={logo} alt="instafarm" /> */}
      <Image src={logo} height={70} width={70} alt='instafarm' />
      <h1>Instafarm</h1>
    </div>
  )
}

export default Logo
