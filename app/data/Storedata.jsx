import React from "react";
import NoOrder from "../componentsWorkSpace/NoOrder";
import { formatISOStringToDMY } from "../utilsHelper/Useful";
import ChartsStore from "./ChartsStore";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Storedata = ({ getorderdata, sales }) => {

  const salesData = sales && sales.map((d) => {
    return {
      Sales: d.Sales,
      Dates: formatISOStringToDMY(d.Dates)
    }
  })

  return (
    <div className={`flex flex-col gap-4`}>
      <div className="bg-white dark:text-white dark:bg-[#273142] rounded-xl p-2 px-3">
        <div className="text-[#030229] dark:text-white font-semibold pt-3 px-2">
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
        <div className="w-full relative -left-10 pp:-left-8 sm:-left-6 top-2">
          {salesData && salesData.length > 0 ? <ChartsStore data={salesData} /> : <div className="h-[200px] w-full flex text-2xl font-semibold justify-center items-center">No Data To Show</div>}
        </div>
      </div>

      {getorderdata?.mergedOrder.length == 0 ? (
        <div className="bg-white dark:bg-[#273142] rounded-xl h-[370px] sm:h-[400px]">
          <NoOrder />
        </div>
      ) : (
        <Link href={"/main/order"} className="w-full rounded-xl dark:bg-[#273142] bg-white sm:max-h-[600px] max-w-full overflow-y-scroll no-scrollbar sm:min-h-[200px] ">
          <div className="text-lg font-semibold hidden sm:block p-2 sm:p-3 dark:text-white text-[#030229]">
            Recent Orders
          </div>
          {/* <div className="pn:max-sm:hidden max-w-full min-w-[700px] overflow-scroll no-scrollbar bg-white sm:px-3">
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
          </div> */}

          <div className="pn:max-sm:hidden max-w-full min-w-[700px] overflow-scroll no-scrollbar dark:bg-[#273142] bg-white sm:px-3">
            <Table>
              <TableHeader className="dark:text-[#cfcfcf]">
                <TableRow>
                  <TableHead className="w-[150px]">Order ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total Order</TableHead>
                  <TableHead>Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getorderdata?.mergedOrder?.map((d, iw) => (
                  <TableRow key={iw}>
                    <TableCell className="font-medium w-[150px] text-left">
                      #{d?.orderId?.slice(0, 8)}
                    </TableCell>
                    <TableCell className="text-center"> <div className="flex items-center gap-2">
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
                    </div></TableCell>
                    <TableCell className="text-center">&#8377; {d?.finalprice}</TableCell>
                    <TableCell className="text-center"> {getorderdata?.allorders}</TableCell>
                    <TableCell className="text-center"> &#8377; {d?.total}</TableCell>

                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
          </div>
          <div className="sm:hidden rounded-xl  dark:bg-[#273142] bg-white">
            <div>
              <div className="flex justify-between font-semibold p-3 px-4 dark:text-white items-center text-[#4A4C56]">
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
