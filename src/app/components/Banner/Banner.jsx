import React from 'react'
import bannerImage from '@/images/hero-image.png'
import Style from './Banner.module.css'
import Image from 'next/image'

const Banner = () => {
    return (
        <div className={Style.bannerContainer}>
            <div>
                <div>Grab upto 50% off on Selected agriculture products <button>Buy Now</button></div>
                <Image src={bannerImage} height={300} alt="banner image" />
            </div>
        </div>
    )
}

export default Banner
