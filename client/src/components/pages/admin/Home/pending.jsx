import React from 'react'
import { Sidebar } from './Sidebar/sidebar'
import { TableAdmin } from './Table/tableAdmin'
export const pending = () =>  {
  return (
    <div>
        <div className=" flex h-screen">
            <Sidebar />
            <div className='flex-grow lg:p-7 lg:w-full'>
                <header className='w-96 lg:w-full mt-4 lg:mt-0'>
                    <div className="flex items-center justify-between">
                        <div className="">
                            <h1 className='text-3xl font-bold mb-2 text-white'>Soldier's Account</h1>
                            <p className='text-sm text-gray-500 mb-4'>Manage Soldier's Account</p>
                            <hr className='my-6 text-white w-96'/>
                        </div>
                        <div className="">

                        </div>
                    </div>
                </header>
                <section className='w-96 lg:w-full'>
                    <TableAdmin/>
                </section>
            </div>
        </div>
    </div>
  )
}

export default pending