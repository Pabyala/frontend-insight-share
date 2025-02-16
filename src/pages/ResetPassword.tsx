import React, { useState } from "react";
import { useResetPasswordMutation } from "../features/verify-email-reset-password/verify-email-reset-password";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../components/alert/SuccessAlert";
import { FluentColorWarning20, SolarBillCheckBold } from "../components/others/CustomIcons";

export default function ResetPassword() {

    const [resetPassword, { isLoading: isLoadingResetPassword, isError: isErrorResetPassword, error: errorResetPassword }] = useResetPasswordMutation();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('')
    const [showSuccess, setShowSuccess] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("");
    const [typeOfError, setTypeOfError] = useState<string>("");

    const handleSendCode = async () => {
        if (!email) {
            alert("Error: Email is required.");
            return;
        }

        try {
            await resetPassword({ email }).unwrap();
            setTypeOfError('successSendEmail')
            setMessage('Congratulations! Your account is verified.')
            // show alert side
        } catch (error: any) {
            console.error("Error resending verification email:", error);
            setMessage(error?.data?.message)
            setTypeOfError('errorSendEmail')
        }
        setShowSuccess(true)
    };

    const handleSuccess = () => {
        if(typeOfError === "successSendEmail"){
            navigate("/verify-email", { state: { email: email, typeOfCode: 'reset' } });
        } else if(typeOfError === "errorSendEmail"){
            setShowSuccess(false)
        } else {
            setMessage("Something went wrong.");
        }
        setTypeOfError('');
        setMessage('');
        
    }

    return (
        <>
            <div className="flex items-center justify-center w-full h-screen">
                <div className="p-4 w-full max-w-sm">
                    <div className="bg-white rounded shadow dark:bg-gray-700 p-3 space-y-3 lg:p-4">
                        <h3 className="text-lg font-semibold text-center">
                            Forgot your password
                        </h3>
                        <p className="text-sm text-gray-600 text-center">
                            Enter your email address, and we'll send you a code to verify that your email is registered.
                        </p>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-sm w-full p-1.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                required
                            />
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleSendCode}
                                className="px-6 py-2 w-full text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                            >
                                { isLoadingResetPassword ? 'Sending' : 'Send' }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showSuccess && (
                <SuccessAlert
                    message={message}
                    onConfirm={handleSuccess}
                    buttonName="OKAY"
                    icon={typeOfError === "successSendEmail" ? <SolarBillCheckBold /> : <FluentColorWarning20 />}
                />
            )}
        </>
    );
}
