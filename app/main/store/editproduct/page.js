"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { decryptaes } from "@/app/utils/security";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/app/redux/apiroutes/product";
import { getData } from "@/app/utils/Useful";
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import toast, { Toaster } from "react-hot-toast";

function page() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    price: "",
    discountedprice: "",
    quantity: "",
  })
  const [selectedImage, setSelectedImage] = useState([]);
  const [call, setCall] = useState(true);
  const [by, setBy] = useState(false);
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState("");
  const { id } = getData()
  const a = Cookies.get("pivc");
  const pid = a ? decryptaes(a) : null;
  const b = Cookies.get("clvss");
  const cid = b ? decryptaes(b) : null;
  const {
    data: getProduct,
    isLoading,
    isError,
  } = useGetSingleProductQuery(
    { userid: id, pid: pid },
    {
      skip: !id || !pid
    }
  );

  const [updation] = useUpdateProductMutation();

  useEffect(() => {
    if (!isLoading && !isError && getProduct) {
      setProduct({
        ...product,
        name: getProduct?.data?.product?.name || "",
        desc: getProduct?.data?.product?.desc || "",
        price: getProduct?.data?.product?.price || "",
        quantity: getProduct?.data?.product?.quantity || "",
        discountedprice: getProduct?.data?.product?.discountedprice || "",
      })
      setType(getProduct?.data?.product?.type || "");
      setSelectedImage(getProduct?.data?.urls || []);
    }
  }, [getProduct, isLoading, isError]);

  const handleImageChange = (e) => {
    // setSelectImage(null);
    const files = e.target.files;
    const newImages = Array.from(files);
    const combinedImages = [...selectedImage, ...newImages];
    const limitedImages = combinedImages.slice(0, 4);
    setSelectedImage(limitedImages);
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", product.name)
      formDataToSend.append("price", product.price)
      formDataToSend.append("desc", product.desc)
      formDataToSend.append("discountedprice", product.discountedprice)
      formDataToSend.append("quantity", product.quantity)
      selectedImage.forEach((image) => {
        formDataToSend.append("image", image)
      })
      const result = await updation({
        userid: id,
        collectionid: cid,
        product: pid,
        formDataToSend
      });
      console.log(result.error);
      if (result.data?.success) {
        toast.success("Changes Saved!")
        clearCookies();
        setLoading(false)
        router.push("/main/store");
      } else {
        toast.error("Something Went Wrong!")
        clearCookies();
        setLoading(false)
        router.push("/main/store");
      }
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  };

  const handleImageRemove = (indexToRemove) => {
    setSelectedImage(prevImages => prevImages.filter((_, i) => i !== indexToRemove));
  };
  // const handleClick = useCallback(() => {
  //   setChange("Physical Product");
  //   setDrop(true);
  //   setCall(false);
  // }, []);
  // const handle = useCallback(() => {
  //   setChange("Digital product or service");
  //   setDrop(true);
  //   setCall(true);
  // }, []);

  const clearCookies = () => {
    Cookies.remove("pivc")
    Cookies.remove("clvss");
  };

  useEffect(() => {
    const handlePopstate = () => {
      clearCookies();
      window.location.href = "/main/store";
    };
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = handlePopstate;
    return () => {
      window.onpopstate = null;
    };
  }, []);


  if (loading) {
    return (
      <>
        <div className="fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters className="text-2xl text-white" />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="">
      {/**popUp */}
      <Toaster />
      <div
        className={`${by
          ? "fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md"
          : "-z-50 hidden"
          }`}
      >
        <div
          className={`${by
            ? "h-48 w-80 bg-[#F9F9F9] px-2 sm:bg-white shadow-xl rounded-3xl flex flex-col items-center justify-center duration-100"
            : "h-0 w-0 duration-100 text-[0px] hidden"
            }`}
        >
          <div className="font-semibold">Sure you want to Discard?</div>
          <div className="text-[12px]">
            Are you sure you want to Discard this?
          </div>
          <div className="flex gap-4 mt-4">
            <div
              onClick={() => setBy(false)}
              className="ring-1 cursor-pointer ring-black px-6 py-2 rounded-2xl hover:bg-black hover:text-white"
            >
              No, cancel
            </div>
            <Link
              href="/main/store"
              className=" px-6 py-2 cursor-pointer rounded-2xl bg-black text-white hover:bg-[#3f3f3f]"
            >
              Yes, Confirm
            </Link>
          </div>
        </div>
      </div>

      {/**head*/}

      <div className="flex justify-between pn:max-sm:hidden mb-1 p-2 px-4 items-center ">
        <div className="sm:font-medium sm:pl-4 text-[18px] text-[#8B8D97]  ">
          Edit Product
        </div>
        <div className="flex gap-4 pp:gap-8 items-center">
          <div
            className="font-semibold "
            onClick={() => setBy(true)}
          >
            Discard
          </div>
          <div
            onClick={handleSubmit}
            className=" vs:max-sm:px-10 py-2 px-10 font-semibold bg-[#5570F1] text-white rounded-xl"
          >
            Update
          </div>
        </div>
      </div>


      <div className={`fixed flex justify-center  items-center ${by ? "-z-50" : "z-50"} h-16 bg-white w-full sm:hidden bottom-0 left-0`}>
        <div className="flex justify-center gap-3 w-full px-3 items-center">
          <div onClick={() => setBy(true)} className="w-full flex justify-center p-2 border border-[#979797] rounded-lg items-center">Discard</div>
          <div className="w-full flex justify-center p-2 bg-[#4880FF] rounded-lg text-white items-center" onClick={(e) => handleSubmit(e)}>Save Changes</div>
        </div>
      </div>

      {/**main */}
      <div className="grid grid-cols-1 w-full bg-[#FAFAFA]">
        <div className="sm:flex justify-center sm:px-6 gap-4 rounded-xl pt-3">
          <div className="w-[100%] flex flex-col sm:items-center">
            <div className="bg-white p-4 w-full rounded-2xl">
              <div className="font-semibold text-[20px] pt-1">
                General Information
              </div>
              <div>
                <div className="font-semibold pt-4">Product name</div>
                <input
                  className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-xl h-10 w-[100%]"
                  type="text"
                  placeholder="Product Name"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                />
                <div className="text-[#828282] text-[12px] pt-2 ">
                  Give Your Product a short and clear name.
                </div>
              </div>
              <div>
                <div className="font-semibold pt-4 flex justify-between ">
                  Description
                  <p className="font-normal text-[14px] -pl-2 ">
                    {product.desc.length}/ 500
                  </p>
                </div>
                <textarea
                  className="outline-none px-3 pt-3 mt-2 bg-[#F4F5F7] scrollbar-hide resize-y rounded-xl w-[100%] h-48 "
                  type="text"
                  placeholder="Describe the product in few words"
                  value={product.desc}
                  onChange={(e) => setProduct({ ...product, desc: e.target.value })}
                  maxLength={500}
                />
                <div className="text-[#828282] text-[12px]  ">
                  Give Your Product a short and clear description.
                </div>
              </div>
            </div>
            {/* <div className="bg-white p-4 w-full rounded-2xl mt-2">
              <div className="font-semibold text-[20px] pt-1">Media</div>

              <div className=" rounded-[25px] border-dotted border-2 w-[100%] mt-2 px-2 ">
                <div className="flex space-x-3 h-20 px-9">
                  {selectImage ? (
                    <>
                      {selectImage.map((d) => (
                        <img
                          key={d}
                          src={d}
                          className="h-20 w-20 pt-2 rounded-xl sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0]"
                          alt={`Selected `}
                        />

                      ))}
                    </>
                  ) : (
                    <>
                      {selectedImage.map((i, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(i)}
                          className="h-20 w-20 pt-2 rounded-xl sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0]"
                          alt={`Selected ${index}`}
                        />
                      ))}
                    </>
                  )}
                </div>
                <div className=" py-3">
                  <div className="h-20 bg-gray-200 mt-2 rounded-[20px]">
                    <div className="sm:pl-[10%] pt-3 flex justify-center items-center">
                      <form>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className=" w-[105px]"
                        />
                      </form>
                    </div>
                    <div className="flex text-[10px] justify-center items-center pt-1">
                      you can add upto
                      <div className="slm:max-sm:hidden px-1">4</div>to
                      <div className="sm:hidden px-1">3</div> images
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[#828282] text-[12px] pt-2 ">
                Used to represent your product during checkout , in Community
                ,social sharing and more.
              </div>
            </div> */}
            <div className="bg-white p-4 w-full rounded-2xl mt-2">
              <div className="font-semibold text-[20px] pt-1">Media</div>

              <div className="flex flex-wrap items-center mt-3 gap-2">
                <div className="flex sm:justify-center flex-wrap items-center gap-3">
                  {selectedImage.length > 0 && selectedImage.map((d, i) => (
                    <div key={i} className="relative w-[95px]  h-[90px]">
                      <img src={typeof d === 'string' ? d : URL.createObjectURL(d)} alt={`Selected ${i}`} className="w-[95px]  h-[90px] rounded-lg sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0]" />
                      <div onClick={() => handleImageRemove(i)} className="absolute cursor-pointer top-0 right-0 p-1"><RxCross2 /></div>
                    </div>
                  ))}
                </div>
                {selectedImage.length < 4 && < div >
                  <label htmlFor="arrayFile" className="w-[95px] relative overflow-hidden rounded-xl items-center justify-center h-[90px] border-dashed border-2 flex flex-col"
                  >
                    <AiOutlinePlus />
                  </label>
                  <input type="file"
                    id="arrayFile"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden" />
                </div>}
              </div>
            </div>
          </div>
          <div className="w-[100%] mt-4 flex flex-col sm:items-center">
            <div className="pn:max-pp:px-2 w-full sm:w-[90%] min-w-[250px]">
              <div className="bg-white p-4 rounded-2xl ">
                <div className="font-semibold text-[20px] pt-1">Price</div>
                <div className="w-full pn:max-pp:flex-col mt-1 flex gap-3 justify-center items-center">
                  <div className="flex flex-col w-full">
                    <div className="font-semibold pb-2">Selling Price</div>
                    <div className="w-full">
                      <input className="outline-none p-2 w-full bg-[#fafafa] rounded-lg" placeholder="Type base price here..." value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="font-semibold pb-2">Discounted Price</div>
                    <div className="w-full">
                      <input className="outline-none p-2 w-full bg-[#fafafa] rounded-lg" placeholder="Type Discounted amount..." value={product.discountedprice}
                        onChange={(e) => setProduct({ ...product, discountedprice: e.target.value })} />
                    </div>
                  </div>
                </div>
                <div className="bg-white pt-3 rounded-2xl mt-2">
                  <div className="flex items-center">
                    <input
                      className="p-1 m-1"
                      onClick={() => {
                        setCall(!call);
                      }}
                      type="checkbox"
                    />
                    <div className="text-[#5570F1]">
                      This product includes gst
                    </div>
                  </div>

                  <div
                    className={`${call
                      ? "hidden"
                      : "outline-none flex justify-center mt-2 bg-[#ffffff] items-center rounded-[12px] h-10 w-[40%] ring-1 ring-[#f5f5f5]"
                      }`}
                  >
                    <select
                      className={`${call
                        ? "hidden"
                        : "outline-none flex px-2 justify-center bg-[#ffffff] items-center rounded-r-[12px] h-10"
                        }`}
                    >
                      <option>0</option>
                      <option>12%</option>
                      <option></option>
                      <option>pounds</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl mt-2">
                <div className="font-semibold text-[20px] pt-1">Inventory</div>
                <div className="font-semibold pt-4">Quantity</div>
                <input
                  className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[100%]"
                  type="number"
                  placeholder="Quantity in Stock"
                  value={product.quantity}
                  onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                />
              </div>

              <div className="bg-white p-4 rounded-2xl mt-2">
                <div className="font-semibold text-[20px] pt-1">Shiping</div>
                <div className="flex pt-4 items-center">
                  <input
                    className="p-1 m-1"
                    onClick={() => {
                      setCall(!call);
                    }}
                    type="checkbox"
                  />
                  <div className="text-[#5570F1]">
                    This is a physical product
                  </div>
                </div>
                <div
                  className={`${call
                    ? "hidden"
                    : "outline-none flex justify-center mt-2 bg-[#ffffff] items-center rounded-[12px] h-10 w-[40%] ring-1 ring-[#f5f5f5]"
                    }`}
                >
                  <input
                    className={`${call
                      ? "hidden"
                      : "outline-none flex pl-3 justify-center bg-[#F4F5F7] items-center rounded-l-[12px] h-10 w-[60%]"
                      }`}
                    type="text"
                    placeholder="0.0"
                  />
                  <select
                    className={`${call
                      ? "hidden"
                      : "outline-none flex px-2 justify-center bg-[#ffffff] items-center rounded-r-[12px] h-10"
                      }`}
                  >
                    <option>kg</option>
                    <option>mg</option>
                    <option>lit</option>
                    <option>pounds</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
