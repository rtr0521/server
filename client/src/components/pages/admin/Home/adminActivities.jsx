import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Io from 'react-icons/io5';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdAdd } from 'react-icons/io';
import { FaCaretDown } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from 'react-icons/io';
import { Sidebar } from './Sidebar/sidebar';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [activity, setActivity] = useState({
    name: '',
    description: '',
    dateStart: '',
    dateEnd: '',
    status: 'Todo',
  });
  const [activities, setActivities] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentActivityId, setCurrentActivityId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activityProgress, setActivityProgress] = useState({}); // State for progress
  const [error, setError] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setActivity(prevActivity => ({
      ...prevActivity,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editing) {
        const response = await axios.put(`https://server-3uk1.onrender.com/admin/adminActivities/${currentActivityId}`, activity);
        setActivities(prevActivities =>
          prevActivities.map(act => (act._id === currentActivityId ? response.data : act)),
        );
        setEditing(false);
        setCurrentActivityId(null);
        document.getElementById('my_modal_5').close();
      } else {
        const response = await axios.post('https://server-3uk1.onrender.com/admin/adminActivities', activity);
        setActivities(prevActivities => [...prevActivities, response.data]);
      }
      clearForm();
      document.getElementById('my_modal_5').close();
    } catch (error) {
      console.error('Error submitting activity:', error);
    }
  };

  const handleEdit = activity => {
    setEditing(true);
    setCurrentActivityId(activity._id);
    setActivity(activity);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`https://server-3uk1.onrender.com/admin/adminActivities/${id}`);
      setActivities(prevActivities => prevActivities.filter(act => act._id !== id));
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
      status: 'Todo',
    });
    setEditing(false);
    setCurrentActivityId(null);
  };

  useEffect(() => {
    const fetchActivitiesWithProgress = async () => {
      try {
        const activitiesResponse = await axios.get('https://server-3uk1.onrender.com/admin/adminActivities', {
          params: {
            search: searchQuery,
            page: currentPage,
            limit: 3,
          },
        });

        const activities = activitiesResponse.data.activities;
        setActivities(activities);
        setTotalPages(activitiesResponse.data.totalPages);

        const newActivityProgress = {};
        for (const activity of activities) {
          const taskResponse = await axios.get(`https://server-3uk1.onrender.com/admin/adminActivities/${activity._id}/tasks`);
          const tasksData = taskResponse.data;

          // Progress Calculation
          const totalTasks = tasksData.length;
          const completedTasks = tasksData.filter(task => task.status === 'done').length;
          const inProgressTasks = tasksData.filter(task => task.status === 'inProgress').length;
          const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

          // Progress Variant (Color) - Corrected
          let progressVariant = 'danger';
          if (inProgressTasks > 0) {
            // Check if there are any in-progress tasks
            progressVariant = 'warning'; // Yellow if there's at least one task in progress
          } else if (completedTasks === totalTasks) {
            // Check if all tasks are done
            progressVariant = 'success'; // Green if all tasks are done
          }

          newActivityProgress[activity._id] = { value: progress, variant: progressVariant };
        }

        setActivityProgress(newActivityProgress);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivitiesWithProgress();
  }, [searchQuery, currentPage]);

  const handleSelectAll = e => {
    if (e.target.checked) {
      setSelectedActivities(activities.map(activity => activity._id));
    } else {
      setSelectedActivities([]);
    }
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedActivities([...selectedActivities, id]);
    } else {
      setSelectedActivities(selectedActivities.filter(activityId => activityId !== id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.delete(`https://server-3uk1.onrender.com/admin/adminActivities`, { data: { ids: selectedActivities } });
      setActivities(prevActivities => prevActivities.filter(activity => !selectedActivities.includes(activity._id)));
      setSelectedActivities([]);
    } catch (error) {
      console.error('Error deleting selected activities:', error);
    }
  };

  const handleSearchChange = e => {
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
      <div className="w-full xl:flex-grow">
        <header className="flex items-center justify-between w-full h-32 lg:p-7">
          <div className="header-container">
            <div className="header-info">
              <h1 className="text-2xl font-bold text-white">Admin Monitoring</h1>
              <span className="hidden bg-transparent border-1 border-white rounded-2xl p-2 text-white">70 Platoon</span>
            </div>
            <div className="header-sub">
              <p className=" text-md text-gray-300">Keep track of military activities and manage their activities.</p>
            </div>
          </div>
          <div className="button">
            <dialog id="my_modal_5" className="modal sm:modal-middle">
              <div className="modal-box border border-white">
                <h3 className="font-bold text-lg bg-transparent border-b border-white text-white x">Add a To Do! ✏️</h3>
                <form onSubmit={handleSubmit}>
                  <div className="py-4 text-gray-400">Activity Name: </div>
                  <input
                    type="text"
                    name="name"
                    value={activity.name}
                    onChange={handleChange}
                    placeholder="Enter Activity"
                    className="input input-bordered w-full bg-transparent border border-white text-white"
                    required
                  />
                  <div>
                    <label htmlFor="Description" className="block text-md font-medium text-gray-400 my-3">
                      Description:{' '}
                    </label>
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
                      className="bg-white border border-black rounded-lg px-4 py-2 mb-3 w-full"
                      required
                    />
                    <input
                      type="date"
                      name="dateEnd"
                      value={activity.dateEnd}
                      onChange={handleChange}
                      className="bg-white border border-black rounded-lg px-4 py-2 mb-3 w-full"
                      required
                    />
                  </div>

                  <div className="modal-action">
                    <button className="btn btn-primary text-white mr-2" type="submit" onClick={handleSubmit}>
                      {editing ? 'Update' : 'Submit'}
                    </button>
                    <button
                      type="button"
                      className="btn bg-white text-black"
                      onClick={() => {
                        clearForm();
                        document.getElementById('my_modal_5').close();
                        handleAfterSubmit();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          </div>
        </header>
        <section className="w-96 lg:w-full lg:p-7">
          <div className="flex justify-between items-center">
            <div className="w-full flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-between">
              <button
                className="btn w-96 gap-2 mb-2 lg:mb-0 rounded border-transparent btn-primary px-8 py-3"
                onClick={() => {
                  clearForm();
                  document.getElementById('my_modal_5').showModal();
                }}
              >
                <IoMdAdd /> Add Activity
              </button>
              <button
              className="btn w-96 bg-red-500 text-white"
              onClick={handleDeleteSelected}
              disabled={selectedActivities.length === 0}
            >
              Delete Selected
            </button>
            </div>
            
          </div>
          <div className="overflow-x-auto mt-12 shadow-md rounded-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-dark text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="px-4 py-6">
                    <label htmlFor="SelectAll" className="sr-only">
                      Select All
                    </label>
                    <input
                      type="checkbox"
                      id="SelectAll"
                      className="size-5 rounded border-gray-300"
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="inline-flex items-center justify-start text-white mt-3 whitespace-nowrap px-4 py-2 font-bold">
                    {' '}
                    Activities <FaCaretDown className="ml-2" />
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-white">Progress</th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-white">Start Date</th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-white">End Date</th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-white">Edit</th>
                  <th className="whitespace-nowrap px-4 py-2 font-bold text-white">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activities.map(activity => (
                  <tr key={activity._id}>
                    <td className="px-4 py-5">
                      <input
                        type="checkbox"
                        className="size-5 rounded border-gray-300"
                        checked={selectedActivities.includes(activity._id)}
                        onChange={e => handleCheckboxChange(e, activity._id)}
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2  font-medium text-white">
                      <Link to={`/admin/Task/${activity._id}`}>{activity.name}</Link>
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 text-gray-400">
                      <ProgressBar
                        now={activityProgress[activity._id]?.value || 0}
                        label={`${activityProgress[activity._id]?.value || 0}%`}
                        variant={activityProgress[activity._id]?.variant}
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-white">
                      {activity ? new Date(activity.dateStart).toLocaleDateString() : 'Loading...'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-white">
                      {activity ? new Date(activity.dateEnd).toLocaleDateString() : 'Loading...'}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <button
                        className="text-blue-500"
                        onClick={() => {
                          handleEdit(activity);
                          document.getElementById('my_modal_5').showModal();
                        }}
                      >
                        <FaRegEdit />
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <button className="text-red-500" onClick={() => handleDelete(activity._id)}>
                        <FaRegTrashCan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-10">
            <div>
              <h1 className="text-md font-medium text-gray-500">
                Page {currentPage} of {totalPages}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="inline-flex items-center gap-2 ml-2 rounded  bg-dark px-8 py-3 text-white "
                disabled={currentPage === 1}
                onClick={goToPreviousPage}
              >
                <span className="text-sm font-medium"> Previous </span>
                <IoMdArrowDropleftCircle />
              </button>

              <button
                className="inline-flex items-center gap-2 rounded  bg-dark px-8 py-3 text-white"
                disabled={currentPage === totalPages}
                onClick={goToNextPage}
              >
                <IoMdArrowDroprightCircle />
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
