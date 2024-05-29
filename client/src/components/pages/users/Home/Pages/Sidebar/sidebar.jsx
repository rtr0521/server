import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineViewGrid } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";
import { FaBars } from "react-icons/fa";

const SidebarData = [
  {
    title: 'View Activities',
    icon: <HiOutlineViewGrid />,
    path: '/userdashboard'
  },
  {
    title: 'Profile Settings',
    icon: <CgProfile />,
    path: '/profile'
  },
  {
    title: 'Logout',
    icon: <IoMdExit />,
    path: '/login',
    cName: 'logout'
  }
];

export const Sidebar = () => {
  const [profileInfo, setProfileInfo] = useState({ fullname: "", profilePicture: "" });
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/profile/:id");
      setProfileInfo(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`h-full shadow-2xl text-white flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <button onClick={toggleSidebar} className="text-md flex items-center justify-end mt-5 lg:mr-3">
        <FaBars />
      </button>
      <div className="p-3 flex items-center justify-between flex-col">
        {!isCollapsed && (
          <div className="profile-info flex items-center justify-center flex-col">
            <img src={profileInfo.profilePicture} className="w-16 h-auto rounded-full" alt="Profile" />
            <span className='text-xl font-bold text-gray-400'>{profileInfo.fullname}</span>
          </div>
        )}
      </div>
      <ul className="flex-grow">
        {SidebarData.map((item, index) => (
          <a key={index} href={item.path} className="flex items-center p-4 hover:bg-black hover:text-white">
            <span className="mr-4">{item.icon}</span>
            {!isCollapsed && <span>{item.title}</span>}
          </a>
        ))}
      </ul>
    </nav>
  );
};
