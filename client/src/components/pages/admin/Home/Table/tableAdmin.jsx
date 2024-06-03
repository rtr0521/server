// src/components/TableAdmin.jsx
import React, { useEffect, useState } from 'react';
import { IoEye } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from 'axios';

export const TableAdmin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const data = await fetchUsers();
            setUsers(data);
        };

        getUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/adminUser/list');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

	const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/admin/adminUser/list/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="overflow-x-auto mt-12 shadow-md">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-dark rounded-md text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="px-4 py-6">
                            <label htmlFor="SelectAll" className="sr-only">Select All</label>
                            <input type="checkbox" id="SelectAll" className="size-5 rounded border-gray-300" />
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-bold text-center text-white">FullName</th>
                        <th className="whitespace-nowrap px-4 py-2 font-bold text-center text-white">Email Address</th>
                        <th className="whitespace-nowrap px-4 py-2 font-bold text-center text-white">Edit</th>
                        <th className="whitespace-nowrap px-4 py-2 font-bold text-center text-white">Delete</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td className="px-4 py-6">
                                <label className="sr-only" htmlFor={`Row${index + 1}`}>Row {index + 1}</label>
                                <input className="size-5 rounded border-gray-300" type="checkbox" id={`Row${index + 1}`} />
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-center font-medium text-white">{user.fullname}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-white text-center">{user.email}</td>
                            <td className="text-2xl whitespace-nowrap px-4 py-2 text-yellow-700"><IoEye /></td>
                            <td className="text-2xl whitespace-nowrap px-4 py-2 text-red-700">
								<FaRegTrashCan onClick={() => deleteUser(user._id)} style={{ cursor: 'pointer' }} />
							</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
