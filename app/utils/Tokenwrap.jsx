"use client"
import React, { useEffect } from "react";
import useTokenAndData from "../utils/tokens";
import { useDispatch } from "react-redux";
import { changelaoding, sendData } from "../redux/slice/userData";
import Cookies from "js-cookie";

export const storeInSessionStorage = (sessionId) => {
  try {
    Cookies.set("sessionId", sessionId)
  } catch (error) {
    console.log(error)
  }
}
export const getItemSessionStorage = () => {
  try {
    const sessionId = Cookies.get("sessionId")
    return sessionId
  } catch (error) {
    console.log(error)
  }
}


// export const storeInSessionStorage = (sessionId) => {
//   try {
//     sessionStorage.setItem("sessionId", sessionId)
//   } catch (error) {
//     console.log(error)
//   }
// }
// export const getItemSessionStorage = () => {
//   try {
//     let sessionId
//     if (typeof window !== undefined) {
//       sessionId = sessionStorage.getItem("sessionId")
//     } else {
//       sessionId = 10
//     }
//     return sessionId
//   } catch (error) {
//     console.log(error)
//   }
// }

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
