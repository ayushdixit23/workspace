"use client"
import React, { useEffect } from "react";
import useTokenAndData from "../utils/tokens";
import { useDispatch, useSelector } from "react-redux";
import { changelaoding, sendData } from "../redux/slice/userData";

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
