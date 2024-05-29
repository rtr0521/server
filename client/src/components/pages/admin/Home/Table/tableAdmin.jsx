import React from 'react'
import { GoDotFill } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";


export const TableAdmin = () => {
    return(
        <div className="overflow-x-auto mt-12 shadow-md">
				<table className="min-w-full divide-y-2 divide-gray-200 bg-dark rounded-md text-sm">
				<thead className="ltr:text-left rtl:text-right">
					<tr>
					<th className="px-4 py-6">
						<label htmlFor="SelectAll" className="sr-only">Select All</label>
						<input type="checkbox" id="SelectAll" className="size-5 rounded border-gray-300" />
					</th>
					<th className="whitespace-nowrap px-4 py-2 font-bold text-center  text-white">Platoon Name</th>
					<th className="whitespace-nowrap px-4 py-2 font-bold text-center  text-white">Status</th>
					<th className="whitespace-nowrap px-4 py-2 font-bold text-center text-white">Email Address</th>
					<th className="whitespace-nowrap px-4 py-2 font-bold  text-white">Approval</th>
					<th className="whitespace-nowrap px-4 py-2 font-bold  text-white" >Edit</th>
					<th className="whitespace-nowrap px-4 py-2 font-bold  text-white">Delete</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					<tr>
					<td className="px-4 py-6 ">
						<label className="sr-only" htmlFor="Row1">Row 1</label>
						<input className="size-5 rounded border-gray-300" type="checkbox" id="Row1" />
					</td>
						<td className="whitespace-nowrap px-4 py-2 text-center font-medium text-white">Platoon</td>
						<td className="whitespace-nowrap px-4 py-2 flex items-center justify-center mt-3">
							<div className="flex items-center justify-center text-center bg-yellow-100 rounded-full w-24 text-yellow-500"> <GoDotFill /> Pending</div>
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-white text-center">platoongmail@gmail.com</td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-green-700"><FaCheck /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-yellow-700"><IoEye /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-red-700"><FaRegTrashCan /></td>
					</tr>
	
					<tr>
					<td className="px-4 py-6">
						<label className="sr-only" htmlFor="Row2">Row 2</label>
						<input className="size-5 rounded border-gray-300" type="checkbox" id="Row2" />
					</td>
					<td className="whitespace-nowrap px-4 py-2 text-center font-medium text-white">Platoon</td>
						<td className="whitespace-nowrap px-4 py-2 flex items-center justify-center mt-3">
							<div className="flex items-center justify-center text-center bg-yellow-100 rounded-full w-24 text-yellow-500"> <GoDotFill /> Pending</div>
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-white text-center">platoongmail@gmail.com</td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-green-700"><FaCheck /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-yellow-700"><IoEye /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-red-700"><FaRegTrashCan /></td>
					</tr>
	
					<tr>
					<td className="px-4 py-6">
						<label className="sr-only" htmlFor="Row3">Row 3</label>
						<input className="size-5 rounded border-gray-300" type="checkbox" id="Row3" />
					</td>
					<td className="whitespace-nowrap px-4 py-2 text-center font-medium text-white">Platoon</td>
						<td className="whitespace-nowrap px-4 py-2 flex items-center justify-center mt-3">
							<div className="flex items-center justify-center text-center bg-yellow-100 rounded-full w-24 text-yellow-500"> <GoDotFill /> Pending</div>
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-white text-center">platoongmail@gmail.com</td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-green-700"><FaCheck /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-yellow-700"><IoEye /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-red-700"><FaRegTrashCan /></td>
					</tr>
	
					<tr>
					<td className="px-4 py-6">
						<label className="sr-only" htmlFor="Row3">Row 3</label>
						<input className="size-5 rounded border-gray-300" type="checkbox" id="Row3" />
					</td>
					<td className="whitespace-nowrap px-4 py-2 text-center font-medium text-white">Platoon</td>
						<td className="whitespace-nowrap px-4 py-2 flex items-center justify-center mt-3">
							<div className="flex items-center justify-center text-center bg-yellow-100 rounded-full w-24 text-yellow-500"> <GoDotFill /> Pending</div>
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-white text-center">platoongmail@gmail.com</td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-green-700"><FaCheck /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-yellow-700"><IoEye /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-red-700"><FaRegTrashCan /></td>
					</tr>
	
					<tr>
					<td className="px-4 py-6">
						<label className="sr-only" htmlFor="Row3">Row 3</label>
						<input className="size-5 rounded border-gray-300 " type="checkbox" id="Row3" />
					</td>
					<td className="whitespace-nowrap px-4 py-2 text-center font-medium text-white">Platoon</td>
						<td className="whitespace-nowrap px-4 py-2 flex items-center justify-center mt-3">
							<div className="flex items-center justify-center text-center bg-yellow-100 rounded-full w-24 text-yellow-500"> <GoDotFill /> Pending</div>
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-white text-center">platoongmail@gmail.com</td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-green-700"><FaCheck /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-yellow-700"><IoEye /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-red-700"><FaRegTrashCan /></td>
					</tr>
	
					<tr>
					<td className="px-4 py-6 ">
						<label className="sr-only" htmlFor="Row3">Row 3</label>
						<input className="size-5 rounded border-gray-300" type="checkbox" id="Row3" />
					</td>
					<td className="whitespace-nowrap px-4 py-2 text-center font-medium text-white">Platoon</td>
						<td className="whitespace-nowrap px-4 py-2 flex items-center justify-center mt-3">
							<div className="flex items-center justify-center text-center bg-yellow-100 rounded-full w-24 text-yellow-500"> <GoDotFill /> Pending</div>
						</td>
						<td className="whitespace-nowrap px-4 py-2 text-white text-center">platoongmail@gmail.com</td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-green-700"><FaCheck /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-yellow-700"><IoEye /></td>
						<td className="text-2xl whitespace-nowrap px-4 py-2 text-red-700"><FaRegTrashCan /></td>
					</tr>
				</tbody>
				</table>
			</div>
    );
};