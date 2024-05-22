import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Io from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { Sidebar } from './Sidebar/sidebar';

const UserDashboard = () => {
  const [activity, setActivity] = useState({
    name: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    status: 'Todo'
  });
  const [activities, setActivities] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentActivityId, setCurrentActivityId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivity((prevActivity) => ({
      ...prevActivity,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const response = await axios.put(`http://localhost:5000/activities/${currentActivityId}`, activity);
        setActivities((prevActivities) => 
          prevActivities.map((act) => (act._id === currentActivityId ? response.data : act))
        );
        setEditing(false);
        setCurrentActivityId(null);
        document.getElementById('my_modal_5').close();
      } else {
        const response = await axios.post('http://localhost:5000/activities', activity);
        setActivities((prevActivities) => [...prevActivities, response.data]);
      }
      clearForm();
      document.getElementById('my_modal_5').close();
    } catch (error) {
      console.error('Error submitting activity:', error);
    }
  };

  const handleEdit = (activity) => {
    setEditing(true);
    setCurrentActivityId(activity._id);
    setActivity(activity);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/activities/${id}`);
      setActivities((prevActivities) => prevActivities.filter((act) => act._id !== id));
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const clearForm = () => {
    setActivity({
      name: '',
      description: '',
      dateStart: '',
      dateEnd: '',
      status: 'Todo'
    });
    setEditing(false);
    setCurrentActivityId(null);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/activities', {
          params: {
            search: searchQuery,
            page: currentPage,
            limit: 4  // You can adjust the limit as needed
          }
        });
        setActivities(response.data.activities);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, [searchQuery, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className='bg-white flex-grow'>
        <header className='flex items-center justify-between bg-white w-full h-32 p-7'>
          <div className="header-container">
            <div className="header-info flex items-center justify-center">
              <h1 className='text-2xl mr-3 font-bold'>Military Performance Monitoring</h1>
              <span className='bg-transparent border-1 border-black rounded-2xl p-2 text-black'>70 Platoon</span>
            </div>
            <div className="header-sub">
              <p className='text-md text-gray-500'>Keep track of vendor and their security ratings.</p>
            </div>
          </div>
          <div className="button">
            <button 
              className="btn gap-2 rounded border text-white bg-black px-8 py-3" 
              onClick={() => {
                clearForm();
                document.getElementById('my_modal_5').showModal();
              }}
            >
              <IoMdAdd /> Add Activity
            </button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
              <div className="modal-box bg-white border-black border-1">
                <h3 className="font-bold text-lg bg-transparent border-b border-white text-black x">Add a To Do! ✏️</h3>
                <form onSubmit={handleSubmit}>
                  <div className="py-4 text-gray-400">Activity Name: </div>
                  <input 
                    type="text" 
                    name="name"
                    value={activity.name}
                    onChange={handleChange}
                    placeholder="Enter Activity" 
                    className="input input-bordered w-full bg-transparent border border-black text-black" 
                    required
                  />
                  <div>
                    <label htmlFor="Description" className="block text-md font-medium text-gray-400 my-3">Description: </label>
                    <textarea
                      id="Description"
                      name="description"
                      value={activity.description}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-md p-3 text-black bg-white border border-black align-top shadow-sm sm:text-sm"
                      rows="4"
                      placeholder="Enter any additional order notes..."
                      required
                    ></textarea>
                  </div>
                  <div className="py-4 text-gray-400">Choose a Date: </div>
                  <div className="flex items-center justify-center mb-6">
                    <input 
                      type="date" 
                      name="dateStart"
                      value={activity.dateStart}
                      onChange={handleChange}
                      className='bg-white border border-black rounded-lg px-4 py-2 mb-3 w-full' 
                      required
                    />
                    <input 
                      type="date" 
                      name="dateEnd"
                      value={activity.dateEnd}
                      onChange={handleChange}
                      className='bg-white border border-black rounded-lg px-4 py-2 mb-3 w-full' 
                      required
                    />
                  </div>
                  <select 
                    name="status"
                    value={activity.status}
                    onChange={handleChange}
                    className="select select-bordered w-full bg-transparent border border-black text-black"
                    required
                  >
                    <option disabled>Status</option>
                    <option value="Todo">To Do</option>
                    <option value="Ongoing">On Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  <div className="modal-action">
                    <button className='btn bg-black text-white mr-2' type="submit" onClick={handleSubmit}>
                      {editing ? 'Update' : 'Submit'}
                    </button>
                    <button type="button" className="btn bg-white text-black" onClick={() => {
                      clearForm();
                      document.getElementById('my_modal_5').close();
                      handleAfterSubmit();
                    }}>Close</button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>        
        </header>
        <section className='w-full h-5/6 bg-white p-7'>
          <div className="flex justify-between items-center">
            <div>
              <h1 className='text-xl font-bold text-gray-400'>To Do: Progress Report</h1>
            </div>
            <div className="relative">
              <label htmlFor="Search" className="sr-only">Search</label>
              <input
                type="text"
                id="Search"
                placeholder="Search for..."
                className="w-96 rounded-md bg-white border-1 border-gray-300 shadow-md p-3 pe-10 sm:text-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button type="button" className="text-gray-600 hover:text-gray-700">
                  <span className="sr-only">Search</span>
                  <Io.IoSearchSharp />
                </button>
              </span>
            </div>
          </div>
          <div className="overflow-x-auto mt-12 shadow-md">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="px-4 py-6">
                    <label htmlFor="SelectAll" className="sr-only">Select All</label>
                    <input type="checkbox" id="SelectAll" className="size-5 rounded border-gray-300" />
                  </th>
                  <th className="inline-flex items-center justify-start mt-3 whitespace-nowrap px-4 py-2 font-bold text-gray-900"> Activities <FaCaretDown className='ml-2'/></th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Progress</th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Start Date</th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">End Date</th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Status</th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Edit</th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity._id}>
                    <td className="px-4 py-5"><input type="checkbox" className="size-5 rounded border-gray-300" /></td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{activity.name}</td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div className="flex-grow bg-gray-200 h-1.5">
                            <div className={`h-1.5 ${activity.status === 'Todo' ? 'w-1/3 bg-red-500' : activity.status === 'Ongoing' ? 'w-2/3 bg-yellow-500' : 'w-full bg-green-500'}`}></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{activity.dateStart}</td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{activity.dateEnd}</td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <div className="flex items-center space-x-2">
                        <GoDotFill className={activity.status === 'Todo' ? 'text-red-500' : activity.status === 'Ongoing' ? 'text-yellow-500' : 'text-green-500'} />
                        <span>{activity.status}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <button className='text-blue-500' onClick={() => {
                        handleEdit(activity);
                        document.getElementById('my_modal_5').showModal();
                      }}>
                        <FaRegEdit />
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <button className='text-red-500' onClick={() => handleDelete(activity._id)}><FaRegTrashCan /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex items-center justify-between mt-10'>
            <div>
				<h1 className='text-md font-medium text-gray-500'>Page {currentPage} of {totalPages}</h1>
            </div>
            <div className="flex items-center space-x-2">

              <button 	
				className="inline-flex items-center gap-2 ml-2 rounded border border-black bg-transparent px-8 py-3 text-black hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" 
			  	disabled={currentPage === 1} 
				onClick={goToPreviousPage}>
				<span className="text-sm font-medium"> Previous </span>
				<IoMdArrowDropleftCircle />
			  </button>

              <button 
			  	className="inline-flex items-center gap-2 rounded border border-black bg-transparent px-8 py-3 text-black hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" 
			  	disabled={currentPage === totalPages} 
				onClick={goToNextPage}><IoMdArrowDroprightCircle />
			  	<span className="text-sm font-medium"> Next </span>
			  </button>
			  
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
