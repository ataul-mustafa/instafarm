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
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })
    const [errors, setErrors] = useState({
        oldPasswordError: '',
        newPasswordError: '',
        confirmNewPasswordError: '',
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
            oldPasswordError: '',
            newPasswordError: '',
            confirmNewPasswordError: '',
        }
        let validated = false;

        if (!formData.oldPassword) {
            err.oldPasswordError = "Old Password is required!"
        }

        if (!formData.newPassword) {
            err.newPasswordError = "NEw Password is required!"
        } else if ((formData.newPassword).length < 6) {
            err.nameError = "Password is weak"
        }

        if (!formData.confirmNewPassword) {
            err.oldPasswordError = "Confirm Password is required!"
        } else if ((formData.confirmNewPassword).length < 6) {
            err.nameError = "Password is weak"
        } else if ((formData.confirmNewPassword) !== (formData.newPassword)) {
            err.nameError = "New Password and confirm password not matching"
        }



        if (!err.oldPasswordError && !err.newPasswordError && !err.confirmNewPasswordError) {
            validated = true;
            setErrors({
                oldPasswordError: '',
                newPasswordError: '',
                confirmNewPasswordError: '',
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
                const { data } = await axios.post('/api/user/update-password', formData, {
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
                    <h1>Update Password</h1>
                    <div>
                        <label htmlFor="name">Old Password</label>
                        <input id='name' type="text"
                            name='oldPassword'
                            onChange={onInputChange}
                            className={errors.oldPasswordError ? Style.redBorder : ''}
                        />
                    </div>
                    <div className={Style.error}>
                        {
                            errors.oldPasswordError && <p>{errors.oldPasswordError}</p>
                        }
                    </div>
                    <div>
                        <label htmlFor="newPassword">New Password</label>
                        <input id='newPassword' type="password"
                            name='newPassword'
                            onChange={onInputChange}
                            className={errors.newPasswordError ? Style.redBorder : ''}
                        />
                    </div>
                    <div className={Style.error}>
                        {
                            errors.newPasswordError && <p>{errors.newPasswordError}</p>
                        }
                    </div>

                    <div>
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                        <input id='confirmNewPassword' type="password"
                            name='confirmNewPassword'
                            onChange={onInputChange}
                            className={errors.confirmNewPasswordError ? Style.redBorder : ''}
                        />
                    </div>
                    <div className={Style.error}>
                        {
                            errors.confirmNewPasswordError && <p>{errors.confirmNewPasswordError}</p>
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
