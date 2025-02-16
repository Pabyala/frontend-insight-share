import React, { useState } from 'react'
import { useSetNewPasswordMutation } from '../features/verify-email-reset-password/verify-email-reset-password';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SetNewPassword() {

    const [setNewPassword, { isLoading: isLoadingSetNewPassword, isError: isErrorSetNewPassword, error: errorSetNewPassword }] = useSetNewPasswordMutation();
    const [formData, setFormData] = useState({
        newPassword: "",
    });
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const navigate = useNavigate();
    const location = useLocation();
    const resetPasswordToken = location.state?.resetPasswordToken;
    console.log("Reset Password Token:", resetPasswordToken);

    const isPasswordMatch = (password: string, confirmPassword: string) => {
        return password === confirmPassword;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isPasswordMatch(formData.newPassword, confirmPassword)) {
            alert("Password does not match");
            return
        }

        if(!resetPasswordToken || !formData?.newPassword || !confirmPassword) return alert("Password does not match");

        try {
            await setNewPassword({
                resetPasswordToken, 
                newPassword: formData?.newPassword, 
                confirmPassword,
            }).unwrap();
            navigate("/login");
        } catch (error) {
            console.error("Something went wrong. Please try again.", error);
            alert(error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center w-full h-screen">
                <div className="p-4 w-full max-w-sm">
                    <div className="bg-white rounded shadow dark:bg-gray-700 p-3 space-y-3 lg:p-4">
                        <h3 className="text-lg font-semibold text-center">
                            Forgot your password?
                        </h3>
                        <p className="text-sm text-gray-600 text-center">
                            Please enter your new password.
                        </p>
                        <div className='flex flex-col space-y-2'>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter new password"
                                value={formData.newPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, newPassword: e.target.value })
                                }
                                className="text-sm w-full p-1.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="text-sm w-full p-1.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                required
                            />
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleSubmit}
                                disabled={confirmPassword === '' || formData.newPassword === '' ? true : false}
                                className="px-6 py-2 w-full text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                            >
                                {isLoadingSetNewPassword ? 'Saving' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
