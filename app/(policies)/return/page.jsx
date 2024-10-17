

import React from "react";
const page = () => {
  return (
    <>
      <div className="flex justify-center items-center select-none px-4 md:px-0">
        <div className="grid grid-cols-1 w-[85%] my-2 sm:my-6 text-[#FFFFFF99]">
          <div>
            <h1 className="sm:text-4xl text-3xl -ml-[3%] font-bold my-5 text-[#FFFFFF]">
              Return Policy
            </h1>
            <div className="text-[15px] font-medium  pp:text-[18px]">
              Welcome to Grovyo ! This is Grovyo return's policy. Please Read
              the policy before returning the order.
            </div>
            <div className="text-[15px] pp:text-[18px] ">
              <h2 className="text-2xl font-semibold py-3 text-[#FFFFFF]">
                Timeframe
              </h2>
              {/* There is usually a specific timeframe within which returns are
              accepted. This could be, for example, 30 days from the date of
              purchase. */}
              Products can be returned within 7 business days from the date of
              delivery.
            </div>
            <div className="text-[15px] pp:text-[18px] ">
              <h2 className="text-2xl font-semibold py-3 text-[#FFFFFF]">
                Condition of the Item
              </h2>{" "}
              The item being returned is generally expected to be in its
              original condition, including packaging and any accessories.
            </div>
            <div className="text-[15px] pp:text-[18px] ">
              <h2 className="text-2xl font-semibold py-3 text-[#FFFFFF]">
                Proof of Purchase
              </h2>{" "}
              A valid proof of purchase, such as a receipt or order
              confirmation, is typically required to process a return.
            </div>
            <div className="text-[15px] pp:text-[18px] ">
              <h2 className="text-2xl font-semibold py-3 text-[#FFFFFF]">
                {" "}
                Refund or Exchange
              </h2>{" "}
              The return policy usually specifies whether the customer will
              receive a refund or if they can exchange the item for something
              else.
            </div>
            <div className="text-[15px] pp:text-[18px] ">
              <h2 className="text-2xl font-semibold py-3 text-[#FFFFFF]">
                Return Method
              </h2>{" "}
              The process for returning an item may vary. Some companies provide
              prepaid shipping labels, while others may require the customer to
              cover return shipping costs.
            </div>
            <div className="text-[15px] pp:text-[18px] ">
              <h2 className="text-2xl font-semibold py-3 text-[#FFFFFF]">
                Exceptions
              </h2>{" "}
              Some items may be non-returnable, especially if they are
              personalized, used, or fall into specific categories.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
