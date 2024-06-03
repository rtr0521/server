// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar/sidebar';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FaUserAstronaut, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import DefaultProfileImage from '../../../../../assets/images/profile.png'; // Ensure this path is correct
import axios from 'axios'; // Import axios for making HTTP requests

const Profile = ({ userId }) => {
    const [profile, setProfile] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePicture: DefaultProfileImage,
    });

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/profileSetting/${userId}`);
                const data = response.data;
                if (data) {
                    setProfile({
                        fullname: data.fullname,
                        email: data.email,
                        password: '',
                        confirmPassword: '',
                        profilePicture: data.profilePicture || DefaultProfileImage,
                    });
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        getUser();
    }, [userId]);

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfile((prevProfile) => ({
                    ...prevProfile,
                    profilePicture: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (profile.password !== profile.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const updatedUser = {
                fullname: profile.fullname,
                email: profile.email,
                password: profile.password,
                profilePicture: profile.profilePicture,
            };
            const response = await axios.put(`http://localhost:5000/profileSetting/${userId}`, updatedUser);
            if (response.data) {
                alert("Profile updated successfully!");
            } else {
                alert("Error updating profile.");
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert("Error updating profile.");
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar profilePicture={profile.profilePicture} />
            <div className="flex-grow p-7">
                <h1 className="text-2xl font-bold text-white text-center">Profile</h1>
                <p className="text-md text-gray-500 mb-2 text-center">Manage your profile</p>
                <hr className="my-5 w-full text-white " />

                <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col shadow-md p-10">
                    <h1 className="text-md lg:text-2xl font-bold text-white">Basic Information 👨‍💻</h1>
                    <p className="text-md text-gray-500 mb-6">Tell us your basic information</p>
                    <span className="text-white">Full Name</span>
                    <label className="input input-bordered w-full lg:w-full lg:max-w-96 flex items-center gap-2 border-black mb-4">
                        <FaUserAstronaut />
                        <input type="text" className="grow" placeholder="Full Name" name="fullname" value={profile.fullname} onChange={handleChange} />
                    </label>
                    <span className="text-white">Email Address</span>
                    <label className="input input-bordered w-full max-w-96 flex items-center gap-2 border-black mb-4">
                        <MdEmail />
                        <input type="text" className="grow" placeholder="Email" name="email" value={profile.email} onChange={handleChange} />
                    </label>
                    <span className="text-white">Change Password</span>
                    <label className="input input-bordered w-full max-w-96 flex items-center gap-2 border-black mb-4">
                        <RiLockPasswordFill />
                        <input type="password" className="grow" placeholder="New Password" name="password" value={profile.password} onChange={handleChange} />
                    </label>
                    <span className="text-white">Re-type New Password</span>
                    <label className="input input-bordered w-full max-w-96 flex items-center gap-2 border-black mb-4">
                        <FaKey />
                        <input type="password" className="grow" placeholder="Confirm New Password" name="confirmPassword" value={profile.confirmPassword} onChange={handleChange} />
                    </label>
                    <button className="inline-flex rounded btn btn-primary w-full max-w-96 py-3 text-sm mb-4 font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500" type="submit">
                        Update
                    </button>
                    <hr className="w-full text-white my-2" />
                    <span className="block text-white text-start text-xl font-bold">Upload Profile Picture</span>
                    <div className="flex items-center my-3">
                        <img src={profile.profilePicture} alt="Profile" className="w-16 h-auto rounded-full mr-2" />
                        <label className="btn btn-primary flex items-center justify-center rounded border-black border-1 text-black px-8 py-3 text-sm font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 cursor-pointer">
                            <IoCloudUploadOutline className="mr-2" /> Upload File
                            <input type="file" className="hidden" onChange={handleProfilePictureChange} />
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
