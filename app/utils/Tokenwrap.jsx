"use client"
import React, { useEffect } from "react";
import useTokenAndData from "../utils/tokens";
import { useDispatch } from "react-redux";
import { changelaoding, sendData } from "../redux/slice/userData";
import Cookies from "js-cookie";
import { getData } from "./Useful";

export const storeInSessionStorage = (sessionId) => {
  try {
    Cookies.set(`sessionId_${sessionId}`, sessionId)

    sessionStorage.setItem("sessionId", sessionId)
  } catch (error) {
    console.log(error)
  }
}

export const getItemSessionStorage = () => {
  try {
    const sessionId = sessionStorage.getItem("sessionId")
    return sessionId
  } catch (error) {
    console.log(error)
  }
}

const TokenDataWrapper = ({ children }) => {
  const { isValid, data } = useTokenAndData();
  const dispatch = useDispatch();
  const { id } = getData()

  useEffect(() => {
    if (isValid) {
      dispatch(changelaoding({ loading: false }));
      dispatch(sendData(data))
      console.log("runnded")
    }
  }, [isValid, data, dispatch]);
  return <>{children}</>;
};

export default TokenDataWrapper;
