import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import '../auth.css';
import img from '../auth.svg';
import logo from '../logo.svg';
import authAPI from '../../../services/api/authAPI/authAPI';
const Login = () => {
    const [phone,setPhone] = useState();
    const [pass,setPass] = useState();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if(!phone || !pass) return toast.error('Vui lòng nhập đầy đủ thông tin !');
        const result = await authAPI.login({phone: phone, pass: pass});
        if(result) {
            toast.success('Đăng nhập thành công !');
            return navigate('/');
        }
    }
    return (
        <div id='login' className='auth relative'>
            <div className="container-login flex w-full">
                <div className="img-left hidden lg:block w-5/12">
                    <img src={img} alt="" />
                </div>

                <div className="form-right w-full lg:w-7/12  h-screen">
                    <div className="logo absolute">
                        <img src={logo} alt="" />
                    </div>

                    <div className="content-form w-full flex justify-center mt-20 h-full">
                        <div className="container-form w-full md:w-6/12 p-5 md:p-0">
                            <div className='title-big text-4xl font-medium'>
                                Login
                            </div>
                            <div className="des mt-5 flex">
                                <div className="text text-gray-500">
                                    Don't have an account? 
                                </div>
                                <Link to={'/register'} className='ml-2 text-blue-500 hover:underline transition'>
                                    Register
                                </Link>
                            </div>

                            <div className="form mt-5">
                                <div className='mt-3'>
                                    <TextField 
                                    fullWidth
                                    onChange={(e)=> {setPhone(e.target.value)}}
                                    id="outlined-basic" 
                                    label="Phone" 
                                    variant="outlined" />
                                </div>
                                <div className='mt-3'>
                                    <TextField 
                                    fullWidth
                                    onChange={(e) => {setPass(e.target.value)}}
                                    id="outlined-basic" 
                                    label="Pass" 
                                    type='password' 
                                    variant="outlined" />
                                </div>
                            </div>

                            <div className="action-bottom w-full mt-5">
                                <Button 
                                onClick={handleLogin}
                                variant="contained" 
                                className='btn-auth-action pt-4 pb-4' fullWidth>Login</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;