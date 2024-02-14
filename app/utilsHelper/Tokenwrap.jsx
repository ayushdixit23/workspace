"use client"
import React, { useEffect } from "react";
import useTokenAndData from "./tokens";
import { useDispatch } from "react-redux";
import { changelaoding, sendData } from "../redux/slice/userData";
import { deleteCookie, setCookie } from 'cookies-next';
import { ThemeProvider } from "@/components/theme-provider";
import { getData } from "./Useful";

// export const storeInSessionStorage = (sessionId) => {
//   try {
//     Cookies.set(`sessionId_${sessionId}`, sessionId)
//     sessionStorage.setItem("sessionId", sessionId)
//   } catch (error) {
//     console.log(error)
//   }
// }

// export const getItemSessionStorage = () => {
//   try {
//     const sessionId = sessionStorage.getItem("sessionId")
//     return sessionId
//   } catch (error) {
//     console.log(error)
//   }
// }

export const storeInSessionStorage = (sessionId) => {
  try {
    console.log("runnded")
    // Check if sessionStorage is available before using it
    setCookie(`sessionId_${sessionId}`, sessionId, { secure: false })
    localStorage.setItem(`sessionId${sessionId}`, sessionId)
    if (typeof window !== undefined) {
      sessionStorage.setItem("sessionId", sessionId);
    }
  } catch (error) {
    console.log(error);
  }
}

export const getItemSessionStorage = () => {
  try {
    // Check if sessionStorage is available before using it
    if (typeof window != undefined) {
      const sessionId = sessionStorage.getItem("sessionId");
      let lsessionId
      lsessionId = localStorage.getItem(`sessionId${sessionId}`)
      if (sessionId) {
        localStorage.setItem(`sessionId${sessionId}`, sessionId)
        lsessionId = localStorage.getItem(`sessionId${sessionId}`)
      }
      return { sessionId, lsessionId };
    }
  } catch (error) {
    console.log(error);
  }
}

// const clearCookies = (sessionId) => {
//   deleteCookie(`excktn${sessionId}`, { path: '/' });
//   deleteCookie(`sessionId_${sessionId}`, { path: '/' });
//   deleteCookie(`frhktn${sessionId}`, { path: '/' });
// }

const TokenDataWrapper = ({ children }) => {
  const { isValid, data } = useTokenAndData();
  // const { sessionId } = getData()
  const dispatch = useDispatch();

  useEffect(() => {
    if (isValid) {
      dispatch(changelaoding({ loading: false }));
      dispatch(sendData(data))
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
