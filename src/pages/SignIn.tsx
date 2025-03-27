import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdiEye, MdiEyeOff } from '../components/others/CustomIcons';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials, setUserDetails } from '../features/auth/authSlice';
import usePersist from '../hooks/usePersist';
import { useResendVerificationCodeMutation } from '../features/verify-email-reset-password/verify-email-reset-password';

export default function SignIn() {

    const [resendVerificationCode, { isLoading: isLoadingResendVerificationCode, isError: isErrorResendVerificationCode, error: errorResendVerificationCode }] = useResendVerificationCodeMutation();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [disableBtn, setDisableBtn] = useState<boolean>(true);
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const location = useLocation();
    const [persist, setPersist] = usePersist();
    
    const handleToggleCheck = () => setPersist(prev => !prev)

    const from = location.state?.from?.pathname || '/'; 
    const handleSubmit = async () => {
        if(email === '' || password === '') return alert('Email and password required')
        try {
            const userData = await login({email, password}).unwrap()
            dispatch(setCredentials({ 
                email: userData.email, 
                accessToken: userData.accessToken,
                id: userData._id
            }));

            // store the full user data in Redux once available
            if (userData) {
                dispatch(setUserDetails(userData));
            }

            setEmail('');
            setPassword('')
            if(!userData.isVerified) {
                await resendVerificationCode({ email }).unwrap();
                navigate('/verify-email', { state: { email: email, typeOfCode: 'verifyToLogin' } });
                return
            }
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        if(email.length === 0 || password.length === 0) {
            setDisableBtn(true)
        } else {
            setDisableBtn(false)
        }
    }, [email, password])

    return (
        <div className='bg-gradient-to-b from-blue-200 to-white'>
            <div className="w-full flex flex-col items-center justify-center min-h-screen  pb-5 bg-white/70 backdrop-blur-xl shadow-lg">
                <div className='container mx-auto'>
                    <div className="w-full flex flex-col justify-center mb-8">
                        <h2 className="text-2xl text-center font-bold text-blue-600 lg:text-3xl lg:mb-1">Insight Share</h2>
                        <p className="text-base text-gray-600 w-f text-center">
                            Connect with friends and the world around you on Insight Share.
                        </p>
                    </div>

                    <div className="bg-white mx-auto p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                        <input
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email or Phone Number"
                            className="text-sm w-full p-2.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                        />
                        <div className='w-full relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="text-sm w-full p-2.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 rounded-full p-1 transform -translate-y-1/2 text-gray-600 focus:outline-none hover:bg-gray-200"
                            >
                                <span>
                                    {password.length !== 0 && (
                                        showPassword ? <MdiEye/> : <MdiEyeOff/>
                                    )}
                                </span>
                            </button>
                        </div>
                        <button 
                            onClick={handleSubmit}
                            disabled={disableBtn}
                            // Log In
                            className={`w-full text-sm font-semibold rounded p-2.5 ${disableBtn || isLoading ? 'cursor-not-allowed' : ''} bg-gray-200 text-slate-700 hover:bg-gray-300 hover:text-black transition-colors`}>
                            {isLoading || isLoadingResendVerificationCode ? 'Logging in...' : 'Log In'}
                        </button>

                        <div className="text-center mt-4">
                            <Link to='/reset-password-verify' className="text-blue-600 cursor-pointer text-sm">Forgot Password?</Link>
                        </div>
                        <label htmlFor="persist">
                            <input 
                                type="checkbox" 
                                className='form_checkbox'
                                id='persist'
                                onChange={handleToggleCheck}
                                checked={persist}
                            />
                        </label>

                        <hr className="my-6" />

                        <div className='flex justify-center items-center text-center'>
                            <Link 
                                to='/register' 
                                className="w-full text-sm bg-green-500 text-white p-2.5 rounded font-semibold hover:bg-green-600 hover:text-white transition-colors">
                                Create New Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
