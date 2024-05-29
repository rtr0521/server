import React from 'react'
import { TableAdmin } from './Table/tableAdmin'
import { Sidebar } from './Sidebar/sidebar'
const accepted = () => {
  return (
    <div className="flex h-screen">
        <Sidebar />
    <div className=' flex-grow p-7'>
    <header>
                    <div className="flex items-center justify-between">
                        <div className="">
                            <h1 className='text-3xl font-bold mb-2 text-white'>Accepted Account</h1>
                            <p className='text-sm text-gray-500 mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolore minus numquam similique, sit vel consectetur architecto ipsam quidem quibusdam veritatis voluptatem omnis autem a accusamus suscipit molestias veniam nam.</p>
                            <hr className='my-6 text-white'/>
                        </div>
                        <div className="">

                        </div>
                    </div>
                </header>
                <section>
         <TableAdmin/>
        </section>
        </div>
       
        
    </div>
  )
}

export default accepted