import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from './Sidebar/sidebar';
import { FaRegCalendarCheck, FaCheckCircle, FaTrash, FaEdit, FaTasks } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

const Activities = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [editDescription, setEditDescription] = useState('');
  const [currentEditId, setCurrentEditId] = useState(null);
  const [currentEditType, setCurrentEditType] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/activities/${id}/tasks`);
        const tasksData = response.data;
        setTodos(tasksData.filter(task => task.status === 'todo'));
        setInProgress(tasksData.filter(task => task.status === 'inProgress'));
        setDone(tasksData.filter(task => task.status === 'done'));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTask();
  }, [id]);
  

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/activities/${id}`);
        setActivity(response.data);
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };
    fetchActivity();
  }, [id]);
  

    // Inside the Activities component
  const getProgressSummary = () => {
    const totalTasks = todos.length + inProgress.length + done.length;
    if (totalTasks === 0) return "No tasks";

    const donePercent = Math.round((done.length / totalTasks) * 100);
    if (donePercent === 100) return "Done";
    if (inProgress.length > 0) return "In Progress";
    return "To Do";
  };


  const addTask = async () => {
    const newTaskDescription = document.getElementById('task-description').value;
    if (newTaskDescription.trim()) {
      try {
        const response = await axios.post(`http://localhost:5000/activities/${id}/tasks`, { description: newTaskDescription });
        const newTask = response.data.newTask;
        setTodos([...todos, newTask]);
        document.getElementById('task-description').value = '';
        document.getElementById('task_modal').close();
        await fetchTask();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const moveToInProgress = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/status/${taskId}`, { status: 'inProgress' });
      if (response.status === 200) {
        const updatedTask = response.data;
        setTodos(todos.filter(task => task._id !== taskId));
        setInProgress([...inProgress, updatedTask]);
      }
    } catch (error) {
      console.error('Error moving task to "In Progress":', error.response ? error.response.data : error.message);
    }
  };
  
  const moveToDone = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/status/${taskId}`, { status: 'done' }); // Changed status to 'done'
      if (response.status === 200) {
        const updatedTask = response.data;
        setInProgress(inProgress.filter(task => task._id !== taskId)); 
        setDone([...done, updatedTask]); // Add to 'done' array
      }
    } catch (error) {
      console.error('Error moving task to "Done":', error.response ? error.response.data : error.message);
    }
  };
  

  const deleteTask = async (taskId) => {
    try {
      const taskToDelete = todos.find(task => task._id === taskId) || inProgress.find(task => task._id === taskId);
      if (taskToDelete) {
        await axios.delete(`http://localhost:5000/tasks/${taskId}`);
        setTodos(todos.filter(task => task._id !== taskId));
        setInProgress(inProgress.filter(task => task._id !== taskId));
        setDone(done.filter(task => task._id !== taskId));
      } else {
        console.log('Cannot delete task: Task not found or already done.');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  
  const openEditModal = (taskId, type, description) => {
    setCurrentEditId(taskId);
    setCurrentEditType(type);
    setEditDescription(description);
    document.getElementById('edit_modal').showModal();
  };

  const updateTask = async () => {
    try {
      const taskToUpdate = todos.find(task => task._id === currentEditId) || inProgress.find(task => task._id === currentEditId);
      if (taskToUpdate) {
        const response = await axios.put(`http://localhost:5000/tasks/${currentEditId}`, { description: editDescription });
        const updatedTask = response.data;
  
        // Update the task in the appropriate array based on its status
        if (taskToUpdate.status === 'todo') {
          setTodos(todos.map(task => (task._id === currentEditId ? updatedTask : task)));
        } else if (taskToUpdate.status === 'inProgress') {
          setInProgress(inProgress.map(task => (task._id === currentEditId ? updatedTask : task)));
        } else if (taskToUpdate.status === 'done') {
          setDone(done.map(task => (task._id === currentEditId ? updatedTask : task)));
        }
  
        // Close the edit modal
        document.getElementById('edit_modal').close();
      } else {
        console.log('Cannot update task: Task not found or already done.');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className='h-screen flex-grow p-7'>
        <header>
          <h1 className='text-4xl font-bold mb-3 text-white '>🤖 {activity ? activity.name : "Loading..."}</h1>
          <div className="flex items-center justify-start">

            <FaTasks className='text-lg' /> 
            <p className='text-gray-400 ml-2'>Progress:</p>
            <span className='bg-gray-500 text-white border p-2 ml-2 rounded-lg'>
                {getProgressSummary()}
            </span>

            <FaRegCalendarCheck className='text-lg' />
            <p className='text-gray-400 ml-2'>Date Started</p>
            <span className='bg-gray-500 text-white border p-2 ml-2 rounded-lg'>
              {activity ? new Date(activity.dateStart).toLocaleDateString() : "Loading..."}
            </span>
            <FaRegCalendarCheck className='text-lg' />
            <p className='text-gray-400 ml-2'>Due Date: </p>
            <span className='bg-gray-500 text-white border p-2 ml-2 rounded-lg'>
              {activity ? new Date(activity.dateEnd).toLocaleDateString() : "Loading..."}
            </span>
          </div>

          <p className='flex items-end text-justify text-gray-400 max-w-screen-2xl border border-black rounded-md p-3'>
            {activity && activity.description ? activity.description : "Loading..."}
            <button className='text-yellow-500 mr-2' onClick={() => openEditModal(null, 'description', activity ? activity.description : '')}>
              <FaEdit />
            </button>
          </p>

          <button className="btn w-60 my-3 bg-black text-white" onClick={() => document.getElementById('task_modal').showModal()}> Add To Do <IoMdAddCircle /></button>
          <dialog id="task_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-white border border-black">
              <h3 className="font-bold text-xl">Add a To Do List ✍️:</h3>
              <hr className='my-4' />
              <p className='text-sm my-2'>Description:</p>
              <textarea id="task-description" className='bg-white border rounded-md h-96 border-black w-full p-3 text-gray-400 '></textarea>
              <div className="modal-action">
                <button className="btn bg-black text-white mr-2" onClick={addTask}>Add</button>
                <button className="btn bg-white border border-black text-black" onClick={() => document.getElementById('task_modal').close()}>Close</button>
              </div>
            </div>
          </dialog>
        </header>

        <section className='max-w-7xl mt-1'>
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col w-full mr-5">
              {todos.map(task => (
                <div key={task._id} className="h-32 mb-3 rounded-lg border border-black cursor-pointer hover:shadow-lg p-3">
                  <h1 className='text-xl font-bold text-white'>To Do:</h1>
                  <p className='text-sm text-white'>{task.description}</p>
                  <div className="flex items-end justify-end">
                    <button className='text-green-500 mr-2' onClick={() => moveToInProgress(task._id)}><FaCheckCircle /></button>
                    <button className='text-yellow-500 mr-2' onClick={() => openEditModal(task._id, 'todo', task.description)}><FaEdit /></button>
                    <button className='text-red-400' onClick={() => deleteTask(task._id)}><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full mr-5">
              {inProgress.map(task => (
                <div key={task._id} className="h-32 mb-3 rounded-lg bg-yellow-200 border border-black cursor-pointer hover:shadow-lg p-3">
                  <h1 className='text-xl font-bold'>On Progress:</h1>
                  <p className='text-sm text-gray-600'>{task.description}</p>
                  <div className="flex items-end justify-end">
                    <button className='text-green-500 mr-2' onClick={() => moveToDone(task._id)}><FaCheckCircle /></button>
                    <button className='text-yellow-500 mr-2' onClick={() => openEditModal(task._id, 'inProgress', task.description)}><FaEdit /></button>
                    <button className='text-red-400' onClick={() => deleteTask(task._id)}><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full ">
              {done.map(task => (
                <div key={task._id} className="h-32 mb-3 rounded-lg bg-green-200 border border-black cursor-pointer hover:shadow-lg p-3">
                  <h1 className='text-xl font-bold'>Done:</h1>
                  <p className='text-sm text-gray-600'>{task.description}</p>
                  <div className="flex items-end justify-end">
                    <button className='text-yellow-500 mr-2' onClick={() => openEditModal(task._id, 'done', task.description)}><FaEdit /></button>
                    <button className='text-red-400' onClick={() => deleteTask(task._id)}><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white border border-black">
            <h3 className="font-bold text-xl">Edit Description ✍️:</h3>
            <hr className='my-4' />
            <p className='text-sm my-2'>Edit Description:</p>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className='bg-white border rounded-md h-96 border-black w-full p-3 text-gray-400 '
            ></textarea>
            <div className="modal-action">
              <button className="btn bg-black text-white mr-2" onClick={updateTask}>Update</button>
              <button className="btn bg-white border border-black text-black" onClick={() => document.getElementById('edit_modal').close()}>Close</button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Activities;