import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../components/alert/SuccessAlert";

export default function VerifyEmail() {
    const navigate = useNavigate();
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return; // Allow only numbers

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to the next input if a number is entered
        if (value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
        if (event.key === "Backspace" && code[index] === "") {
            // Move focus to the previous input and delete the value
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
                const newCode = [...code];
                newCode[index - 1] = "";
                setCode(newCode);
            }
        }
    };

    const handleSave = async () => {
        setShowSuccess(true)
    };
    const isCodeComplete = code.every(digit => digit !== "");

    const handleSuccess = () => {
        navigate("/login");
        setShowSuccess(false)
    }

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
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showSuccess && (
                <SuccessAlert
                    message='Congratulations! Your account has been successfully verified. Welcome to Insight Share – the place where ideas, thoughts, and insights are shared with the world.'
                    onConfirm={handleSuccess}
                />
            )}
        </>
    );
}