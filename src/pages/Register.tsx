import React, { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        middleName: '',
        lastName: '',
        password: '',
        email: '',
        gender: '',
        phoneNumber: '',
        dateOfBirth: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit the form data to the backend
        console.log(formData);
    };

    return (
        <div className="container flex justify-center items-center min-h-screen bg-[#F0F2F5]">
            <div className="bg-white p-4 rounded-lg shadow-md max-w-md w-full">
                <h1 className="text-lg font-bold text-center mb-1">Sign Up</h1>
                <p className="text-center text-sm text-gray-500 mb-2">
                    It’s quick and easy.
                </p>
                <hr className="mb-2" />

                <form onSubmit={handleSubmit} className=''>
                    <div className="flex space-x-3">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="text-sm w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGray focus:bg-customGray"
                            required
                        />
                        <input
                            type="text"
                            name="middleName"
                            placeholder="Middle Name"
                            onChange={handleChange}
                            className="text-sm w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGray focus:bg-customGray"
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="text-sm w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGray focus:bg-customGray"
                            required
                        />
                    </div>

                    <div className="mb-4 flex justify-between">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {/* <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        /> */}
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                

                
                    <div className='flex justify-between w-full space-x-3'>      
                        <div className="mb-4 w-1/2">
                            <input
                                type="date"
                                name="dateOfBirth"
                                placeholder="Date of Birth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4 w-1/2">
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Select Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>  

                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Set Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Confirm Password"
                            // value={formData.password}
                            // onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    By clicking Sign Up, you agree to our <span className="text-blue-600">Terms</span> and <span className="text-blue-600">Privacy Policy</span>.
                </p>
            </div>
        </div>
    );
}
