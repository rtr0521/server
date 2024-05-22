import React from 'react'
import { Sidebar } from './Sidebar/sidebar'; 
import Profile from '../../../../../assets/images/profile.png'
import { LineGraph } from '../Charts/line';
import { BarGraph } from '../Charts/bar';

const viewAnalytics = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className='bg-white flex-grow'>
      <section className="bg-white">
        <div className="stats bg-white shadow flex items-center justify-center m-10 p-4">
            
            <div className="stat">
                <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div className="stat-title text-black font-bold">Total Activities</div>
                <div className="stat-value text-primary">5</div>
                <div className="stat-desc text-gray-500">Active Military Progress Activities</div>
            </div>
            
            <div className="stat">
                <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div className="stat-title text-black font-bold">Ongoing Activities</div>
                <div className="stat-value text-yellow-700">2</div>
                <div className="stat-desc text-gray-500">Ongoing Military Progress Activities</div>
            </div>
            
            <div className="stat">
                <div className="stat-figure text-secondary">
                <div className="avatar online">
                    <div className="w-16 rounded-full">
                    <img src={Profile} className="w-16 h-auto rounded-full"alt="" />
                    </div>
                </div>
                </div>
                <div className="stat-value text-black font-bold">86%</div>
                <div className="stat-title text-black ">Tasks done</div>
                <div className="stat-desc text-gray-500">31 tasks remaining</div>
            </div>
    
    </div>
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 p-5 ">
    <div className=" w-full rounded-lg bg-white border border-black p-3 shadow-md lg:col-span-2">
      <LineGraph />
    </div>
    <div className=" w-full rounded-lg bg-white border border-black p-3 shadow-md lg:col-span-2">
      <BarGraph />
    </div>
    </div>
    
    
    
        </section>
      </div>
    </div>
  )
}

export default viewAnalytics
