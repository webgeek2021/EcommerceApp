
import React from 'react'
import { Button, Form, Image } from "react-bootstrap";
import useFetch from "../../utils/Hooks/useFetch"
import { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from "../../assets/Icons/googleIcon.svg"
import { signIn, signInGoogle, signUp, signUpGoogle } from '../../Api/AuthApi/authApi';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc"

const AuthForm = () => {
    const [mode, setMode] = React.useState("signIn");
    const [type, setType] = React.useState("password")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const passwordRef = React.useRef(null)
    const [formvalues, setFormValues] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
        userName: ""
    })

    const handleFormValues = (event) => {
        const { name, value } = event.target;
        setFormValues(values =>
        (
            {
                ...values,
                [name]: value
            }
        )
        )
    }

    // below function is for login 
    const handleAuthSubmit = (event) => {
        event.preventDefault()

        if (formvalues.email !== "" && formvalues.password !== "") {
            const email = formvalues.email
            const password = formvalues.password
            dispatch(signIn({ email, password }, navigate))
        }
        console.log(formvalues)
        setFormValues({
            email: "",
            password: "",
            confirmPassword: "",
            userName: ""
        })
    }
    // below function is for sign in with google outh
    const handleGoogleAuthSuccess = (tokenResponse) => {
        const accessToken = tokenResponse.access_token
        console.log(accessToken)
        dispatch(signInGoogle(accessToken, navigate))
    }
    const loginAuth = useGoogleLogin({ onSuccess: handleGoogleAuthSuccess })

    // below function is for sign up
    const handleSignUp = (event) => {
        event.preventDefault()
        if (formvalues.password !== formvalues.confirmPassword) {
            alert("Password and confirmPassword didnt match")
        }
        else if (formvalues.email !== " " && formvalues.password !== " " && formvalues.confirmPassword !== " " && formvalues.userName !== " " && formvalues.password === formvalues.confirmPassword) {
            // api call for signup
            dispatch(signUp(formvalues, navigate))
        }
        setFormValues({
            email: "",
            password: "",
            confirmPassword: "",
            userName: ""
        })
    }
    const handleGoogleSignUp = (tokenResponse) => {
        const accessToken = tokenResponse.access_token
        console.log(accessToken)
        dispatch(signUpGoogle(accessToken, navigate))
    }
    const signUpAuth = useGoogleLogin({ onSuccess: handleGoogleSignUp })

    return (
        <div className='d-flex flex-column align-items-center justify-content-center vh-100 authForm__container'>
            <Form className='auth__form'  >

                {
                    mode === "signUp" &&
                    <Form.Control
                        type='text'
                        name="userName"
                        value={formvalues.userName}
                        placeholder='Enter Username'
                        onChange={handleFormValues}
                        required
                        className="c-pointer"
                    />
                }
                <Form.Control
                    type='email'
                    name="email"
                    value={formvalues.email}
                    placeholder='Enter Valid Email'
                    onChange={handleFormValues}
                    required
                    className="c-pointer"
                />
                <Form.Control
                    type='password'
                    value={formvalues.password}
                    placeholder='Enter Valid password'
                    onChange={handleFormValues}
                    name="password"
                    required
                    className="c-pointer"
                />
                {mode === "signUp" && <div className='d-flex align-items-center justify-content-between confirm_password_container'>
                    <Form.Control
                        type={type}
                        value={formvalues.confirmPassword}
                        name="confirmPassword"
                        placeholder='Confirm Password'
                        onChange={handleFormValues}
                        required
                        className="c-pointer"
                    />
                    {
                        type === "password" ?
                            <div className='icon-container'>
                                <VscEyeClosed onClick={() => setType("text")} />
                            </div>
                            :
                            <div className='icon-container'>
                                <VscEye onClick={() => setType("password")} />
                            </div>

                    }
                </div>}
                <div className='text-center or-div'>
                    <span>or</span>
                </div>
                <Button className='w-100 c-pointer' onClick={mode === "signIn" ? handleAuthSubmit : handleSignUp}>Submit</Button>
                <Button className='w-100 c-pointer auth-button' onClick={mode === "signIn" ? loginAuth : signUpAuth}>
                    <Image src={GoogleIcon} alt="Google Authentication Button" />
                </Button>
                {mode === "signIn"
                    ?
                    <p onClick={() => setMode("signUp")} className='c-pointer text-center'>
                        Don't Have Account ? SignUp
                    </p>
                    :
                    <p onClick={() => setMode("signIn")} className='c-pointer text-center'>
                        Already Have Account ? SignIn
                    </p>
                }
                <div className="back-btn">
                    <NavLink to={"/"} >Back to Home Page</NavLink>
                </div>
            </Form>
        </div>
    )
}

export default AuthForm