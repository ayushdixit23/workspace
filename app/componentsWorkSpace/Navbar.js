import React, { useMemo } from "react";
import Link from "next/link";
import ComIcon from "../assets/icons/ComIcon";
import DashIcon from "../assets/icons/DashIcon";
import { usePathname } from "next/navigation";
import Store from "../assets/icons/Store";
import Logo from "../assets/icons/Logo";
import Earning from "../assets/icons/Earning";
import SettingIcon from "../assets/icons/SettingIcon";

function NavBar() {
  const MemoizedDashIcon = useMemo(() => DashIcon, [])
  const MemoizedComIcon = useMemo(() => ComIcon, [])
  const MemoizedStore = useMemo(() => Store, [])
  const MemoizedEarning = useMemo(() => Earning, [])
  const MemoizedSettingIcon = useMemo(() => SettingIcon, [])
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

      <div className="h-[100vh] bg-white p-1 vs:max-sm:hidden ">
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
                  className={`flex items-center gap-2 duration-150  ${path === item.path ? "" : "text-black"
                    }`}
                >
                  <div
                    className={` duraction-100 ${path === item.path
                      ? "h-10 w-1 rounded-full bg-black"
                      : "h-0 w-0"
                      }`}
                  ></div>
                  <div>
                    <Link href={item.path} className="flex items-center">
                      <div className="sm:max-md:my-4 sm:max-md:mx-2">
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
      </div>

      {/*Tabbar*/}
      <div className="h-14 sm:hidden bottom-0  z-50 border-t-2 border-[#f5f5f5] bg-white fixed w-[100%] ">
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
