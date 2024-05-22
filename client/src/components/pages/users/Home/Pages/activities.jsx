import React from 'react'
import { Sidebar } from './Sidebar/sidebar'; 

import { FaRegCalendarCheck } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";


const activities = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
    
    <div className='bg-white flex-grow p-7'>
    <header>
      <h1 className='text-4xl font-bold mb-3 '>🤖 Feeding Program</h1>
      <div className="flex items-center justify-start">
        <FaRegCalendarCheck className='text-lg' />
        <p className='text-gray-400 ml-2'>Date Started</p>
        <span className='bg-transparent border-black border p-2 ml-2 rounded-lg'>April 24 2024</span>
      </div>
      <p className='text-xl text-black my-4'>Description</p>
      <p className='text-justify text-gray-400 max-w-screen-2xl'>A feeding program is an organized initiative designed to provide nutritious meals to individuals in need, particularly targeting vulnerable populations such as children, 
        the elderly, and low-income families. These programs aim to address food insecurity and malnutrition by ensuring access to regular, healthy meals. Feeding programs can be implemented 
        in various settings, including schools, community centers, shelters, and through mobile units. They often involve partnerships with government agencies, non-profit organizations, 
        and volunteers. The overarching goals are to improve health outcomes, support educational attainment for children, reduce hunger, and foster a sense of community and well-being 
        among participants.
        </p>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn w-60 my-3 bg-black text-white" onClick={()=>document.getElementById('my_modal_5').showModal()}> Add To Do <IoMdAddCircle /></button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click the button below to close</p>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
            </form>
            </div>
        </div>
        </dialog>
      </header>

      <section className='max-w-7xl mt-1'>
        <div className="flex items-center justify-between p-3">
            <div className="flex items-center justify-center flex-col mr-3">
                <h1>To Do</h1>
                <div className="w-full h-full bg-white border border-black rounded-md p-3 my-2 shadow-md">
                    <p>As a translator, I want integrate Crowdin webhook to notify translators about changed strings</p>
                    <div className="flex items-end justify-end">
                        <button className='text-green-500 mr-2'><FaCheckCircle/></button>
                        <button className='text-red-400'><FaTrash /></button>
                    </div>
                   
                </div>
                <div className="w-full h-full bg-white border border-black rounded-md p-3 my-2 shadow-md">
                    <p>As a translator, I want integrate Crowdin webhook to notify translators about changed strings</p>
                    <div className="flex items-end justify-end">
                        <button className='text-green-500 mr-2'><FaCheckCircle/></button>
                        <button className='text-red-400'><FaTrash /></button>
                    </div>
                   
                </div>
                <div className="w-full h-full bg-white border border-black rounded-md p-3 my-2 shadow-md">
                    <p>As a translator, I want integrate Crowdin webhook to notify translators about changed strings</p>
                    <div className="flex items-end justify-end">
                        <button className='text-green-500 mr-2'><FaCheckCircle/></button>
                        <button className='text-red-400'><FaTrash /></button>
                    </div>
                   
                </div>
            </div>
            <div className="flex items-center justify-center flex-col mr-3 ">
                <h1>On Progress</h1>
                <div className="w-full h-full bg-white border border-black rounded-md p-3 my-2 shadow-md">
                    <p>As a translator, I want integrate Crowdin webhook to notify translators about changed strings</p>
                    <div className="flex items-end justify-end">
                        <button className='text-green-500 mr-2'><FaCheckCircle/></button>
                        <button className='text-red-400'><FaTrash /></button>
                    </div>
                   
                </div>
                <div className="w-full h-full bg-white border border-black rounded-md p-3 my-2 shadow-md">
                    <p>As a translator, I want integrate Crowdin webhook to notify translators about changed strings</p>
                    <div className="flex items-end justify-end">
                        <button className='text-green-500 mr-2'><FaCheckCircle/></button>
                        <button className='text-red-400'><FaTrash /></button>
                    </div>
                   
                </div>
                <div className="w-full h-full bg-white border border-black rounded-md p-3 my-2 shadow-md">
                    <p>As a translator, I want integrate Crowdin webhook to notify translators about changed strings</p>
                    <div className="flex items-end justify-end">
                        <button className='text-green-500 mr-2'><FaCheckCircle/></button>
                        <button className='text-red-400'><FaTrash /></button>
                    </div>
                   
                </div>
            </div>
            <div className="flex items-center justify-center flex-col">
                <h1>Done</h1>
                <div className="w-full h-full bg-white border border-black rounded-md p-3 my-2 shadow-md">
                    <p>As a translator, I want integrate Crowdin webhook to notify translators about changed strings</p>
                    <div className="flex items-end justify-end">
                        <button className='text-green-500 mr-2'><FaCheckCircle/></button>
                        <button className='text-red-400'><FaTrash /></button>
                    </div>
                   
                </div>
                <div className="w-full h-full bg-white border border-black rounded-md p-3 my-2 shadow-md">
                    <p>As a translator, I want integrate Crowdin webhook to notify translators about changed strings</p>
                    <div className="flex items-end justify-end">
                        <button className='text-green-500 mr-2'><FaCheckCircle/></button>
                        <button className='text-red-400'><FaTrash /></button>
                    </div>
                   
                </div>
                <div className="w-full h-full bg-white border border-black rounded-md p-3 my-2 shadow-md">
                    <p>As a translator, I want integrate Crowdin webhook to notify translators about changed strings</p>
                    <div className="flex items-end justify-end">
                        <button className='text-green-500 mr-2'><FaCheckCircle/></button>
                        <button className='text-red-400'><FaTrash /></button>
                    </div>
                   
                </div>
            </div>
        </div>
      </section>
    </div>
    
</div>
)
}

export default activities