"use client";

import React, { useContext, useEffect, useState } from 'react'
import Style from './auth.module.css';
import { globalContext } from '@/Context API/ContextProvider';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useRouter } from "next/navigation";
import Link from 'next/link';

const page = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        nameError: '',
        emailError: '',
        passwordError: '',
    })
    const { setLoading, setIsAuthenticated } = useContext(globalContext)

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            router.push('/')
        }
    }, [])

    //function to validate all form data
    const validateFormData = () => {
        const err = {
            nameError: '',
            emailError: '',
            passwordError: '',
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

        if (!formData.password) {
            err.passwordError = "Password is required";
        } else if ((formData.password).length < 6) {
            err.passwordError = "Password must contains min. 6 characters"
        }

        if (!err.nameError && !err.phoneError && !err.emailError && !err.passwordError) {
            validated = true;
            setErrors({
                nameError: '',
                emailError: '',
                passwordError: '',
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
                const { data } = await axios.post('/api/user/signup', formData);
                localStorage.setItem('jwtToken', data.jwtToken)
                setIsAuthenticated(true)
                toast.success(data.message);
                 router.push('/')
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
        setLoading(false)
    }

    return (
        <>
            <div className={Style.authContainer}>
                <div className={Style.logo}>
                    {/* <Logo /> */}
                </div>
                <h1>Welcome</h1>
                <form onSubmit={onSubmitFun}>
                    <h1>Create Account <span>Don’t have an account?</span></h1>
                    <div>
                        <label htmlFor="name">Your name</label>
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
                        <label htmlFor="email">Email id</label>
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
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id='password' type="password"
                            name='password'
                            onChange={onInputChange}
                            className={errors.passwordError ? Style.redBorder : ''}
                        />
                    </div>
                    <div className={Style.error}>
                        {
                            errors.passwordError && <p>{errors.passwordError}</p>
                        }
                    </div>
                    <button>Continue</button>
                </form>
                <div className={Style.link}>
                    Already have an account? <Link href={'/sign-in'}> Sign in</Link>
                </div>
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default page
