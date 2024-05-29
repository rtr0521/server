import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Add this line to import useParams
import axios from 'axios'; // Assuming you are using axios for API requests
import { Sidebar } from './Sidebar/sidebar';
import { FaRegCalendarCheck, FaCheckCircle, FaTrash, FaEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";

const Activities = () => {

  const { id } = useParams();
  const [activityTab, setActivity] = useState(null);

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

  
  const [todos, setTodos] = useState([
    {
      id: 1,
      description: 'As a translator, I want to integrate Crowdin webhook to notify translators about changed strings',
    },
  ]);

  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  const [mainDescription, setMainDescription] = useState('A feeding program is an organized initiative designed to provide nutritious meals to individuals in need, particularly targeting vulnerable populations such as children, the elderly, and low-income families. These programs aim to address food insecurity and malnutrition by ensuring access to regular, healthy meals. Feeding programs can be implemented in various settings, including schools, community centers, shelters, and through mobile units. They often involve partnerships with government agencies, non-profit organizations, and volunteers. The overarching goals are to improve health outcomes, support educational attainment for children, reduce hunger, and foster a sense of community and well-being among participants.');

  const [editDescription, setEditDescription] = useState('');
  const [currentEditId, setCurrentEditId] = useState(null);
  const [currentEditType, setCurrentEditType] = useState('');

  const addTodo = () => {
    const newTodoDescription = document.getElementById('to-do-description').value;
    if (newTodoDescription.trim()) {
      setTodos([...todos, { id: todos.length + 1, description: newTodoDescription }]);
      document.getElementById('to-do-description').value = '';
      document.getElementById('my_modal_5').close();
    }
  };

  const moveToInProgress = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setInProgress([...inProgress, todo]);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const moveToDone = (id) => {
    const task = inProgress.find(task => task.id === id);
    setDone([...done, task]);
    setInProgress(inProgress.filter(task => task.id !== id));
  };

  const deleteTodo = (id, type) => {
    if (type === 'todo') {
      setTodos(todos.filter(todo => todo.id !== id));
    } else if (type === 'inProgress') {
      setInProgress(inProgress.filter(task => task.id !== id));
    } else if (type === 'done') {
      setDone(done.filter(task => task.id !== id));
    }
  };

  const openEditModal = (id, type, description) => {
    setCurrentEditId(id);
    setCurrentEditType(type);
    setEditDescription(description);
    document.getElementById('edit_modal').showModal();
  };

  const handleUpdate = () => {
    if (currentEditType === 'description') {
      setMainDescription(editDescription);
    } else {
      if (currentEditType === 'todo') {
        setTodos(todos.map(todo => todo.id === currentEditId ? { ...todo, description: editDescription } : todo));
      } else if (currentEditType === 'inProgress') {
        setInProgress(inProgress.map(task => task.id === currentEditId ? { ...task, description: editDescription } : task));
      } else if (currentEditType === 'done') {
        setDone(done.map(task => task.id === currentEditId ? { ...task, description: editDescription } : task));
      }
    }
    document.getElementById('edit_modal').close();
  };

  return (
    <div className="flex h-screen">
      <Sidebar/>
    
      <div className=' h-screen flex-grow p-7'>
        <header>
        <h1 className='text-4xl font-bold mb-3 text-white '>🤖 {activityTab ? activityTab.name : "Loading..."}</h1>
      <div className="flex items-center justify-start">
        <FaRegCalendarCheck className='text-lg' />
        <p className='text-gray-400 ml-2'>Date Started</p>
        <span className='bg-gray-500 text-white border p-2 ml-2 rounded-lg'>
          {activityTab ? activityTab.dateStart : "Loading..."}
        </span>
        <FaRegCalendarCheck className='text-lg' />
        <p className='text-gray-400 ml-2'>Due Date: </p>
        <span className='bg-gray-500 text-white border p-2 ml-2 rounded-lg'>
          {activityTab ? activityTab.dateEnd : "Loading..."}
        </span>
      </div>

        <p className='flex items-end text-justify text-gray-400 max-w-screen-2xl border border-black rounded-md p-3'>
          {activityTab && activityTab.description ? activityTab.description : "Loading..."}
              <button className='text-yellow-500 mr-2' onClick={() => openEditModal(null, 'description', mainDescription)}>
            <FaEdit />
          </button>
        </p>

    
          <button className="btn w-60 my-3 bg-black text-white" onClick={() => document.getElementById('my_modal_5').showModal()}> Add To Do <IoMdAddCircle /></button>
          <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-white border border-black">
              <h3 className="font-bold text-xl">Add a To Do List ✍️:</h3>
              <hr className='my-4'/>
              <p className='text-sm my-2'>Description:</p>
              <textarea id="to-do-description" className='bg-white border rounded-md h-96 border-black w-full p-3 text-gray-400 '></textarea>
              <div className="modal-action">
                <button className="btn bg-black text-white mr-2" onClick={addTodo}>Add</button>
                <button className="btn bg-white border border-black text-black" onClick={() => document.getElementById('my_modal_5').close()}>Close</button>
              </div>
            </div>
          </dialog>
        </header>

        <section className='max-w-7xl mt-1'>
          <div className="w-full flex items-start justify-between">
            <div className="flex flex-col w-full mr-5">
              {todos.map(todo => (
                <div key={todo.id} className="h-32 mb-3 rounded-lg border border-black cursor-pointer hover:shadow-lg p-3">
                  <h1 className='text-xl font-bold text-white'>To Do:</h1>
                  <p className='text-sm text-white'>{todo.description}</p>
                  <div className="flex items-end justify-end">
                    <button className='text-green-500 mr-2' onClick={() => moveToInProgress(todo.id)}><FaCheckCircle/></button>
                    <button className='text-yellow-500 mr-2' onClick={() => openEditModal(todo.id, 'todo', todo.description)}><FaEdit/></button>
                    <button className='text-red-400' onClick={() => deleteTodo(todo.id, 'todo')}><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full mr-5">
              {inProgress.map(task => (
                <div key={task.id} className="h-32 mb-3 rounded-lg bg-yellow-200 border border-black cursor-pointer hover:shadow-lg p-3">
                  <h1 className='text-xl font-bold'>On Progress:</h1>
                  <p className='text-sm text-gray-600'>{task.description}</p>
                  <div className="flex items-end justify-end">
                    <button className='text-green-500 mr-2' onClick={() => moveToDone(task.id)}><FaCheckCircle/></button>
                    <button className='text-yellow-500 mr-2' onClick={() => openEditModal(task.id, 'inProgress', task.description)}><FaEdit/></button>
                    <button className='text-red-400' onClick={() => deleteTodo(task.id, 'inProgress')}><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full ">
              {done.map(task => (
                <div key={task.id} className="h-32 mb-3 rounded-lg bg-green-200 border border-black cursor-pointer hover:shadow-lg p-3">
                  <h1 className='text-xl font-bold'>Done:</h1>
                  <p className='text-sm text-gray-600'>{task.description}</p>
                  <div className="flex items-end justify-end">
                    <button className='text-yellow-500 mr-2' onClick={() => openEditModal(task.id, 'done', task.description)}><FaEdit/></button>
                    <button className='text-red-400' onClick={() => deleteTodo(task.id, 'done')}><FaTrash /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white border border-black">
            <h3 className="font-bold text-xl">Edit Description ✍️:</h3>
            <hr className='my-4'/>
            <p className='text-sm my-2'>Edit Description:</p>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className='bg-white border rounded-md h-96 border-black w-full p-3 text-gray-400 '
            ></textarea>
            <div className="modal-action">
              <button className="btn bg-black text-white mr-2" onClick={handleUpdate}>Update</button>
              <button className="btn bg-white border border-black text-black" onClick={() => document.getElementById('edit_modal').close()}>Close</button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

export default Activities;