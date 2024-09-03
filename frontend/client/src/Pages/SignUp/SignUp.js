import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../SignUp/SignUp.css';
import TextField from '@mui/material/TextField';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { signUpUser, LoginUser } from '../../Api/authAPI'; // Import your API function

const SignUp = () => {
    const [showPass, setShowPass] = useState(false);
    const [showPass1, setShowPass1] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        agreeTerm: false,
    });

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (!userData.agreeTerm) {
            alert("You must agree to the terms and conditions.");
            return;
        }

        setShowLoader(true);

        try {
            const result = await signUpUser(userData);
            console.log('User signed up successfully:', result);
            // Handle successful sign-up, e.g., reset form or redirect
            setUserData({
                fname: '',
                lname: '',
                email: '',
                password: '',
                agreeTerm: false
            });
        } catch (error) {
            console.error('Sign up error:', error);
            alert('An error occurred during sign-up. Please try again.');
        } finally {
            setShowLoader(false);
        }
    };

    return (
        <>
            <div className='SignIn'>
                <div className="breadcrumb">
                    <ul className="list list-inline mb-0 flex-row">
                        <li className="list-inline-item">
                            <strong>
                                <Link to="/">Home</Link>
                            </strong>
                        </li>
                        <li className="list-inline-item me-2">
                            <span>→</span>
                        </li>
                        <li className="list-inline-item">
                            <strong>
                                <Link to="#" className="text-capitalize">User</Link>
                            </strong>
                        </li>
                        <li className="list-inline-item me-2">
                            <span>→</span>
                        </li>
                        <li className="list-inline-item">
                            <strong>
                                <Link to="#" className="text-capitalize">Sign Up</Link>
                            </strong>
                        </li>
                    </ul>
                </div>

                <div className='container loginWrapper'>
                    <div className='card shadow'>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={showLoader}
                            className='FormLoader'
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <h3 className='mb-4'>Sign Up</h3>
                        <form onSubmit={handleSignUp}>
                            <div className='form-group mb-4 w-100'>
                                <TextField
                                    id="First_Name"
                                    label="First Name"
                                    name='fname'
                                    value={userData.fname}
                                    onChange={handleFormChange}
                                    className='w-100'
                                />
                            </div>

                            <div className='form-group mb-4 w-100'>
                                <TextField
                                    id="Last_Name"
                                    label="Last Name"
                                    name='lname'
                                    value={userData.lname}
                                    onChange={handleFormChange}
                                    className='w-100'
                                />
                            </div>

                            <div className='form-group mb-4 w-100'>
                                <TextField
                                    id="Email"
                                    label="Email"
                                    type='email'
                                    name='email'
                                    value={userData.email}
                                    onChange={handleFormChange}
                                    className='w-100'
                                />
                            </div>

                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField
                                        id="Password"
                                        name='password'
                                        value={userData.password}
                                        onChange={handleFormChange}
                                        label="Password"
                                        type={showPass ? 'text' : 'password'}
                                        className='w-100'
                                    />
                                    <Button className='icon' onClick={() => setShowPass(!showPass)}>
                                        {showPass ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    </Button>
                                </div>
                            </div>

                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField
                                        id="Confirm_Password"
                                        name='Confirm_pasword'
                                        value={userData.Confirm_pasword}
                                        onChange={handleFormChange}
                                        label="Confirm Password"
                                        type={showPass1 ? 'text' : 'password'}
                                        className='w-100'
                                    />
                                    <Button className='icon' onClick={() => setShowPass1(!showPass1)}>
                                        {showPass1 ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    </Button>
                                </div>
                            </div>

                            <div className='form-group mb-4 w-100'>
                                <label className='d-flex align-items-center'>
                                    <input
                                        type='checkbox'
                                        name='agreeTerm'
                                        checked={userData.agreeTerm}
                                        onChange={handleFormChange}
                                        className='m-2'
                                    />
                                    I agree to the terms and conditions
                                </label>
                            </div>

                            <div className='form-group mb-4 w-100'>
                                <Button
                                    type='submit'
                                    className='btn btn-g btn-lg w-100'
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <p className='text-center'>
                                Already Have An Account <b><Link to={'/signIn'}>Sign In</Link></b>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
