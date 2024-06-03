import React, { useState } from "react";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { SidebarData } from "./sidebarData";


export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className=" shadow-2xl">
      <nav
        className={`h-screen text-white flex flex-col ${
          isCollapsed ? "w-20 " : "w-64"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="hidden text-2xl mt-2 mr-1 lg:flex items-end justify-end"
        >
          <TbLayoutSidebarLeftCollapseFilled />
        </button>
        <div className="p-3 flex items-center justify-between flex-col">
              <span className="text-md font-bold text-gray-400">Admin</span>
        </div>
        <ul className="flex-grow">
          {SidebarData.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className="flex items-center p-4 hover:bg-black hover:text-white"
            >
              <span
                className={`mr-4 sm:ml-2 ${isCollapsed ? "ml-2 " : "mr-4"}`}
              >
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="sm:hidden lg:block">{item.title}</span>
              )}
            </a>
          ))}
        </ul>
      </nav>
    </div>
  );
};