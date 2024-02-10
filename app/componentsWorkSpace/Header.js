"use client"
import React, { useEffect, useMemo, useState } from "react";
import Workspaceicon from "../assets/icons/Logo";
import Notify from "../assets/icons/Notify";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { getData } from "../utilsHelper/Useful";
import { getItemSessionStorage } from "../utilsHelper/Tokenwrap";
import { deleteCookie } from "cookies-next";
import { ModeToggle } from "./ModeToggle";

function Header() {
  const [prof, setProf] = useState(true);
  const router = useRouter()
  const [pic, setPic] = useState();
  const [name, setName] = useState()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { dp, fullname } = getData()
  const MemoizedWorkspaceIcon = useMemo(() => Workspaceicon, []);
  const sessionId = getItemSessionStorage()
  const MemoizedNotify = useMemo(() => Notify, [])
  useEffect(() => {
    setName(fullname)
    setPic(dp)
  }, [fullname])

  const logout = () => {
    try {
      deleteCookie(`excktn${sessionId}`)
      deleteCookie(`sessionId_${sessionId}`)
      deleteCookie(`frhktn${sessionId}`)
      setOpen(false)
      router.push("/login")
      console.log("Fds")
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpen = () => {
    setOpen(!open)
  }

  return (

    <>

      <div onClick={() => setOpen(false)} className={`${open ? "fixed inset-0 w-screen h-screen z-50" : "-z-50"}`}></div>
      <div className={`flex dark:bg-[#273142] items-center py-3 sm:rounded-3xl bg-white justify-between px-6 ${pathname == "/main/community" ? "sm:mx-4" : ""} w-full vs:max-sm:px-4`}>
        <div className="sm:hidden">
          <MemoizedWorkspaceIcon />
        </div>

        <div className="text-[22px] font-semibold vs:max-sm:hidden">
          {pathname == "/main/settings" ? "Settings" : null}
          {pathname == "/main/earnings" ? "Earnings" : null}
          {/* {(pathname.startsWith("/main/dashboard") || pathname.startsWith("/main/community") || pathname.startsWith("/main/store")) && <div className="font-bold">Hey, {name}</div>} */}

          {/* {(pathname.startsWith("/main/dashboard") || pathname.startsWith("/main/community") || pathname.startsWith("/main/store")) && <div className="font-bold">Hey, {name}</div>} */}
          {!(pathname == "/main/settings" || pathname == "/main/earnings") && <div className="font-bold">Hey, {name}</div>}


        </div>
        <div className="flex justify-center items-center gap-3">
          <div className="flex justify-center
           items-center">
            {/* <MemoizedNotify /> */}
            <ModeToggle />
          </div>


          <div onClick={handleOpen} className="relative group cursor-pointer">
            {pic !== null ? (
              <Image
                src={pic}
                alt="dp"
                height={100}
                width={100}
                className="h-10 w-10 cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
              />
            ) : (
              <div
                onClick={() => setProf(!prof)}
                className="h-10 w-10 bg-red-600 cursor-pointer flex justify-center items-center rounded-[18px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
              />
            )}
            <div className={` ${open ? "absolute top-9 z-[200] w-[100px] sm:w-[120px] rounded-xl shadow-md right-0 bg-white" : "hidden"}`}>
              <button
                onClick={logout}
                className="p-2 px-5 text-red-700 z-[200] cursor-pointer w-full font-semibold text-center sm:text-lg">Log Out</button>
            </div>
          </div>
        </div>
      </div >
    </>

  );
}

export default Header;
