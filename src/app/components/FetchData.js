"use client"

import { globalContext } from '@/Context API/ContextProvider'
import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import Loader from './Loaders/Loader'
import { toast } from 'react-toastify'


const FetchData = () => {
  const { loading, setLoading, isAuthenticated, setIsAuthenticated, setCartData, setUserData, setProductLoader, setProducts } = useContext(globalContext)

  const loadUser = async () => {
    setLoading(true);

    try {
      const user = await axios.get('/api/user/load-user', {
        headers: {
          Authorization: localStorage.getItem('jwtToken')
        }
      })
      setUserData(user.data.user);

      const { data } = await axios.get('/api/cart/get-all', {
        headers: {
          Authorization: localStorage.getItem('jwtToken')
        }
      })
      setCartData(data.products);
    } catch (error) {
      toast.error(error.response.data.error); 
    }
    setLoading(false)
  }

  const getProducts = async () => {
    setProductLoader(true)
    const { data } = await axios.get('/api/product/get-all', {
      headers: {
        authorization: localStorage.getItem('jwtToken')
      }
    });
    setProducts(data);
    setProductLoader(false)
  }


  useEffect(() => {
    loadUser()
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
    getProducts()
  }, [isAuthenticated])

  return (
    <>          
    {loading && <Loader />}
    </>
  )
}

export default FetchData
