import React from 'react'
import { Sidebar } from './Sidebar/sidebar'; 
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Profile from '../../../../../assets/images/profile.png'
import { RiLockPasswordFill } from "react-icons/ri";
import { FaKey } from "react-icons/fa";

const profile = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className='bg-white flex-grow p-7'>
		<h1 className='text-2xl font-bold text-center'>Profile</h1>
		<p className='text-md text-gray-500 mb-2 text-center'>Manage your profile</p>
		<hr className='my-5 w-full '/>
		
			<div className="flex items-center justify-center flex-col shadow-md p-10">
				<h1 className='text-2xl font-bold'>Basic Information 👨‍💻</h1>
				<p className='text-md text-gray-500 mb-6'>Tell us your basic information</p>
				<span className='text-gray-500'>Full Name</span>
				<label className="input input-bordered w-full max-w-96 flex items-center gap-2 bg-white border-black mb-4">
					<FaUserAstronaut />
					<input type="text" className="grow" placeholder="Full Name" />
				</label>
				<span className='text-gray-500'>Email Address</span>
				<label className="input input-bordered w-full max-w-96 flex items-center gap-2 bg-white border-black mb-4">
					<MdEmail />
					<input type="text" className="grow" placeholder="Email" />
				</label>
				<span className='text-gray-500'>Change Password</span>
				<label className="input input-bordered w-full max-w-96 flex items-center gap-2 bg-white border-black mb-4">
					<RiLockPasswordFill/>
					<input type="password" className="grow" placeholder="New Password" />
				</label>
				<span className='text-gray-500'>Re-type New Password</span>
				<label className="input input-bordered w-full max-w-96 flex items-center gap-2 bg-white border-black mb-4">
				<FaKey />
					<input type="password" className="grow" placeholder='Confirm New Password' />
				</label>

		<div className="flex items-center justify-center flex-col">
			
		</div>
		<span className='block'>Profile Picture</span>
		<div className="flex items-center my-3">
			<img src={Profile} alt="" className='w-16 h-auto rounded-full mr-2' />
			<button
			className="flex items-center justify-center rounded bg-white border-black border-1 text-black px-8 py-3 text-sm font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
			href="#"
			><IoCloudUploadOutline className='mr-2' /> Upload File
			</button>
		</div>
       
		<button
		className="inline-block rounded bg-black w-full max-w-96 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
		href="#"
		>Update
		</button>
			</div>
			
		
		


      </div>
    </div>
  )
}

export default profile
