"use client";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import { memo } from "react";
import { useSelector } from "react-redux";

export default function MainLayout({ children }) {
  const MemorizedNav = memo(NavBar);
  const MemorizedHeader = memo(Header);
  const path = usePathname()
  const isLoading = useSelector((state) => state.userData.isLoading)

  return (
    <div>
      <div className="bg-[#f1f1f1]  vs:max-sm:h-[95.5vh] font-nunito duration-75 min-h-screen w-screen flex overflow-auto scrollbar-hide">
        <div className={`${path === "/main/community/editCommunity" || path === "/main/community/createCommunity" || path === "/main/store/addproduct" || path === "/main/store/editproduct" || isLoading ? "pn:max-sm:hidden" : null} h-full pn:max-sm:z-50 z-20`}>
          <MemorizedNav />
        </div>
        <div className="w-full overflow-y-scroll scrollbar-hide 
          max-h-[100vh] bg-[#F8F9FC] sm:p-4">
          <div className="bg-[#fafafa]  w-full h-fit z-30 rounded-t-[34px]">
            <div className="sm:hidden w-full h-[10vh] z-10">
              <MemorizedHeader />
            </div>
            <div className={`${path === "/main/community" ? "pn:max-sm:bg-white" : null} flex flex-col bg-[#F8F9FC] rounded-t-[26px] gap-4`}>
              <div className="pn:max-sm:hidden z-20 flex h-[10vh] justify-center items-center">
                <MemorizedHeader />
              </div>
              <div className={`z-20 rounded-xl max-w-full w-full max-h-[83vh] ${path == "/main/dashboard" ? "pn:max-sm:overflow-y-scroll pn:max-sm:scrollbar-hide" : "overflow-y-scroll scrollbar-hide"} `}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
