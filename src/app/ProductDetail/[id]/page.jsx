"use client"

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Style from './ProductDetails.module.css';
import { toast } from 'react-toastify';
// import Footer from '../Footer/Footer';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header/Header';
import BackButton from '../../components/BackButton/BackButton';
import { globalContext } from '@/Context API/ContextProvider';
import MobileNavBar from '../../components/MobileComp/MobileNavBar';

const ProductDetails = (props) => {
    const id = props.params.id;
    // const router = useRouter();
    // const { id } = router.query;
    const router = useRouter();

    const { setLoading, setCartData } = useContext(globalContext)
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);

    const getImages = (imges) => {
        const imgs = [];
        imges?.forEach((img) => {
            imgs.push({
                original: img,
                thumbnail: img,
            })
        })
        setImages(imgs)
    }

    const getProduct = async () => {
        setLoading(true)
        const { data } = await axios.get(`/api/product/get-one/${id}`, {
            headers: {
                authorization: localStorage.getItem('jwtToken')
            }
        });
        console.log(data)
        getImages(data?.images)
        setProduct(data);
        setLoading(false)
    }

    useEffect(() => {
        getProduct();
    }, [])

    const addToCart = async ()=>{
        setLoading(true);

        try {
            const {data} = await axios.post('/api/cart/add-one', {
                product
            }, {
                headers: {
                    Authorization: localStorage.getItem('jwtToken')
                }
            })

            setCartData(data.products)
            toast.success("Product added into cart")
        } catch (error) {
            router.push('/sign-in')
            toast.error(error.response.data.error);
        }

        setLoading(false)
    }

    return (
        <div className={Style.prDetailsCont}>
            <Header />
            <BackButton path={'/products'} text={'Back to products'} /> 
            <div className={Style.prdDetailWrapper}>
                <button onClick={()=>{router.push('/cart')}} className={Style.btn2}>Buy Now</button>
                <h2>{product.name}</h2>
                <div>
                    <div className={Style.images}>
                        {
                            product &&
                            <ImageGallery items={images}
                                showNav={false} // Hide navigation arrows
                                showFullscreenButton={false} // Hide fullscreen button
                                showPlayButton={true} // Hide play button
                                showBullets={true} // Hide bullets
                                thumbnailClass={Style.thumbnail}
                                originalClass={Style.originalImg}
                            />
                        }
                    </div>
                    <div className={Style.desc}>
                        <h1>{(product?.name)?.split(',')[0]}</h1>
                        <h2 className={Style.prdName}>{product.name}</h2>
                        <h2>Price - ₹ {product.price}</h2>
                        <h3>Category: {product.category}</h3>
                        <ul>
                            <p>About this item</p>
                            {
                                product?.description?.map((item, i)=>(
                                    <li key={i}>{item}</li>
                                ))
                            }
                        </ul>
                        <h4>Available - <span>{product.availability}</span></h4>
                        <button onClick={addToCart} className={Style.btn1}>Add to cart</button>
                        <button onClick={()=>{navigate('/cart')}} className={Style.btn2}>Buy Now</button>
                    </div>
                </div>
            </div>
            {/* <div className='footer'><Footer /></div> */}
            <MobileNavBar />
        </div>
    )
}

export default ProductDetails
