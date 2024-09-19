import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../SignIn/SignIn.css';
import TextField from '@mui/material/TextField';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Button } from '@mui/material';
import GooglePic from '../../assets/Images/google.png';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { LoginUser } from '../../Api/authAPI'; // Import your API function
import { MyContext } from '../../App';

const SignIn = () => {
    const [showPass, setShowPass] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        agreeTerm: false,
    });

    const context = useContext(MyContext);
    const navigate = useNavigate();

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSignIn = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (!userData.agreeTerm) {
            alert("You must agree to the terms and conditions.");
            return;
        }

        setShowLoader(true);

        try {
            const result = await LoginUser(userData);
            console.log('User signed in successfully:', result);
            // Handle successful sign-in, e.g., set user state, redirect
            localStorage.setItem('isLogin', true);
            localStorage.setItem("firstName", result.data.fname);
            localStorage.setItem("lastName", result.data.lname);
            localStorage.setItem("UserId", result.data.id);
            context.signIn();
            navigate('/');
        } catch (error) {
            console.error('Sign in error:', error);
            alert('An error occurred during sign-in. Please try again.');
        } finally {
            setShowLoader(false);
        }
    };

    return (
        <>
            <div className='SignIn'>
                <div className="breadcrumb res-hide">
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
                                <Link to="#" className="text-capitalize">Sign In</Link>
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

                        <h3 className='mb-4'>Sign In</h3>
                        <form onSubmit={handleSignIn}>
                            <div className='form-group mb-4 w-100'>
                                <TextField
                                    id="Email"
                                    label="Email"
                                    type='email'
                                    className='w-100'
                                    name='email'
                                    onChange={handleFormChange}
                                    value={userData.email}
                                />
                            </div>

                            <div className='form-group mb-4 w-100'>
                                <div className='position-relative'>
                                    <TextField
                                        id="Password"
                                        label="Password"
                                        name='password'
                                        type={showPass ? 'text' : 'password'}
                                        className='w-100'
                                        onChange={handleFormChange}
                                        value={userData.password}
                                    />
                                    <Button className='icon' onClick={() => setShowPass(!showPass)}>
                                        {showPass ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
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
                                    Sign In
                                </Button>
                            </div>

                            <div className='form-group mb-4 w-100 SignInOr'>
                                <p className='text-center'>OR</p>
                                <Button
                                    className='btn w-100'
                                    variant='outlined'
                                    onClick={() => alert('Google Sign-In not implemented')}
                                >
                                    <img src={GooglePic} alt='Google logo' /> Sign In With Google
                                </Button>
                            </div>

                            <p className='text-center'>
                                Do Not Have An Account <b><Link to={'/SignUp'}>Sign Up</Link></b>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
