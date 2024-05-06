"use client";

import React, { useContext, useEffect, useState } from 'react'
import Style from '../sign-up/auth.module.css';
import { globalContext } from '@/Context API/ContextProvider';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useRouter } from "next/navigation";
import Header from '../components/Header/Header';
import MobileNavBar from '../components/MobileComp/MobileNavBar';
import Footer from '../components/Footer/Footer';

const page = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })
    const [errors, setErrors] = useState({
        nameError: '',
        emailError: '',
    })
    const { setLoading, setUserData } = useContext(globalContext)

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            router.push('/sign-in')
        }
    }, [])

    //function to validate all form data
    const validateFormData = () => {
        const err = {
            nameError: '',
            emailError: '',
        }
        let validated = false;

        if (!formData.name) {
            err.nameError = "Name is required!"
        } else if ((formData.name).length < 3) {
            err.nameError = "Name must contain min. 3 characters"
        }

        if (!formData.email) {
            err.emailError = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            err.emailError = "Enter a valid email";
        }


        if (!err.nameError && !err.phoneError && !err.emailError) {
            validated = true;
            setErrors({
                nameError: '',
                emailError: '',
            })
        } else {
            setErrors(err)
        }

        return validated;
    }

    //function to handle input element change state
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    //function to submit the signup form if there is no any error
    const onSubmitFun = async (e) => {
        e.preventDefault();

        setLoading(true)
        if (validateFormData()) {
            try {
                const { data } = await axios.post('/api/user/update-profile', formData, {
                    headers: {
                        authorization: localStorage.getItem('jwtToken')
                    }
                });
                localStorage.setItem('jwtToken', data.jwtToken)
                setUserData(data.user)
                toast.success(data.message);
                router.push('/profile')
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.error);
            }
        }
        setLoading(false)
    }

    return (
        <>
            <Header />
            <div className={Style.authContainer}>
                <h1>Welcome</h1>
                <form onSubmit={onSubmitFun}>
                    <h1>Update User Info</h1>
                    <div>
                        <label htmlFor="name">New name</label>
                        <input id='name' type="text"
                            name='name'
                            onChange={onInputChange}
                            className={errors.nameError ? Style.redBorder : ''}
                        />
                    </div>
                    <div className={Style.error}>
                        {
                            errors.nameError && <p>{errors.nameError}</p>
                        }
                    </div>
                    <div>
                        <label htmlFor="email">New Email id</label>
                        <input id='email' type="text"
                            name='email'
                            onChange={onInputChange}
                            className={errors.emailError ? Style.redBorder : ''}
                        />
                    </div>
                    <div className={Style.error}>
                        {
                            errors.emailError && <p>{errors.emailError}</p>
                        }
                    </div>
                    <button>Update</button>
                </form>
                <Footer />
            </div>
            <MobileNavBar />
        </>
    )
}

export default page
