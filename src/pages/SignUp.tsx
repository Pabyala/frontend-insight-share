import React, { useState } from "react";
import { userGender } from "../data/app-data";
import { Link, useNavigate } from "react-router-dom";
import { MdiEye, MdiEyeOff } from "../components/others/CustomIcons";
import { useSignUpMutation } from "../features/auth/authApiSlice";

export default function SignUp() {

    const [signUp, { isLoading: isLoadingSignUp, isError: isErrorSignUp, error: errorSignUp }] = useSignUpMutation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        gender: "",
        phoneNumber: "",
        dateOfBirth: "",
    });
    const [selectGender, setSelectGender] = useState<string>("--Select--");
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const isPasswordMatch = (password: string, confirmPassword: string) => {
        return password === confirmPassword;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isPasswordMatch(formData.password, confirmPassword)) {
            alert("Password does not match");
        }

        try {
            await signUp(formData).unwrap();
            navigate("/verify-email", { state: { email: formData.email, typeOfCode: 'verify'} });
        } catch (error) {
            console.error("Something went wrong. Please try again.", error);
        }
    };

    const handleGenderSelect = (gender: string) => {
        setSelectGender(gender);
        setFormData({
            ...formData,
            gender: gender,
        });
        setIsSelected(false);
    };

    const handleDateChange = (date: string) => {
        setFormData((prevData) => ({
            ...prevData,
            dateOfBirth: date,
        }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#F0F2F5] pb-5">
            <div className="container mx-auto">
                <div className="bg-white mx-auto p-5 rounded-lg shadow-md max-w-md w-full">
                    <h3 className="text-lg font-bold text-center mb-1">
                        Create a new account
                    </h3>
                    <p className="text-center text-sm text-gray-500 mb-2">
                        It’s quick and easy.
                    </p>
                    <hr className="mb-2" />

                    <form onSubmit={handleSubmit} className="mb-3.5 space-y-3">
                        <div className="flex flex-col space-y-1">
                            {/* Username */}
                            <div className=" flex flex-col justify-between">
                                <p className="text-sm mb-0.5">Username:</p>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="text-sm w-full p-1.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                    required
                                />
                            </div>
                            {/* FirstName and Last */}
                            <div className="flex justify-between space-x-2">
                                <div className="flex flex-col w-full">
                                    <p className="text-sm mb-0.5">First Name:</p>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="text-sm w-full p-1.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <p className="text-sm mb-0.5">Last Name:</p>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="text-sm w-full p-1.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>
                            {/* Bday */}
                            <div className="">
                                <p className="text-sm mb-0.5">Set your date of birth:</p>
                                <input 
                                    className='text-sm w-full p-1.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none'
                                    type="date" 
                                    placeholder='Date'
                                    value={formData.dateOfBirth}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                />
                            </div>
                            {/* Gender */}
                            <div className="">
                                <div className="w-full relative">
                                    <p className="text-sm mb-0.5">Select gender:</p>
                                    <div
                                        className="p-2 flex items-center cursor-pointer border border-gray-300 bg-white rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                        onClick={() => setIsSelected(!isSelected)}
                                    >
                                        <span className="text-sm">{selectGender}</span>
                                    </div>
                                    {isSelected && (
                                        <div className="w-full border border-gray-300 rounded bg-white max-h-40 overflow-auto absolute top-[110%] left-0 z-50">
                                            {userGender.map((gender) => (
                                                <div
                                                    key={gender.id}
                                                    className="px-2 py-1.5 cursor-pointer hover:bg-gray-200 text-sm"
                                                    onClick={() => handleGenderSelect(gender.label)}
                                                >
                                                    {gender.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Email */}
                            <div className=" flex flex-col justify-between">
                                <p className="text-sm mb-0.5">Email:</p>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="text-sm w-full p-1.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                    required
                                />
                            </div>
                            {/* Phone Number */}
                            <div className=" flex flex-col">
                                <p className="text-sm mb-0.5">Phone Number:</p>
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="text-sm w-full p-1.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                    required
                                />
                            </div>
                            {/* Password */}
                            <div className=" flex flex-col">
                                <p className="text-sm mb-0.5">Set Password:</p>
                                <div className="w-full relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                        }
                                        className="text-sm w-full py-1.5 pl-1.5 pr-10 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                        required
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 rounded-full p-1 transform -translate-y-1/2 text-gray-600 focus:outline-none hover:bg-gray-200"
                                    >
                                        <span className="text-base">
                                            {password.length !== 0 && (showPassword ? <MdiEye /> : <MdiEyeOff />)}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            {/* Confirm Password */}
                            <div className=" flex flex-col">
                                <p className="text-sm mb-0.5">Confirm Password:</p>
                                <div className="w-full relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="text-sm w-full py-1.5 pl-1.5 pr-10 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                                        required
                                    />
                                    <button
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-2 top-1/2 rounded-full p-1 transform -translate-y-1/2 text-gray-600 focus:outline-none hover:bg-gray-200"
                                    >
                                        <span className="text-base ">
                                            {confirmPassword.length !== 0 && (showConfirmPassword ? <MdiEye /> : <MdiEyeOff />)}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Terms and Policy */}
                        <div className="flex justify-center items-center">
                            <p className="text-center text-gray-500 text-xs">
                                By clicking Sign Up, you agree to our{" "}
                                <span className="text-blue-600">Terms</span> and{" "}
                                <span className="text-blue-600">Privacy Policy</span>.
                            </p>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="w-full text-sm p-2 rounded font-semibold bg-gray-200 text-slate-700 hover:bg-gray-300 hover:text-black  transition-colors"
                            >
                                {isLoadingSignUp ? "Loading.." : "Sign Up"}
                            </button>
                        </div>
                    </form>
                    {/* Link for SignIn */}
                    <div className="w-full flex justify-center items-center">
                        <Link to="/login" className="text-blue-600 text-center text-sm">
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}