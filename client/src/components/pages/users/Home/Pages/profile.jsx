import React, { useState } from 'react';
import { Sidebar } from './Sidebar/sidebar';
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaKey } from "react-icons/fa";
import DefaultProfileImage from '../../../../../assets/images/profile.png'; // Ensure this path is correct

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState(DefaultProfileImage);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar profilePicture={profilePicture} />
      <div className='flex-grow p-7'>
        <h1 className='text-2xl font-bold text-white text-center'>Profile</h1>
        <p className='text-md text-gray-500 mb-2 text-center'>Manage your profile</p>
        <hr className='my-5 w-full text-white '/>
        
        <div className="flex items-center justify-center flex-col shadow-md p-10">
          <h1 className='text-2xl font-bold text-white'>Basic Information 👨‍💻</h1>
          <p className='text-md text-gray-500 mb-6'>Tell us your basic information</p>
          <span className='text-white'>Full Name</span>
          <label className="input input-bordered w-full max-w-96 flex items-center gap-2 border-black mb-4">
            <FaUserAstronaut />
            <input type="text" className="grow" placeholder="Full Name" />
          </label>
          <span className='text-white'>Email Address</span>
          <label className="input input-bordered w-full max-w-96 flex items-center gap-2 border-black mb-4">
            <MdEmail />
            <input type="text" className="grow" placeholder="Email" />
          </label>
          <span className='text-white'>Change Password</span>
          <label className="input input-bordered w-full max-w-96 flex items-center gap-2 border-black mb-4">
            <RiLockPasswordFill/>
            <input type="password" className="grow" placeholder="New Password" />
          </label>
          <span className='text-white'>Re-type New Password</span>
          <label className="input input-bordered w-full max-w-96 flex items-center gap-2 border-black mb-4">
            <FaKey />
            <input type="password" className="grow" placeholder='Confirm New Password' />
          </label>
		  <button className="inline-flex rounded btn btn-primary w-full max-w-96 py-3 text-sm  mb-4 font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500">
            Update
          </button>
		  <hr className='w-full text-white my-2'/>
          <span className='block text-white text-start text-xl font-bold'>Upload Profile Picture</span>
          <div className="flex items-center my-3">
            <img src={profilePicture} alt="Profile" className='w-16 h-auto rounded-full mr-2' />
            <label className="btn btn-primary flex items-center justify-center rounded border-black border-1 text-black px-8 py-3 text-sm font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500 cursor-pointer">
              <IoCloudUploadOutline className='mr-2' /> Upload File
              <input type="file" className="hidden" onChange={handleProfilePictureChange} />
            </label>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Profile;
