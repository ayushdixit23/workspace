"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { auth } from "../../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { CgSpinner } from "react-icons/cg";
const DynamicOtpInput = dynamic(() => import('otp-input-react'), { ssr: false });
import { useDispatch } from "react-redux";
import { changelaoding } from "@/app/redux/slice/userData";
import { encryptaes, decryptaes } from "@/app/utilsHelper/security";
import { useEmailLoginMutation, useLoginMutation } from "@/app/redux/apiroutes/userLoginAndSetting";
import { QRCodeSVG } from "qrcode.react";
import { RiLoader4Line } from "react-icons/ri";
import { database } from "@/firebase.config";
import { useLoginWithQrMutation } from "@/app/redux/apiroutes/userLoginAndSetting";
import useTokenAndData from "@/app/utilsHelper/tokens";
import toast, { Toaster } from "react-hot-toast";
import { storeInSessionStorage } from "@/app/utilsHelper/Tokenwrap";
import { setCookie } from 'cookies-next';


function page() {
  const [otp, setOtp] = useState("")
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingqr, setLoadingqr] = useState(false)
  const [showOTP, setShowOTP] = useState(false);
  const [seconds, setSeconds] = useState(30)
  const [isActive, setIsActive] = useState(true);
  const [come, setCome] = useState(0);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [change, setChange] = useState(1);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { generateData } = useTokenAndData()
  const [emailLogin] = useEmailLoginMutation();

  const handleOtpChange = (otp) => {
    try {
      setOtp(otp)
    } catch (error) {
      toast.error("Something Went Wrong!")
      console.log(error)
    }
  }

  useEffect(() => {
    let interval;
    if (seconds === 0) {
      setSeconds(0);
      setIsActive(true);
      setCome(come + 1);
    }
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      if (seconds === 0) {
        setSeconds(0);
        setCome(1);
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    onSignup();
    setSeconds(30);
  };

  const waitkrnevalafunc = async (data) => {
    try {
      console.log(data.sessionId)
      storeInSessionStorage(data.sessionId)
      setCookie(`excktn${data.sessionId}`, data.access_token, { secure: false })
      setCookie(`frhktn${data.sessionId}`, data.refresh_token, { secure: false })
      toast.success("success");
      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchid = async () => {
    try {
      const updatedNumber = "91" + number
      const en = encryptaes(updatedNumber)
      const result = await login({
        phone: en,
      });

      if (result.data?.success) {
        const a = await waitkrnevalafunc(result.data);
        if (a === true) {
          dispatch(
            changelaoding({
              loading: true,
              path: `/main/dashboard`,
            })
          );
          setLoading(false);
        }
        setLoading(false);
      } else {
        toast.error("You Dont have Account");
      }
    } catch (err) {
      console.log(err);
    }
  };

  function onCaptchaVerify() {

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {

          },
        }
      );
    }

  }

  function onSignup() {
    if (!number) {
      toast.error("Enter the Phone Number")
      return
    }
    if (number.length !== 10) {
      toast.error("Please Enter 10 digit number")
    }
    setLoading(true);
    onCaptchaVerify();
    setSeconds(30);
    const appVerifier = window.recaptchaVerifier;
    const updatedNumber = "91" + number
    signInWithPhoneNumber(auth, "+" + updatedNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("Successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        fetchid();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }


  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast.error("Enter All Details");
      return;
    }
    try {
      setLoading(true)
      const encryptedPassword = encryptaes(password)
      const res = await emailLogin({
        email,
        password: encryptedPassword
      })
      console.log(res.data)
      await waitkrnevalafunc(res.data);
      dispatch(
        changelaoding({
          loading: true,
          path: `/main/dashboard`,
        })
      );
      // router.push("/main/dashboard")
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const [qrCodeValue, setQRCodeValue] = useState("");
  const newRandomString = generateRandomString(17);
  const starCountRef = ref(database, `/qr/`);
  const strignref = useRef(null);
  const [qrlogin] = useLoginWithQrMutation();

  function generateRandomString(length) {
    const characters = "0123456789abcdefghijklmnopqrstuvwxyz";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return randomString;
  }

  const writeUserData = useCallback(async (newRandomString) => {
    set(ref(database, `/qr/${newRandomString}/`), { data: "null" });
  }, []);

  const updateRandomString = useCallback(() => {
    strignref.current = newRandomString;
    setQRCodeValue(newRandomString);
    writeUserData(newRandomString);
  }, []);

  useEffect(() => {
    updateRandomString();
    // const intervalId = setInterval(updateRandomString, 60000);
    const unsub = onValue(starCountRef, async (snapshot) => {
      const data = snapshot.val();
      if (
        strignref.current &&
        data[strignref.current]?.data !== "null" &&
        loading === false
      ) {
        const fd = decryptaes(data[strignref.current]?.data);
        setLoadingqr(true);
        if (fd) {
          const dataforSend = JSON.parse(fd);
          const res = await qrlogin({
            id: dataforSend?.id,
          });
          if (res.data?.success) {
            const check = await waitkrnevalafunc(res.data);

            setTimeout(async () => {
              if (check === true) {
                await generateData(res.data.access_token)
                router.push("/main/dashboard");
              }
              setTimeout(() => {
                const reref = ref(database, `/qr/${strignref.current}/`);
                remove(reref)
                  .then(() => {
                    console.log("Data deleted successfully");
                    setLoadingqr(false);
                  })
                  .catch((error) => {
                    console.error("Error deleting data:", error.message);
                  });
              }, 2000);
            }, 3000);
          }
        }
      }
    });

    return () => {
      unsub();
      //  clearInterval(intervalId);
    };
  }, []);


  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />

      <div id="recaptcha-container"></div>
      {showOTP ? (
        // OTP
        <div className="items-center flex flex-col justify-between">
          <div className="font-bold  pn:max-sm:text-[30px] text-[25px] dark:text-white text-[#313C58] ">
            Verification
          </div>
          <div className="flex flex-col py-2 justify-center items-center">
            <div className="text-[#96A0AD] text-[15px] pn:max-sm:text-[12px] ">
              We’re sending an SMS to phone number
            </div>
            <div className="text-[#96A0AD] pn:max-sm:text-[12px] text-[15px] ">
              <span className="text-[#0075FF]">{number}</span> Wrong Number ?
            </div>
          </div>

          <>
            <DynamicOtpInput
              value={otp}
              onChange={handleOtpChange}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container sm:mt-3"
            ></DynamicOtpInput>
          </>
          <div className="text-black font-semibold flex text-[15px] pt-6">
            <div className="text-center">
              {come === 1 ? (
                <div className="space-x-4 flex ">
                  <div className="text-[#3e3e3e]">
                    Don't receive code ?{" "}
                    <button
                      className={` text-blue-600 rounded ${isActive ? "" : ""
                        } `}
                      onClick={toggleTimer}
                    >
                      Request Again
                    </button>
                  </div>
                </div>
              ) : (
                <h1
                  className={`${come === 1 ? "hidden" : "text-[16px] font-normal dark:text-white text-[#3e3e3e]"
                    } `}
                >
                  Resend: <span className="font-semibold">00:{seconds}</span>
                </h1>
              )}
            </div>
          </div>
          <div
            onClick={onOTPVerify}
            className="h-[50px] w-[250px] select-none cursor-pointer bg-black mt-8 flex items-center justify-center rounded-2xl text-white"
          >
            {loading && <CgSpinner size={20} className="m-1 animate-spin" />}
            <span className={`${loading ? "hidden" : ""} `}>Continue</span>
          </div>
        </div>
      ) : (
        // Phone
        <div className="flex flex-col justify-between items-center">
          <div className="mb-5 flex gap-3 pn:max-sm:hidden justify-center items-center flex-col">
            <div className="relative">
              <QRCodeSVG
                style={{
                  width: "200px",
                  height: "200px",
                }}
                value={qrCodeValue}
              />
              {loadingqr && (
                <div className="w-[200px] bg-white opacity-50 absolute top-0 left-0 h-[200px] flex justify-center items-center ">
                  <div className="animate-spin">
                    <RiLoader4Line className="text-3xl" />
                  </div>
                </div>
              )}
            </div>

            <div className="text-xl font-semibold">Sign in with QR code</div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="max-w-[70%] text-sm text-[#9095A0] text-center">
                Use your phone camera to scan this code to log in instanly
              </div>
            </div>
          </div>

          <div className="flex pn:max-sm:hidden items-center justify-center w-full">
            <hr className="flex-grow border-t text-[#9095A0] border-[#9095A0] " />
            <span className="px-3 font-medium text-[#9095A0] dark:bg-[#273142] bg-white ">
              or Sign in with
            </span>
            <hr className="flex-grow border-t text-[#9095A0] border-[#9095A0]" />
          </div>

          {/* switcher */}

          <div className="grid grid-cols-1 w-full md:w-[90%]">
            <div className=" w-full flex rounded-xl dark:text-white select-none text-[14px]">
              <div
                onClick={() => {
                  setChange(1);
                }}
                className={`m-1 flex justify-center items-center h-8 w-full z-10 ${change === 1 ? 'font-bold border-b-2 border-blue-600' : 'cursor-pointer'
                  }`}
              >
                Phone no.
              </div>
              <div
                onClick={() => {
                  setChange(2);
                }}
                className={`m-1 flex justify-center items-center h-8 w-full z-10 ${change === 2 ? 'font-bold border-b-2 border-blue-600' : 'cursor-pointer'
                  }`}
              >
                Email
              </div>
            </div>
          </div>

          {/* phone */}
          <div
            className={`${change === 1
              ? "flex justify-start flex-col items-start  py-4"
              : "hidden"
              } `}
          >
            <div className="text-sm pb-3 px-1 dark:text-white font-semibold text-[#424856]">Enter Your Phone Number</div>
            <div className="bg-[#f7f7f7] dark:bg-[#323d4e] flex items-center dark:border-[#8f9bba] border w-[300px] justify-center rounded-2xl">
              <div className="border-r-2 dark:border-[#8f9bba] sm:-ml-3 p-1 sm:pr-2 "> +91</div>
              <input value={number} onChange={(e) => setNumber(e.target.value)} type="tel"
                className=" p-2 outline-none rounded-xl dark:bg-[#323d4e] bg-[#f7f7f7]" />

            </div>
          </div>
          <div className={`${change === 1 ? "py-5 " : "hidden"} `}>
            <div
              onClick={onSignup}
              //onClick={fetchid}
              className="h-[50px] w-[300px] select-none cursor-pointer bg-black  flex items-center justify-center rounded-2xl text-white "
            >
              {loading && <CgSpinner size={20} className="m-1 animate-spin" />}
              <span className={`${loading ? "hidden" : ""} `}>Send Otp</span>
            </div>
          </div>
          {/* email */}
          <div className={`${change === 2 ? "" : "hidden"} `}>
            <div>
              <div className="text-black dark:text-[#fff] pn:max-sm:text-[15px] text-[15px] py-2">
                Email
              </div>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-3 w-[300px] dark:bg-[#3d4654] bg-[#f7f7f7] rounded-2xl px-4 "
                placeholder="Enter your email"
              />
            </div>
            <div>
              <div className="text-black dark:text-[#fff] pn:max-sm:text-[15px] text-[15px] py-2">
                Password
              </div>

              <input
                type="tel"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-3 w-[300px]  bg-[#f7f7f7] dark:bg-[#3d4654] rounded-2xl px-4 "
                placeholder="Enter your Password"
              />
            </div>
            <div className="py-5 ">
              <div
                onClick={handleEmailLogin}
                className="py-3 w-[300px] select-none cursor-pointer bg-black  flex items-center justify-center rounded-2xl text-white "
              >
                {loading && <CgSpinner size={20} className="m-1 animate-spin" />}
                <span className={`${loading ? "hidden" : ""} `}>Continue</span>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >
  );
}

export default page;
