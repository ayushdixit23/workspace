"use client"
import React, { useEffect } from "react";
import useTokenAndData from "./tokens";
import { useDispatch } from "react-redux";
import { changelaoding, sendData } from "../redux/slice/userData";
import { getCookie, setCookie } from 'cookies-next';
import { ThemeProvider } from "@/components/theme-provider";
import { redirect, usePathname } from "next/navigation";

export const storeInSessionStorage = (sessionId) => {
  try {
    setCookie(`sessionId_${sessionId}`, sessionId, { secure: false })
    if (typeof window !== undefined) {
      // localStorage.setItem(`sessionId${sessionId}`, sessionId)
      sessionStorage.setItem("sessionId", sessionId);
    }
  } catch (error) {
    console.log(error);
  }
}

export const getItemSessionStorage = () => {
  try {

    if (typeof window != undefined) {
      const sessionId = sessionStorage.getItem("sessionId");
      return sessionId;
    }
  } catch (error) {
    console.log(error);
  }
}


// export const storeInSessionStorage = (sessionId) => {
//   try {
//     if (typeof window !== undefined) {
//       localStorage.setItem(`sessionId`, sessionId)
//       sessionStorage.setItem("sessionId", sessionId);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const getItemSessionStorage = () => {
//   try {

//     if (typeof window != undefined) {
//       const lsessionId = sessionStorage.getItem("sessionId");
//       let sessionId
//       sessionId = localStorage.getItem(`sessionId`)
//       return sessionId;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

const TokenDataWrapper = ({ children }) => {
  const { isValid, data } = useTokenAndData();
  const sessionId = getItemSessionStorage()
  const dispatch = useDispatch();
  const path = usePathname()
  const token = getCookie(`frhktn${sessionId}`)

  useEffect(() => {
    if (isValid) {
      dispatch(changelaoding({ loading: false }));
      dispatch(sendData(data))
    }

    if (!token && (path !== "/login" && path !== "/aybdhw")) {
      redirect("/login");
    }

    if (token && (path === "/login" || path === "/aybdhw")) {
      redirect("/main/dashboard");
    }
  }, [isValid, data, dispatch]);
  return <>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  </>;
};

export default TokenDataWrapper;
