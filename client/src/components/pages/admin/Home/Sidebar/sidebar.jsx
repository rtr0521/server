import React, { useState } from 'react';
import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb';
import { SidebarData } from './sidebarData';
import Profile from '../../../../../assets/images/profile.png';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
      <nav className={`h-screen shadow-lg text-white flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <button onClick={toggleSidebar} className="hidden lg:text-xl lg:flex lg:items-center lg:justify-end lg:mt-5">
          <TbLayoutSidebarLeftCollapseFilled />
        </button>
        <div className="p-3 flex items-center justify-between flex-col">
          {!isCollapsed && (
            <div className="profile-info flex items-center justify-center flex-col sm:hidden lg:flex">
              <img src={Profile} className="hidden lg:flex w-16 h-auto rounded-full" alt="Profile" />
              <span className="hidden lg:flex text-md font-bold text-gray-400">Admin</span>
            </div>
          )}
        </div>
        <ul className="flex-grow">
          {SidebarData.map((item, index) => (
            <a key={index} href={item.path} className="flex items-center p-4 hover:bg-black hover:text-white">
              <span className={"text-xl ml-3 lg:mr-4  lg:ml-0 lg:text-md"}>{item.icon}</span>
              {!isCollapsed && <span className="hidden lg:flex">{item.title}</span>}
            </a>
          ))}
        </ul>
      </nav>
  );
};
