import React, { useState } from 'react'
import { useSetNewPasswordMutation } from '../features/verify-email-reset-password/verify-email-reset-password';
import { useLocation, useNavigate } from 'react-router-dom';
import { showErrorToast } from '../components/utils/ToastUtils';
import { MdiEye, MdiEyeOff } from '../components/others/CustomIcons';

export default function SetNewPassword() {

    const [setNewPassword, { isLoading: isLoadingSetNewPassword }] = useSetNewPasswordMutation();
    const [createNewPassword, setCreateNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const resetPasswordToken = location.state?.resetPasswordToken;

    const isPasswordMatch = (createNewPassword: string, confirmPassword: string) => {
        return createNewPassword === confirmPassword;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isPasswordMatch(createNewPassword, confirmPassword)) {
            showErrorToast('Password does not match');
            return
        }

        if(!resetPasswordToken || !createNewPassword || !confirmPassword) return showErrorToast('All fields are required.');

        try {
            await setNewPassword({
                resetPasswordToken, 
                newPassword: createNewPassword, 
                confirmPassword,
            }).unwrap();
            navigate("/login");
        } catch (error) {
            showErrorToast('Something went wrong. Please try again.');
        }
    };

    return (
        <div className='bg-gradient-to-b from-blue-200 to-white'>
            <div className="flex items-center justify-center w-full h-screen bg-white/70 backdrop-blur-xl shadow-lg">
                <div className="p-4 w-full max-w-sm">
                    <div className="bg-white rounded shadow p-3 space-y-3 lg:p-4">
                        <h3 className="text-lg font-semibold text-center">
                            Forgot your password?
                        </h3>
                        <p className="text-sm text-gray-600 text-center">
                            Please enter your new password.
                        </p>
                        <div className='flex flex-col space-y-2'>
                            <div className='w-full relative'>
                                <input
                                    type={showNewPassword  ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter new password"
                                    value={createNewPassword}
                                    onChange={(e) => setCreateNewPassword(e.target.value)}
                                    className="text-sm w-full p-1.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                    required
                                />
                                <button
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-2 top-1/2 rounded-full p-1 transform -translate-y-1/2 text-gray-600 focus:outline-none hover:bg-gray-200"
                                >
                                    <span>
                                        {createNewPassword.length !== 0 && (
                                            showNewPassword ? <MdiEye/> : <MdiEyeOff/>
                                        )}
                                    </span>
                                </button>
                            </div>
                            <div className='w-full relative'>
                                <input
                                    type={showConfirmPassword  ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="text-sm w-full p-1.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                    required
                                />
                                <button
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-2 top-1/2 rounded-full p-1 transform -translate-y-1/2 text-gray-600 focus:outline-none hover:bg-gray-200"
                                >
                                    <span>
                                        {confirmPassword.length !== 0 && (
                                            showConfirmPassword  ? <MdiEye/> : <MdiEyeOff/>
                                        )}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleSubmit}
                                disabled={createNewPassword === '' || confirmPassword === '' ? true : false}
                                className={`px-6 py-2 w-full text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${
                                    createNewPassword === '' || confirmPassword === '' ? 'opacity-50 cursor-not-allowed' : ''
                                }`}                                  
                            >
                                {isLoadingSetNewPassword ? 'Saving' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
