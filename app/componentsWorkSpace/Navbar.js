import React, { useMemo } from "react";
import Link from "next/link";
import ComIcon from "../assets/icons/ComIcon";
import DashIcon from "../assets/icons/DashIcon";
import { usePathname } from "next/navigation";
import Store from "../assets/icons/Store";
import Logo from "../assets/icons/Logo";
import Earning from "../assets/icons/Earning";
import SettingIcon from "../assets/icons/SettingIcon";
import { MdOutlineLogout } from "react-icons/md";

function NavBar() {
  const MemoizedDashIcon = useMemo(() => DashIcon, [])
  const MemoizedComIcon = useMemo(() => ComIcon, [])
  const MemoizedStore = useMemo(() => Store, [])
  const MemoizedEarning = useMemo(() => Earning, [])
  const MemoizedLogo = useMemo(() => Logo, [])
  const navItems = [
    {
      label: "Dashboard",
      path: "/main/dashboard",
      icon: <MemoizedDashIcon className="sm:h-10 sm:w-10 h-8 w-8" />,
    },
    {
      label: "Community",
      path: "/main/community",
      icon: <MemoizedComIcon className="sm:h-7 sm:w-7 h-8 w-8" />,
    },
    {
      label: "Store",
      path: "/main/store",
      icon: <MemoizedStore className="sm:h-7 sm:w-7 h-8 w-8" />,
    },
    // {
    //   label: "Customization ",
    //   path: "/main/customiz",
    //   icon: <Edit className="sm:h-7 sm:w-7 h-8 w-8" />,
    // },
    {
      label: "Earnings",
      path: "/main/earnings",
      icon: <MemoizedEarning className="sm:h-7 sm:w-7 h-8 w-8" />,
    },

  ];
  const path = usePathname();
  return (
    <div>
      {/*sidebar*/}
      {/* 
      <div className="h-[100vh] dark:text-white dark:bg-[#273142] bg-white p-1 vs:max-sm:hidden ">
        <div className="flex flex-col justify-between pt-10 h-[95vh]">
          <div className="flex items-center gap-1 justify-center">
            <MemoizedLogo />
            <span className="text-[20px] font-bold vs:max-md:hidden  ">
              Workspace
            </span>
          </div>
          <nav>
            <ul className="flex flex-col justify-between">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 duration-150  ${path === item.path ? "" : ""
                    }`}
                >
                  <div
                    className={` duraction-100 ${path === item.path
                      ? "h-10 w-1 rounded-full dark:bg-white bg-black"
                      : "h-0 w-0"
                      }`}
                  ></div>
                  <div>
                    <Link href={item.path} className="flex items-center">
                      <div className="sm:max-md:my-4 dark:text-white sm:max-md:mx-2">
                        {item.icon}
                      </div>

                      <div
                        className={`p-4 vs:max-md:hidden  ${path === item.path ? "font-bold" : "font-medium"
                          }`}
                      >
                        {item.label}
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col justify-center items-center relative -left-3">
            <div className="flex gap-3 h-[60px] items-center">
              <MemoizedSettingIcon className="w-2 h-2" />
              <Link
                href={"/main/settings"}
                className="font-medium vs:max-md:hidden "
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      <aside className="flex flex-col md:w-64 sm:w-[86px] h-screen px-4 pn:max-sm:hidden py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">

        <div className="flex sm:max-md:items-center sm:max-md:justify-center gap-2 pt-3">
          <MemoizedLogo />
          <span className="md:text-[24px]  sm:max-md:hidden font-bold ">
            Workspace
          </span>
        </div>

        <div className="flex flex-col sm:max-md:text-sm justify-between flex-1 mt-16">
          <nav>
            <Link className="flex items-center px-4 py-2 gap-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200" href="/main/dashboard">
              <svg className="w-5 h-5 sm:max-md:w-11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">Dashboard</span>
            </Link>

            <Link className="flex items-center px-4 py-2 gap-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/main/community">
              <svg className="w-5 h-5 sm:max-md:w-11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">Community</span>
            </Link>

            <Link className="flex items-center px-4 py-2 gap-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/main/store">
              <svg className="w-5 h-5 sm:max-md:w-11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">Store</span>
            </Link>

            <Link className="flex items-center px-4 py-2 gap-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/main/customization">
              <svg className="w-5 h-5 sm:max-md:w-11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">Customization</span>
            </Link>

            <hr className="my-6 border-gray-200 dark:border-gray-600" />

            <Link className="flex items-center px-4 py-2 gap-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/main/earnings">
              <svg className="w-5 h-5 sm:max-md:w-11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">Earings</span>
            </Link>

            <Link className="flex items-center px-4 py-2 gap-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/main/settings">
              <svg className="w-5 h-5 sm:max-md:w-11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span className=" sm:max-md:hidden sm:max-md:text-sm font-medium">Settings</span>
            </Link>
          </nav>

          <a href="#" className="flex items-center px-4 -mx-2">
            {/* <img className="object-cover mx-2 rounded-full h-9 w-9" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" /> */}
            <MdOutlineLogout className="text-2xl" />
            <span className="mx-2  sm:max-md:hidden font-medium text-gray-800 dark:text-gray-200">Log Out</span>
          </a>
        </div>
      </aside>

      {/*Tabbar*/}
      <div className="h-14 sm:hidden bottom-0 dark:text-white dark:bg-[#273142] z-50 light:border-t-2 light:border-[#f5f5f5] bg-white fixed w-[100%] ">
        <nav className="z-20">
          <ul className="flex justify-between px-4">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={` flex-col flex justify-center items-center duration-150  ${path === item.path ? "" : "text-black"
                  }`}
              >
                <div
                  className={`duraction-100 ${path === item.path
                    ? "h-1 w-10 rounded-full bg-black"
                    : "h-0 w-0"
                    }`}
                ></div>
                <div className="h-10 w-10 pt-2">
                  <Link
                    href={item.path}
                    className="flex justify-center items-center"
                  >
                    <div>{item.icon}</div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
