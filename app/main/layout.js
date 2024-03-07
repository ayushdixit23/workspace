"use client";
import { usePathname } from "next/navigation";
import Header from "../componentsWorkSpace/Header";
import NavBar from "../componentsWorkSpace/Navbar";
import { memo } from "react";
import { useSelector } from "react-redux";

export default function MainLayout({ children }) {
  const MemorizedNav = memo(NavBar);
  const MemorizedHeader = memo(Header);
  const path = usePathname()
  const isLoading = useSelector((state) => state.userData.isLoading)

  return (
    <div>
      <div className="bg-[#f1f1f1] dark:bg-[#1b2431] font-nunito duration-75 min-h-screen w-screen flex overflow-auto no-scrollbar">
        <div className={` ${path === "/main/community/editCommunity" || path === "/main/community/createCommunity" || path === "/main/store/addproduct" || path === "/main/store/editproduct" || isLoading ? "pn:max-sm:hidden " : null} h-full `}>
          <MemorizedNav />
        </div>
        <div className="w-full dark:bg-[#1b2431]  overflow-y-scroll no-scrollbar 
          h-screen bg-[#F8F9FC] sm:p-4">
          <div className="bg-[#fafafa] dark:bg-[#1b2431] w-full h-full pn:max-sm:z-30 rounded-t-[34px]">
            <div className="sm:hidden sticky top-0 left-0 w-full h-[10%] z-30">
              <MemorizedHeader />
            </div>
            <div className={`${path === "/main/community" ? "pn:max-sm:bg-white" : null} flex flex-col  h-full bg-[#F8F9FC] dark:bg-[#1b2431]  rounded-t-[26px] gap-4`}>
              <div className="pn:max-sm:hidden  pn:max-sm:z-20 flex h-[10%] justify-center items-center">
                <MemorizedHeader />
              </div>
              <div className={`pn:max-sm:z-20 sm:rounded-xl dark:bg-[#1b2431] max-w-full w-full h-full overflow-y-scroll
               no-scrollbar
               `}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
// ${path == "/main/dashboard" ? "pn:max-sm:overflow-y-scroll  pn:max-sm:no-scrollbar" : "overflow-y-scroll no-scrollbar"} 