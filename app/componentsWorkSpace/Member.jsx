import React from "react";
import MemorizedDontHave from "./DontHave";
import BlurredComponent from "./Blur";

const Member = ({ state, data, memberships }) => {
  const { totalmembers, visitors, paidmember } = state
  return (
    <>

      {data > 0 ? <div className="p-2 text-[#323743] relative text-sm dark:text-white flex flex-col gap-6 font-medium">
        {/* {memberships === "Free" && <BlurredComponent />} */}
        <div className="flex justify-between items-center p-1 w-full">
          <div>Total Members</div>
          <div>{totalmembers}</div>
        </div>
        {/* <div className="flex justify-between items-center p-1 w-full">
          <div>Active Members</div>
          <div>0</div>
        </div>
        <div className="flex justify-between items-center p-1 w-full">
          <div>Unique Members</div>
          <div>0</div>
        </div> */}
        <div className="flex justify-between items-center p-1 w-full">
          <div>Paid Members</div>
          <div>{paidmember}</div>
        </div>
        <div className="flex justify-between items-center p-1 w-full">
          <div>Visitors</div>
          <div>{visitors}</div>
        </div>
      </div> :
        <MemorizedDontHave />
      }
    </>
  );
};

export default Member;
