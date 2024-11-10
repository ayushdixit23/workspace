"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { CgSpinner } from "react-icons/cg";
const DynamicOtpInput = dynamic(() => import("otp-input-react"), {
  ssr: false,
});
import { useDispatch } from "react-redux";
import { changelaoding, sendData } from "@/app/redux/slice/userData";
import { encryptaes, decryptaes } from "@/app/utilsHelper/security";
import {
  useEmailLoginMutation,
  useEmailOtpLoginMutation,
  useLoginMutation,
  useVerifyEmailOtpMutation,
} from "@/app/redux/apiroutes/userLoginAndSetting";
import QRCode from "qrcode.react";
import { RiLoader4Line } from "react-icons/ri";
import { database } from "@/firebase.config";
import { useLoginWithQrMutation } from "@/app/redux/apiroutes/userLoginAndSetting";
import toast, { Toaster } from "react-hot-toast";
import workspace from "../../assets/image/workspace.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { initOTPless } from "@/app/utilsHelper/initOtpless";
import { errorMaker } from "@/app/utilsHelper/Useful";
import {
  reconnectSocket,
  useSocketContext,
} from "@/app/utilsHelper/SocketWrapper";
import logo from "../../assets/image/Logo.png";
// import Cookies from "js-cookie";

function page() {
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingqr, setLoadingqr] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [come, setCome] = useState(0);
  const { socket } = useSocketContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailOtpRef = useRef();
  const [change, setChange] = useState(1);
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const otpInputRef = useRef(null);
  const [emailLogin] = useEmailLoginMutation();
  const [emailOtpLogin] = useEmailOtpLoginMutation();
  const [verificationEmailOtp] = useVerifyEmailOtpMutation();
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [emailOtp, setEmailOtp] = useState(false);

  const handleOtpChange = (otp) => {
    try {
      setOtp(otp);
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.log(error);
    }
  };

  const handleEmailOtpChange = (otp) => {
    try {
      setEmailOtp(otp);
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.log(error);
    }
  };

  const verifyOtpEmail = async (e) => {
    e.preventDefault();
    try {
      if (emailOtp.length !== 6) {
        toast.error("Enter 6 digit otp!");
        return;
      }

      const data = {
        email,
        otp: emailOtp,
      };

      const res = await verificationEmailOtp(data);
      if (!res.data.success) {
        if (res.data.userexists === false) {
          toast.error("User Not Found!");
          return;
        } else if (res.data.otpSuccess === false) {
          toast.error("Otp Verification Failed!");
          return;
        } else {
          toast.error("Something Went Wrong!");
          return;
        }
      } else {
        const a = await cookieSetter(res.data);
        if (a === true) {
          toast.success("Login successful");
          router.push("/main/dashboard");
        }
        dispatch(
          changelaoding({
            loading: true,
            path: `/main/dashboard`,
          })
        );
      }

      if (res.error) {
        const error = res.error;
        await errorMaker(error, "/login/emailotplogin", "POST");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cookieSetter = async (data) => {
    try {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      if (data.isCreator) {
        localStorage.setItem("isCreator", data.isCreator);
      }

      Cookies.set(`excktn`, data.access_token, { expires: expirationDate });
      Cookies.set(`frhktn`, data.refresh_token, { expires: expirationDate });

      dispatch(sendData(data?.data));

      return true;
    } catch (e) {
      console.error("Error during login:", e);
      return false;
    }
  };

  const fetchid = async () => {
    try {
      const updatedNumber = "91" + number;
      const en = encryptaes(updatedNumber);
      const result = await login({
        phone: en,
      });

      if (result.data?.success) {
        const a = await cookieSetter(result.data);
        if (a === true) {
          toast.success("Login successful");
          dispatch(
            changelaoding({
              loading: true,
              path: `/main/dashboard`,
            })
          );
          router.push("/main/dashboard");
          setLoading(false);
        } else {
          const error = result.error;
        }
        setLoading(false);
      } else {
        toast.error("You Dont have Account");
      }

      if (result.error) {
        const error = result.error;
        await errorMaker(error, "/login/checkid", "POST");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // function onCaptchaVerify() {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       auth,
  //       "recaptcha-container",
  //       {
  //         size: "invisible",
  //         callback: (response) => {
  //           onSignup();
  //         },
  //         "expired-callback": () => { },
  //       }
  //     );
  //   }
  // }

  // function onSignup() {
  //   if (number.length !== 10) {
  //     return toast.error("Please Enter 10 digit number");
  //   }
  //   setLoading(true);
  //   onCaptchaVerify();
  //   setSeconds(30);
  //   const appVerifier = window.recaptchaVerifier;
  //   const updatedNumber = "91" + number;
  //   signInWithPhoneNumber(auth, "+" + updatedNumber, appVerifier)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult;
  //       setLoading(false);
  //       setShowOTP(true);
  //       toast.success("Otp Sent Successfully!");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }

  // function onOTPVerify() {
  //   setLoading(true);
  //   window.confirmationResult
  //     .confirm(otp)
  //     .then(async (res) => {
  //       fetchid();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }

  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast.error("Enter All Details");
      return;
    }
    try {
      setLoading(true);
      const res = await emailLogin({
        email,
        password,
      });

      if (res.data.success) {
        const a = await cookieSetter(res.data);
        if (a === true) {
          toast.success("Login successful");
          router.push("/main/dashboard");
        }
        dispatch(
          changelaoding({
            loading: true,
            path: `/main/dashboard`,
          })
        );
      } else {
        toast.error("Invalid Email or Password!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const sendOtpEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please Enter the Email!");
      return;
    }
    try {
      const data = {
        email,
      };
      const res = await emailOtpLogin(data);

      console.log(res.data);

      if (!res.data.success) {
        if (res.data.emailFound === false) {
          toast.error("Email Not Found!");
          return;
        } else {
          toast.error("Something Went Wrong!");
          return;
        }
      } else {
        setShowEmailOtp(true);
      }

      if (res.error) {
        const error = res.error;
        await errorMaker(error, "/login/requestOtp", "POST");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [qrCodeValue, setQRCodeValue] = useState("");
  const [qrlogin] = useLoginWithQrMutation();

  useEffect(() => {
    if (socket?.id) {
      setQRCodeValue(socket?.id);
    }
  }, [socket?.id]);

  useEffect(() => {
    socket?.on(`qr-rec`, async (id) => {
      setLoadingqr(true);
      const res = await qrlogin({
        id,
      });
      if (res.data?.success) {
        const check = await cookieSetter(res.data);
        if (check === true) {
          dispatch(sendData(res.data?.data));
          router.push("/main/dashboard");
        }
        setTimeout(() => {
          setLoadingqr(false);
        }, 6000);
      }
    });
    return () => {
      socket?.off("qr-rec");
    };
  }, [socket]);

  useEffect(() => {
    let otpCapture = document.getElementById("send-otp");
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (number.length === 10) {
          phoneAuth(event);
        }
      }
    };

    if (otpCapture) {
      otpCapture.addEventListener("keypress", handleKeyPress);
    }
    return () => {
      if (otpCapture) {
        otpCapture.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [number]);

  useEffect(() => {
    let otpCapture = document.getElementById("send-email-otp");
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (email) {
          sendOtpEmail(event);
        }
      }
    };

    if (otpCapture) {
      otpCapture.addEventListener("keypress", handleKeyPress);
    }
    return () => {
      if (otpCapture) {
        otpCapture.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [email]);

  useEffect(() => {
    const verifyOtp = otpInputRef.current;
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (otp.length === 6) {
          verifyOTP(event);
        }
      }
    };

    if (verifyOtp) {
      verifyOtp.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      if (verifyOtp) {
        verifyOtp.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [otp, otpInputRef]);

  useEffect(() => {
    const verifyOtp = emailOtpRef.current;
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (emailOtp.length === 6) {
          verifyOtpEmail(event);
        }
      }
    };

    if (verifyOtp) {
      verifyOtp.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      if (verifyOtp) {
        verifyOtp.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [emailOtp, emailOtpRef]);

  const phoneAuth = (e) => {
    e.preventDefault();

    if (number.length !== 10) {
      return toast.error("Please Enter 10 digit number");
    }
    setLoading(true);

    window?.OTPlessSignin.initiate({
      channel: "PHONE",
      phone: number,
      countryCode: "+91",
    });

    setLoading(false);
    setShowOTP(true);
    toast.success("Otp Sent Successfully!");
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Assuming OTPlessSignin.verify returns a promise
    try {
      const result = await window?.OTPlessSignin.verify({
        channel: "PHONE",
        phone: number,
        otp: otp,
        countryCode: "+91",
      });

      // console.log(result, result.status, "result");
      if (result.success) {
        await fetchid();
      } else {
        toast.error("OTP Verification Failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      toast.error("An error occurred during OTP verification");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const callback = (userinfo) => {
    const mobileMap = otplessUser?.identities.find(
      (item) => item.identityType === "MOBILE"
    )?.identityValue;

    const token = otplessUser?.token;

    const mobile = mobileMap?.identityValue;
  };

  useEffect(() => initOTPless(callback), []);

  return (
    <div className="h-screen flex flex-col sm:justify-center ">
      <div
        className={`${
          loadingqr
            ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md"
            : "hidden -z-50"
        } `}
      >
        <div className="animate-spin">
          <RiLoader4Line className="text-3xl" />
        </div>
      </div>
      <Toaster toastOptions={{ duration: 4000 }} />

      <div id="recaptcha-container"></div>
      {showOTP ? (
        // OTP
        <div className="h-screen flex flex-col justify-center items-center">
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

          <div ref={otpInputRef}>
            <DynamicOtpInput
              value={otp}
              onChange={handleOtpChange}
              OTPLength={6}
              otpType="number"
              // ref={otpInputRef}
              disabled={false}
              autoFocus
              className="opt-container sm:mt-3"
            ></DynamicOtpInput>
          </div>
          <div className="text-black font-semibold flex text-[15px] pt-6">
            <div className="text-center flex justify-center items-center">
              {come === 1 ? (
                <div className="space-x-4 flex ">
                  <div className="text-[#424242] dark:text-[#fff]">
                    Don't receive code ?{" "}
                    <button
                      className={` text-blue-600 hover:text-blue-900 ${
                        isActive ? "" : ""
                      } `}
                      onClick={toggleTimer}
                    >
                      Request Again
                    </button>
                  </div>
                </div>
              ) : (
                <h1
                  className={`${
                    come === 1
                      ? "hidden"
                      : "text-[16px] font-normal dark:text-white text-[#3e3e3e]"
                  } `}
                >
                  Resend: <span className="font-semibold">00:{seconds}</span>
                </h1>
              )}
            </div>
          </div>
          <div
            onClick={verifyOTP}
            className="h-[50px] w-[250px] select-none cursor-pointer bg-[#0066ff] mt-8 flex items-center justify-center rounded-2xl text-white"
          >
            {loading && <CgSpinner size={20} className="m-1 animate-spin" />}
            <span className={`${loading ? "hidden" : ""} `}>Continue</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between gap-2 items-center">
          {/* web Qr  */}
          <div className="mb-5 flex gap-3 pn:max-sm:hidden justify-center  items-center flex-col">
            <div className="relative bg-white border-2 border-[#f3f3f3] dark:border-white p-3 rounded-3xl">
              {/* <div
                style={{
                  position: "relative",
                }}
              >
                <QRCode
                 value={qrCodeValue}
              
                  className="rounded-none"
                  fgColor="white"
                  bgColor="black"
                  size={180}
                  style={{
                    borderRadius: "20px",
                  }}

                />
                <Image
                  src={logo}
                  alt="Grovyo"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    borderRadius: "18px",
                    // border: "2px solid black",
                    transform: "translate(-50%, -50%)",
                    width: 50,

                    // backgroundColor: "black",
                    height: 50,
                  }}
                />
              </div> */}

              <div style={{ position: "relative", width: 180, height: 180 }}>
                {/* QR Code */}
                <QRCode
                  value={qrCodeValue}
                  size={180}
          
                  style={{ width: "100%", height: "100%" }}
                />

                {/* Overlay Image */}
                {logo && (
                  <Image
                    src={logo}
                    alt="QR code icon"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 50,
                      height: 50,
                      transform: "translate(-50%, -50%)",
                      borderRadius: "50%", // optional, for circular images
                    }}
                  />
                )}
              </div>

              {/* <QRCodeSVG className="w-[180px] h-[180px]" value={qrCodeValue} /> */}
            </div>

            <div className="text-xl font-semibold">Sign in with QR code</div>
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="max-w-[70%] text-sm text-[#9095A0] text-center">
                Open the{" "}
                <a
                  className="text-blue-600 cursor-pointer"
                  href="https://play.google.com/store/apps/details?id=com.grovyomain&hl=en_IN&gl=US"
                  target="_blank"
                >
                  Grovyo
                </a>{" "}
                app's camera to scan this code and log in instantly.
              </div>
            </div>
          </div>
          {/* web Or Sign in with bar */}
          <div className="flex pn:max-sm:hidden items-center justify-center w-full">
            <hr className="flex-grow border-t text-[#9095A0] border-[#9095A0] " />
            <span className="px-3 font-medium text-[#9095A0] bg-transparent ">
              or Sign in with
            </span>
            <hr className="flex-grow border-t text-[#9095A0] border-[#9095A0]" />
          </div>

          {/* phone logo */}
          <div className="sm:hidden max-w-full flex mb-9 flex-col mt-10 gap-2 justify-center items-center ">
            <Image
              src={workspace}
              alt="workspace"
              className="w-full max-w-[150px] max-h-[150px] h-full object-cover"
            />
            <div>
              <div className="font-bold text-lg">
                <a className="text-[#4480ff]">Work</a>space
              </div>
              <div className="text-xs flex justify-end w-full items-center">
                by Grovyo
              </div>
            </div>
          </div>
          {/* Switcher */}
          <div className="grid grid-cols-1 pn:max-sm:-mt-6 w-full md:w-[90%]">
            <div className="w-full flex rounded-xl dark:text-white select-none text-[14px]">
              <div
                onClick={() => {
                  setChange(1);
                }}
                className={`m-1 flex justify-center items-center h-full w-full z-10 ${
                  change === 1
                    ? "font-bold border-b-2 border-[#0066ff]"
                    : "cursor-pointer"
                }`}
              >
                Phone no.
              </div>
              <div
                onClick={() => {
                  setChange(2);
                }}
                className={`m-1 flex justify-center items-center h-full w-full z-10 ${
                  change === 2
                    ? "font-bold border-b-2 border-[#0066ff]"
                    : "cursor-pointer"
                }`}
              >
                Email
              </div>
            </div>
          </div>
          {/* phone */}
          <div
            className={`${
              change === 1
                ? "flex justify-start flex-col items-start  py-4"
                : "hidden"
            } `}
          >
            <div className="text-sm pb-3 px-1 dark:text-white font-semibold text-[#424856]">
              Enter Your Phone Number
            </div>
            {/* <div className="bg-[#f7f7f7] flex items-center dark:border-[#8f9bba] overflow-hidden dark:bg-[#323d4e] border w-[300px] justify-center rounded-2xl">
              <div className="border-r-2 dark:border-[#8f9bba] sm:-ml-3 p-1 sm:pr-2 "> +91</div>
              <input value={number}
                id="send-otp"
                onChange={(e) => setNumber(e.target.value)} type="tel"
                className=" p-2 outline-none rounded-xl dark:bg-[#323d4e] bg-[#f7f7f7]" />

            </div> */}
            <div className="flex justify-center dark:bg-[#323d4e] w-[300px] h-[50px] rounded-2xl bg-[#fff] dark:border-none border light:border-[#dddddd] items-center">
              <div className="p-2 pl-2 pr-2 ">+91</div>
              <div className="h-[80%] w-[1px] bg-[#dddddd] rounded-full dark:bg-[#5a6277]" />
              <input
                value={number}
                placeholder="1234 567 890"
                id="send-otp"
                onChange={(e) => setNumber(e.target.value)}
                type="tel"
                className=" p-2 outline-none w-full rounded-xl dark:bg-[#323d4e] bg-[#fff]  "
              />
            </div>
          </div>
          {/* otp button */}
          <div className={`${change === 1 ? "py-3" : "hidden"} `}>
            <div
              onClick={phoneAuth}
              // onClick={fetchid}
              className="h-[50px] w-[300px] select-none cursor-pointer bg-[#0066ff] flex items-center justify-center rounded-2xl text-white "
            >
              {loading && <CgSpinner size={20} className="m-1 animate-spin" />}
              <span className={`${loading ? "hidden" : ""} `}>Continue</span>
            </div>
          </div>
          {/* email */}
          <div className={`${change === 2 ? "" : "hidden"} `}>
            {showEmailOtp === false && (
              <>
                <div>
                  <div className="text-sm pb-2 px-1 mt-2 dark:text-white font-semibold text-[#424856]">
                    Email
                  </div>

                  <input
                    value={email}
                    id="send-email-otp"
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-3 w-[300px] dark:bg-[#3d4654] bg-[#fff] dark:border-none border light:border-[#dddddd] rounded-2xl px-4 "
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-2">
                  <div className="text-sm pb-3 px-1 dark:text-white font-semibold text-[#424856]">
                    Password
                  </div>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-3 w-[300px]  bg-[#fff] dark:bg-[#3d4654] dark:border-none border light:border-[#dddddd] rounded-2xl px-4 "
                    placeholder="Enter your Password"
                  />
                </div>
                {/* <div className="py-5 ">
                  <div
                    // onClick={handleEmailLogin}
                    onClick={sendOtpEmail}
                    className="py-3 w-[300px] select-none cursor-pointer bg-[#0066ff]  flex items-center justify-center rounded-2xl text-white "
                  >
                    {loading && (
                      <CgSpinner size={20} className="m-1 animate-spin" />
                    )}
                    <span className={`${loading ? "hidden" : ""} `}>
                      Send Otp
                    </span>
                  </div>
                </div> */}
                <div className="py-3">
                  <div
                    onClick={handleEmailLogin}
                    className="py-3 w-[300px] select-none cursor-pointer bg-[#0066ff]  flex items-center justify-center rounded-2xl text-white "
                  >
                    {loading && (
                      <CgSpinner size={20} className="m-1 animate-spin" />
                    )}
                    <span className={`${loading ? "hidden" : ""} `}>
                      Continue
                    </span>
                  </div>
                </div>
              </>
            )}

            {showEmailOtp === true && (
              <>
                <div ref={emailOtpRef}>
                  <DynamicOtpInput
                    value={emailOtp}
                    onChange={handleEmailOtpChange}
                    OTPLength={6}
                    otpType="number"
                    // ref={otpInputRef}
                    disabled={false}
                    autoFocus
                    className="opt-container sm:mt-3"
                  ></DynamicOtpInput>
                </div>
                <div className="py-5 ">
                  <div
                    onClick={verifyOtpEmail}
                    className="py-3 w-[300px] select-none cursor-pointer bg-[#0066ff]  flex items-center justify-center rounded-2xl text-white "
                  >
                    {loading && (
                      <CgSpinner size={20} className="m-1 animate-spin" />
                    )}
                    <span className={`${loading ? "hidden" : ""} `}>
                      Send Otp
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
