"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../data/Loader";
import Cookies from "js-cookie";
import { encryptaes } from "../utilsHelper/security";
import { useDispatch } from "react-redux";
import { sendData } from "../redux/slice/userData";

const Component = () => {
  const queryParams = useSearchParams();
  const id = queryParams.get("zyxxpht");
  const path = queryParams.get("path");
  const dps = queryParams.get("dps");
  const title = queryParams.get("title");
  const category = queryParams.get("category");
  const desc = queryParams.get("desc");
  const type = queryParams.get("type");
  const dispatch = useDispatch();
  const memberscount = queryParams.get("memberscount");
  const comId = queryParams.get("comId");

  const tosetCookie = {
    dps,
    title,
    category,
    desc,
    type,
    memberscount,
  };

  const router = useRouter();
  const waitkrnevalafunc = async (data) => {
    try {
      // storeInSessionStorage(data.sessionId)

      console.log(data, "my res data");

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      Cookies.set(`excktn`, data.access_token, { expires: expirationDate });
      Cookies.set(`frhktn`, data.refresh_token, { expires: expirationDate });

      localStorage.setItem("isCreator", data?.isCreator);

      dispatch(sendData(data?.data));

      if (comId) {
        Cookies.set("comedta", JSON.stringify(tosetCookie));
        Cookies.set("cmdyd", encryptaes(comId));
      }
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const f = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/fetchwithid/${id}`
      );

      if (res.data?.success) {
        const a = await waitkrnevalafunc(res.data);
        if (a === true) {
          if (path) {
            router.push(path);
          } else {
            router.push("/main/dashboard");
          }
        } else {
          router.push("/login");
        }
      } else {
        toast.error("Something Went Wrong");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      f();
    }
  }, [id]);

  return (
    <>
      <Loader />
    </>
  );
};

export default Component;
