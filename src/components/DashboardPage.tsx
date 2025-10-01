import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import UserMenu from "./UserMenu";

interface RegionsLogoProps {
  pyramidColor?: string;
  lockupColor?: string;
  className?: string;
  showLockup?: boolean;
}

const RegionsLogo: React.FC<RegionsLogoProps> = ({
  pyramidColor = "#5A8A22",
  lockupColor = "#565656",
  className = "h-5",
  showLockup = true,
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox={showLockup ? "0 0 242 41" : "0 0 60 41"}
    role="img"
    aria-label="Regions logo"
    fillRule="evenodd"
  >
    <path
      fill={pyramidColor}
      d="M15.1,20l9.19,20.35H0ZM29.44.48l5.75,7.73L29.44,40.32,23.72,8.18ZM43.83,19.9,59,40.32H34.78Zm-8.13-11,7.65,10.29L31.94,40.32ZM23.23,9l3.85,31.34-11.42-21Z"
    />
    {showLockup && (
      <g fill={lockupColor}>
        <path d="M98.09,38.38a28.25,28.25,0,0,1-3.58-5.61L94.09,32c-1.62-2.92-3.32-5.72-5.07-6.11v-.1c4.21-1.17,5.91-3.86,5.91-6.79,0-4-3.26-7.19-11.36-7.19H69.66v.82c3.15.6,3.7,1.53,3.7,3.91V35.93c0,2.29-1.3,3.47-3.7,3.67v.83H83.57V39.6c-2.7-.4-3.75-1.46-3.75-4V26.78c2.6,0,3.6,0,4.9,1.32,2.25,2.2,4.35,8.61,7.55,12.33h8.47V39.6A4.12,4.12,0,0,1,98.09,38.38ZM79.82,25.17V13.43h2c4,0,6.11,2,6.11,5.67C87.93,23.85,85.37,25.57,79.82,25.17Z" />
        <path d="M121.18,18.3v4.91h-.66c-.73-2.83-1.59-3.66-4.1-3.66h-4.37V28.7h4c1.82,0,2.67-.75,3.14-2.76h.73v6.85h-.73C118.9,30.86,117.89,30,116,30h-4v6.51c0,2,.85,2.72,3.1,2.72h1.31c2.78,0,4-2,4.76-4.12h.65l-.42,5.37H104.19v-.64c2.52-.53,2.87-1.29,2.87-3.56V22c0-1.93-.47-2.62-2.87-3.07V18.3Z" />
        <path d="M138.52,17.73c3.44,0,5,1.33,6.46,1.33a2.12,2.12,0,0,0,1.62-.76h.7v6.2h-.7A8.45,8.45,0,0,0,138.82,19c-4.64,0-7.19,4.09-7.19,10.93,0,7.08,3.1,9.84,7.27,9.84,2,0,3.41-.53,3.41-2.35V34.11A2.47,2.47,0,0,0,140,31.39v-.65h9.52v.65c-1.67.45-2.21,1.29-2.21,3.33v4.69A21.74,21.74,0,0,1,138.52,41c-8.17,0-12.31-5.79-12.31-11.46C126.21,22.76,131.43,17.73,138.52,17.73Z" />
        <path d="M164.71,18.3v.64c-2.71.61-2.86,1.44-2.86,3.56V36.68c0,2,.5,2.54,2.86,3.1v.65H154v-.65c2.69-.65,2.85-1.38,2.85-3.37V22.05c0-2-.5-2.54-2.85-3.11V18.3Z" />
        <path d="M182.21,17.74c-7.16,0-12.32,4.87-12.32,11.65S175.05,41,182.21,41s12.33-4.84,12.33-11.61S189.4,17.74,182.21,17.74Zm0,22c-5.11,0-6.89-4.84-6.89-10.17,0-7,2.43-10.6,6.89-10.6,4.95,0,6.92,4.35,6.92,10.56C189.13,36.84,186,39.75,182.21,39.75Z" />
        <path d="M205.3,18.3l13.24,14.83v-10c0-2.69-.46-3.71-2.87-4.24V18.3h7.66v.64c-2.58.15-3.28,1.67-3.28,3.63V40.7h-.74L203,22.72V36.27c0,2.42.74,3.1,3.33,3.51v.65h-7.82v-.65c2.44-.37,3-1.66,3-3.81V21.14c-1.74-1.75-2.09-2-3-2.2V18.3Z" />
        <path d="M240.52,17.73v5.83h-.66C239,21,236.57,19,234.25,19c-2.05,0-3.72,1.32-3.72,3a3.4,3.4,0,0,0,1.13,2.35c1.12,1.09,6.31,3.77,7.7,5.14a6.8,6.8,0,0,1,2.47,5.11c0,4.88-4.49,6.43-7.27,6.43s-4.37-.87-5.54-.87a1.25,1.25,0,0,0,1.15.72h-.67V34.19h.67c.65,3.29,2.82,5.56,6.07,5.56,2.43,0,4.18-1.32,4.18-3.14A3.64,3.64,0,0,0,237,34.08c-1.75-1.71-5.73-3.34-7.62-5.19a6.4,6.4,0,0,1-2-4.69c0-3.82,2.94-6.47,7.12-6.47a10.7,10.7,0,0,1,2.32.3,9.25,9.25,0,0,0,1.94.31,1.74,1.74,0,0,0,1.16-.61Z" />
      </g>
    )}
  </svg>
);

// Icon components for the UI
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

const DocumentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const UserGroupIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 16.95l.001-.001M16.263 16.95l-.001-.001M12 20.95v.01"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);

const DashboardPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen ">
      {/* Header */}
      <header className="z-10 bg-[#5a8a22] fixed top-0 w-full text-white grid grid-cols-3 items-center p-3 shadow-md ">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <RegionsLogo pyramidColor="#FFFFFF" lockupColor="#FFFFFF" />
        </div>

        {/* Center Section: Title */}
        <div className="text-center">
          <span className="font-bold text-md">
            Automated Finance Calculator
          </span>
        </div>

        {/* Right Section: Icons and User */}
        <div className="flex items-center justify-end space-x-6 text-sm">
          <button className="hover:text-gray-300">
            <GlobeIcon />
          </button>
          <button className="hover:text-gray-300">
            <BellIcon />
          </button>
          <UserMenu />
          {/* <div className="flex items-center space-x-2">
            <UserCircleIcon />
            <div>
              <div>{user}</div>
              <div className="text-xs text-gray-300">{role}</div>
            </div>
            <button className="hover:text-gray-300">
              <ChevronDownIcon />
            </button>
          </div> */}
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="pt-20 fixed w-16 bg-white min-h-screen p-2 shadow-md flex flex-col items-center space-y-6">
          <button className="p-2 rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300">
            <HomeIcon />
          </button>
          {/* <button className="p-2 rounded-md text-gray-600 hover:bg-gray-200">
            <UploadIcon />
          </button>
          <button className="p-2 rounded-md text-gray-600 hover:bg-gray-200">
            <DocumentIcon />
          </button>
          <button className="p-2 rounded-md text-gray-600 hover:bg-gray-200">
            <UserGroupIcon />
          </button> */}
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-16 w-full overflow-x-hidden mt-20 p-2 ">
          {/* <div className="bg-white rounded-lg shadow p-4 mb-8 max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow h-40"></div>
            ))}
          </div> */}
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-black-600 text-xs p-3 fixed bottom-0 w-full">
        <div className="flex justify-between items-center">
          <span className="ml-16">
            © {new Date().getFullYear()} Regions Bank. NMLS 174490. 1900 5th
            Avenue North, Birmingham, AL 35203. All Rights Reserved.
          </span>
          <RegionsLogo pyramidColor="#5a8a22" showLockup={false} />
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
