import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import '../auth.css';
import img from '../auth.svg';
import logo from '../logo.svg';

import authAPI from '../../../services/api/authAPI/authAPI';
const Register = () => {
    const [userName,setUserName] = useState();
    const [phone,setPhone] = useState();
    const [pass,setPass] = useState();
    const [confirmPass,setConfirmPass] = useState();

    const [userErr,setUserErr] = useState(false);
    const [phoneErr,setPhoneErr] = useState(false);
    const [passErr,setPassErr] = useState(false);

    const navigate = useNavigate();
    
    // const validate = () => {
    //     if(!userName) return setUserErr(true);
    // }
    const handleSubmit = async() => {
        if(!userName || !phone || !pass) return toast.error('Vui lòng điền đầy đủ thông tin !');
        if(pass !== confirmPass) return toast.error('Mật khẩu không khớp !');;
        
        let result = await authAPI.register({userName,phone,pass});
        if(result){
            toast.success('Đăng ký thành công !');
            return navigate('/login');
        }
        return toast.error('Đăng ký thất bại !');

    };



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
                                Register
                            </div>
                            <div className="des mt-5 flex">
                                <div className="text text-gray-500">
                                    Already have an account?
                                </div>
                                <Link to={'/login'} className='ml-2 text-blue-500 hover:underline transition'>
                                    Login
                                </Link>
                            </div>

                            <div className="form mt-5">
                                <div className='mt-3'>
                                    <TextField 
                                    fullWidth
                                    onChange={(e)=>{setUserName(e.target.value)}}
                                    id="outlined-basic" 
                                    label="Your Name" 
                                    variant="outlined" />
                                </div>
                                <div className='mt-3'>
                                    <TextField 
                                    fullWidth
                                    onChange={(e)=>{setPhone(e.target.value)}}
                                    id="outlined-basic" 
                                    label="Phone" 
                                    variant="outlined" />
                                </div>
                                <div className='mt-3'>
                                    <TextField 
                                    onChange={(e)=>{setPass(e.target.value)}} 
                                    fullWidth
                                    id="outlined-basic" 
                                    label="Pass" 
                                    type='password' 
                                    variant="outlined" />
                                </div>
                                <div className='mt-3'>
                                    <TextField 
                                    onChange={(e)=>{setConfirmPass(e.target.value)}} 
                                    fullWidth
                                    id="outlined-basic" 
                                    label="Confirm Pass" 
                                    type='password' 
                                    variant="outlined" />
                                </div>
                            </div>

                            <div className="action-bottom w-full mt-5">
                                <Button onClick={handleSubmit} variant="contained" className='btn-auth-action pt-4 pb-4' fullWidth>REGISTER</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;