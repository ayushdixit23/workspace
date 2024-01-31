"use client"
import React, { useEffect } from "react";
import useTokenAndData from "../utils/tokens";
import { useDispatch } from "react-redux";
import { changelaoding, sendData } from "../redux/slice/userData";
import { setCookie } from 'cookies-next';

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
    // Check if sessionStorage is available before using it
    if (typeof window !== undefined) {
      setCookie(`sessionId_${sessionId}`, sessionId, { secure: true })
      sessionStorage.setItem("sessionId", sessionId);
    }
  } catch (error) {
    console.log(error);
  }
}

export const getItemSessionStorage = () => {
  try {
    // Check if sessionStorage is available before using it
    if (typeof window !== 'undefined') {
      const sessionId = sessionStorage.getItem("sessionId");
      return sessionId;
    }
  } catch (error) {
    console.log(error);
  }
}

const TokenDataWrapper = ({ children }) => {
  const { isValid, data } = useTokenAndData();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isValid) {
      dispatch(changelaoding({ loading: false }));
      dispatch(sendData(data))
    }
  }, [isValid, data, dispatch]);
  return <>{children}</>;
};

export default TokenDataWrapper;
