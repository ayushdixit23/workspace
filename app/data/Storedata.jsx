import React from "react";
import NoOrder from "../components/NoOrder";
import { formatISOStringToDMY } from "../utils/Useful";
import ChartsStore from "./ChartsStore";
import Link from "next/link";

const Storedata = ({ getorderdata, sales }) => {

  const salesData = sales && sales.map((d) => {
    return {
      Sales: d.Sales,
      Dates: formatISOStringToDMY(d.Dates)
    }
  })

  return (
    <div className={`flex flex-col gap-4`}>
      <div className="bg-white rounded-xl p-2 px-3">
        <div className="text-[#030229] font-semibold pt-3 px-2">
          Store Analytics
        </div>
        {/* <div className="flex items-center px-3 py-2 gap-4 w-full">
          <div className="flex justify-center items-center gap-2">
            <input type="radio" name="radio" id="1" />
            <div>Last 6 days</div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <input type="radio" name="radio" id="2" />
            <div>Last Week</div>
          </div>
        </div> */}
        <div className="w-full">
          <ChartsStore data={salesData} />
        </div>
      </div>

      {getorderdata?.mergedOrder.length == 0 ? (
        <div className="bg-white rounded-xl h-[370px] sm:h-[400px]">
          <NoOrder />
        </div>
      ) : (
        <Link href={"/main/order"} className="w-full rounded-xl bg-white sm:max-h-[600px] max-w-full overflow-y-scroll scrollbar-hide sm:min-h-[200px] ">
          <div className="text-lg font-semibold hidden sm:block p-2 sm:p-3 text-[#030229]">
            Recent Orders
          </div>
          <div className="pn:max-sm:hidden max-w-full min-w-[700px] overflow-scroll scrollbar-hide bg-white sm:px-3">
            <table className="w-full">
              <thead className="bg-[#FCFCFD]">
                <tr>
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th colSpan="2" className="py-2 px-4 text-left">
                    Product Name
                  </th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Total Order</th>
                  <th className="py-2 px-4 text-left">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {getorderdata?.mergedOrder?.map((d, iw) => (
                  <tr key={iw}>
                    <td className="py-2 px-4 text-[#667085] text-sm">
                      #{d?.orderId?.slice(0, 8)}
                    </td>
                    <td colSpan="2" className="py-2 px-4 text-left">
                      <div className="flex items-center gap-2">
                        <div>
                          <img
                            src={d?.image?.[0]}
                            alt="image"
                            className="max-w-[50px]"
                          />
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
                      &#8377; {d?.finalprice}
                    </td>
                    <td className="py-2 px-4 text-[#667085] text-sm font-medium">
                      {getorderdata?.allorders}
                    </td>
                    <td className="py-2 px-4 text-[#667085] text-sm">
                      &#8377; {d?.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sm:hidden rounded-xl bg-white">
            <div>
              <div className="flex justify-between font-semibold p-3 px-4 items-center text-[#4A4C56]">
                <div>Recent Orders</div>
                <div className="mr-4 text-sm">Status</div>
              </div>

              <div>
                {getorderdata?.mergedOrder?.map((d, i) => (
                  <div
                    key={i}
                    className="flex justify-between p-2 px-4 items-center"
                  >
                    <div className="flex justify-center items-center gap-2 pp:gap-4">
                      <div>
                        <img
                          src={d?.image?.[0]}
                          alt="image"
                          className="min-w-[50px] max-w-[100px]"
                        />
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
                          Total: ₹{d?.total}
                        </div>
                      </div>
                    </div>
                    <div className="p-1.5 px-3 text-sm pp:text-base bg-[#FDF1E8] text-[#E46A11] rounded-2xl">
                      {d?.currentStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

const MemorizedStoredata = React.memo(Storedata)
export default MemorizedStoredata;
