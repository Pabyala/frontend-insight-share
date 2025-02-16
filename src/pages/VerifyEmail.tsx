import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessAlert from "../components/alert/SuccessAlert";
import { useResendVerificationCodeMutation, useResetPasswordMutation, useVerifyEmailUserMutation, useVerifyTokenResetPassMutation } from "../features/verify-email-reset-password/verify-email-reset-password";
import { FluentColorWarning20, SolarBillCheckBold } from "../components/others/CustomIcons";

export default function VerifyEmail() {

    const [verifyEmail, { isLoading: isLoadingSignUp, isError: isErrorSignUp, error: errorSignUp }] = useVerifyEmailUserMutation();
    const [resendVerificationCode, { isLoading: isLoadingResendVerificationCode, isError: isErrorResendVerificationCode, error: errorResendVerificationCode }] = useResendVerificationCodeMutation();
    const [verifyTokenResetPass, { isLoading: isLoadingVerifyTokenResetPass, isError: isErrorVerifyTokenResetPass, error: errorVerifyTokenResetPass }] = useVerifyTokenResetPassMutation();
    const [resetPassword, { isLoading: isLoadingResetPassword, isError: isErrorResetPassword, error: errorResetPassword }] = useResetPasswordMutation();
    const navigate = useNavigate();
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [typeOfError, setTypeOfError] = useState<string>("");
    const location = useLocation();
    const email = location.state?.email;
    const typeOfCode = location.state?.typeOfCode;
    console.log("EMAIL: ", email)
    console.log("typeOfCode: ", typeOfCode)
    const isCodeComplete = code.every(digit => digit !== "");

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return; // allow only numbers

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // move to the next input if a number is entered
        if (value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
        if (event.key === "Backspace" && code[index] === "") {
            // move focus to the previous input and delete the value
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
                const newCode = [...code];
                newCode[index - 1] = "";
                setCode(newCode);
            }
        }
    };


    const handleSave = async () => {
        const verificationCode = code.join("");
        
        if(verificationCode === '') return alert("Required verification code.")
        try {
            if(typeOfCode === 'verify') {
                await verifyEmail({verificationCode}).unwrap();
                setTypeOfError('success');
                setMessage("Congratulations! Your account has been successfully verified.");
                setShowSuccess(true)
            } else if(typeOfCode === 'reset'){
                await verifyTokenResetPass({verificationCode}).unwrap();
                setTypeOfError('success-reset');
                setMessage("");
                navigate("/set-new-password", { state: { resetPasswordToken: verificationCode } });
            } else if(typeOfCode === 'verifyToLogin') {
                await verifyEmail({verificationCode}).unwrap();
                setTypeOfError('success-home-page');
                setMessage("Congratulations! Your account has been successfully verified.");
                setShowSuccess(true)
            }
        } catch (error: any) {
            const errorMessage = error?.data?.message || "Something went wrong. Please try again.";
            console.log("ERROR: ", errorMessage)
            setTypeOfError('error');
            setMessage(errorMessage);
            setShowSuccess(true)
        }
    };
    

    const handleSuccess = () => {
        if(typeOfError === "success"){
            navigate("/login");
        } else if(typeOfError === 'success-home-page') {
            navigate("/");
        } else if(typeOfError === "error"){
            setShowSuccess(false)
        } else if(typeOfError === 'success-reset') {
            navigate("/set-new-password");
        } else {
            setMessage("Something went wrong.");
        }
        setTypeOfError('');
        setMessage('');
    }

    const handleResendCode = async () => {
        if (!email) {
            alert("Error: Email is required.");
            return;
        }

        try {
            if(typeOfCode === 'verify') {
                await resendVerificationCode({ email }).unwrap();
            } else if(typeOfCode === 'reset'){
                await resetPassword({ email }).unwrap();
                console.log("Sending token for reset password"); 
            } else if(typeOfCode === 'verifyToLogin') {
                await resendVerificationCode({ email }).unwrap();
            }
        } catch (error) {
            console.error("Error resending verification email:", error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center w-full h-screen">
                <div className="p-4 w-full max-w-sm">
                    <div className="bg-white rounded shadow dark:bg-gray-700 p-3 space-y-3 lg:p-4">
                        <h3 className="text-lg font-semibold text-center">Verify Your Email</h3>
                        <p className="text-sm text-gray-600 text-center">
                            Please check your email or spam for the verification code.
                        </p>
                        <div className="flex justify-center space-x-2">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center border rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                                    maxLength={1}
                                    autoComplete="off"
                                />
                            ))}
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={handleSave}
                                disabled={!isCodeComplete}
                                className="px-6 py-2 w-full text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                            >
                                {isLoadingSignUp || isLoadingVerifyTokenResetPass ? "Saving..." : "Save"}
                            </button>
                        </div>
                        <div className="flex justify-center mt-3 space-x-2">
                            <span className="text-sm">Didn't receive the code?</span>
                            <button
                                onClick={handleResendCode}
                                className="text-blue-500 text-sm hover:underline"
                            >
                                {isLoadingResendVerificationCode ? "Resending..." : "Resend"}
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
                    icon={typeOfError === "success" || 'success-reset' ? <SolarBillCheckBold /> : <FluentColorWarning20 />}
                />
            )}
        </>
    );
}