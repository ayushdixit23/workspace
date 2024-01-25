import React from "react";
import Img from "../assets/image/Img.png";
import Image from "next/image";
import NoOrder from "./NoOrder";
import { formatISOStringToDMY } from "../utils/Useful";

const Fetch = ({ data }) => {
  return (
    <>
      {data?.length == 0 ? (
        <NoOrder />
      ) : (
        <div className="w-full p-3">
          <table className="w-full border-collapse bg-white pn:max-sm:hidden border border-gray-300">
            <thead className="bg-[#f1f1f1]">
              <tr>
                <th className="py-2 px-4 text-left">Order ID</th>
                <th colSpan="2" className="py-2 px-4 text-left">
                  Product
                </th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">Customer</th>
                <th className="py-2 px-4 text-left">Payment</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((d, i) => (
                <tr key={i}>
                  <td className="py-2 px-4 text-[#667085] text-sm">
                    #{d?.orderId?.slice(0, 8)}
                  </td>
                  <td colSpan="2" className="py-2 px-4 text-left">
                    <div className="flex items-center gap-2">
                      {/* <div>
                        <Image src={Img} alt="image" className="max-w-[50px]" />
                      </div> */}
                      <div>
                        <img src={d?.image?.[0]} alt="image" className="max-w-[50px]" />

                      </div>
                      <div className="flex text-sm flex-col">
                        {d?.productId?.map((product, index) => (
                          <div key={index}>
                            {index < 2 ? product?.name : null}
                          </div>
                        ))}
                        {d?.productId?.length > 2 && <span>And more...</span>}
                      </div>
                    </div>
                  </td>

                  <td className="py-2 px-4 text-[#667085] text-sm">
                    {formatISOStringToDMY(d?.createdAt)}
                  </td>
                  <td className="py-2 px-4 text-[#667085] text-sm">
                    ${d?.finalprice}
                  </td>
                  <td className="py-2 px-4 font-medium">
                    {d?.buyerId?.fullname}
                  </td>
                  <td className="py-2 px-4 text-[#667085] text-sm">
                    {d?.paymentMode}
                  </td>
                  <td className="py-2 px-4 ">{d?.currentStatus}</td>
                </tr>
              ))}
            </tbody >
          </table >
          <div className="sm:hidden rounded-xl bg-white">
            <div>
              <div className="flex justify-between font-semibold p-3 items-center text-[#4A4C56]">
                <div>Recent Orders</div>
                <div>Status</div>
              </div>
              {/* map parent*/}
              <div>
                {/* mapchildren */}
                {data?.map((d, ix) => (
                  <div
                    key={ix}
                    className="flex justify-between p-2 px-4 items-center"
                  >
                    <div className="flex justify-center items-center gap-2 pp:gap-4">
                      <div>
                        <img src={d?.image?.[0]} alt="image" className="min-w-[50px] max-w-[100px]" />

                      </div>
                      <div className="flex flex-col">
                        <div className="flex text-sm flex-col">
                          {d?.productId?.map((product, index) => (
                            <div key={index}>
                              {index < 2 ? product?.name : null}
                            </div>
                          ))}
                          {d?.productId?.length > 2 && <span>And more...</span>}
                        </div>

                        <div className="text-[#667085] text-sm">
                          #{d?.orderId?.slice(0, 8)}
                        </div>
                        <div className="font-semibold text-sm pp:text-base">
                          Total: ₹{d?.finalprice}
                        </div>
                      </div>
                    </div>
                    <div className="p-2 text-sm pp:text-base bg-[#FDF1E8] text-[#E46A11] rounded-2xl">
                      {d?.currentStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  );
};

const MemorizedFetch = React.memo(Fetch)
export default Fetch;
