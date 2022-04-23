import React, { useState } from 'react';
import Loginform from '../components/LoginForm';
import Registerform from '../components/RegisterForm';
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/userContext';
import axios from 'axios';

const Loginyregistro = () => {

    const { setUser } = useUser();
    const [errors, setErrors] = useState([]);
    const [errorsR, setErrorsR] = useState([]);
    const navigate = useNavigate();

    const loginUser = (values) => {

        axios.post('/api/login', values)
            .then(res => {
                console.log('Usuario loggueado');
                console.log(res.data);
                axios.get(`/api/user/${res.data._id}`, { withCredentials: true })
                    .then(res => {
                        setUser(res.data);
                        navigate("/pirates");
                    })
                    .catch(err => {
                        console.error(err);
                        return { success: false, data: err.message };
                    })

            })
            .catch(err => {
                console.log(err.response.data);
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }

                setErrors(errorArr);
            })
    }

    const registerUser = user => {
        axios.post('/api/register', user)
            .then(res => {
                console.log(res.data);
                axios.get(`/api/user/${res.data._id}`, { withCredentials: true })
                    .then(res => {
                        setUser(res.data);
                        navigate("/pirates");
                    })
                    .catch(err => {
                        console.error(err);
                        return { success: false, data: err.message };
                    })

            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrorsR(errorArr);
            })
    }


    return (

        <div>
            <div>
                <h1 className='headerh1'>Welcome to Pirate Crew</h1>
            </div>
            <div className='d-flex flex-row border border-black justify-content-center'>
                <div className='d-flex flex-column border border-dark m-5 p-5 bg-white text-dark'>
                    <h3>Register</h3>
                    {errorsR.map((err, index) => <div className="alert alert-danger border border-dark" role="alert">{err}</div>)}
                    <Registerform onSubmitProp={registerUser} iFirstName='' iLastName='' iEmail='' iPassword='' iConfirm='' ></Registerform>

                </div>
                <div className='Login d-flex flex-column border border-dark m-5 p-5 bg-white text-dark'>
                    <h3>Login</h3>
                    {errors.map((err, index) => <div className={`alert alert-danger border border-dark`} role="alert">{err}</div>)}
                    <Loginform onSubmitProp={loginUser}></Loginform>
                </div>


            </div>
        </div>
    );
}

export default Loginyregistro;
