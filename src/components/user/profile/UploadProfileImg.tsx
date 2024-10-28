import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useUploadProfilePhotoMutation } from '../../../features/users/usersApiSlice';

export default function UploadProfileImg() {
    const [file, setFile] = useState<File | null>(null); // Store the selected file
    const [image, setImage] = useState<string>(''); // Image URL for preview
    const [error, setError] = useState<string | null>(null); // Error state
    const [uploadProfilePhoto, { isLoading }] = useUploadProfilePhotoMutation();

    const previewFiles = (file: File | null) => {
        if (!file) return; // Check if the file is valid
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result as string); // Set image state with the file's data URL
        };
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const selectedFile = e.target.files?.[0] || null; // Get the first selected file or null if none
        setFile(selectedFile); // Set file state
        previewFiles(selectedFile); // Call preview function
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission
        if (file) {
            try { 
                const response = await uploadProfilePhoto({image: image}).unwrap(); // Call the mutation with formData
                console.log("Upload success:", response);
            } catch (err) {
                // console.error("Image upload failed:", err); // Handle upload error
                // setError("Image upload failed. Please try again.");
            } 
        } else {
            // setError("Please select a file before uploading.");
        }
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fileInput">Upload your photo heress</label>
                    <input 
                        type="file"
                        id='fileInput' 
                        onChange={handleChange}
                        required
                        accept='image/png, image/jpeg, image/jpg'
                    />
                    <button className='p-2 bg-gray-200' type="submit" disabled={isLoading}>
                        {isLoading ? 'Uploading...' : 'Submit'}
                    </button>
                </form>
                {error && <p className="text-red-500">Error uploading image: {error}</p>} {/* Error message */}
            </div>
            <div>
                {image && <img src={image} alt="Profile Preview" />} {/* Display image preview if available */}
            </div>
        </>
    );
}
