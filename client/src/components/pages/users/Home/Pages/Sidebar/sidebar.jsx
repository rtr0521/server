import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { IoMdExit } from 'react-icons/io';
import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const SidebarData = [
  {
    title: 'View Activities',
    icon: <HiOutlineViewGrid />,
    path: '/userdashboard',
  },
  {
    title: 'Logout',
    icon: <IoMdExit />,
    path: '/login',
    cName: 'logout',
  },
];

export const Sidebar = () => {
  const [profileInfo, setProfileInfo] = useState({ fullname: '', profilePicture: '' });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const response = await axios.get('https://server-3uk1.onrender.com/profile/:id');
      setProfileInfo(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className={` h-screen shadow-2xl text-white flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <button onClick={toggleSidebar} className="hidden lg:text-xl lg:flex lg:items-center lg:justify-end lg:mt-5 ">
        <TbLayoutSidebarLeftCollapseFilled />
      </button>
      <div className="p-3 flex items-center justify-between flex-col">
        {!isCollapsed && (
          <div className="hidden lg:profile-info lg:flex lg:items-center lg:justify-center lg:flex-col">
            <span className="text-xl font-bold text-gray-400">Trello</span>
          </div>
        )}
      </div>
      <ul className="flex-grow">
        {SidebarData.map((item, index) => (
          <a
            key={index}
            href={item.path}
            className="flex items-center p-4 hover:bg-black hover:text-white"
            onClick={item.cName === 'logout' ? handleLogout : null}
          >
            <span className="text-xl lg:mr-4 lg:text-md">{item.icon}</span>
            {!isCollapsed && <span className="hidden lg:flex">{item.title}</span>}
          </a>
        ))}
      </ul>
    </nav>
  );
};
