import React from "react";
import Image from "next/image";
import no from "../assets/image/Group.png";

const DontHave = () => {
  return (
    <>
      <div className="w-full">
        <div className="flex justify-center flex-col gap-1 items-center h-full">
          <div>
            <Image src={no} alt="no" />
          </div>
          <div className="sm:text-2xl text-xl sm:max-md:max-w-full max-w-[80%] text-center font-semibold">
            We don’t have enough information yet
          </div>
          <div className="py-2">Try posting more to boost impression</div>
        </div>
      </div>
    </>
  );
};
const MemorizedDontHave = React.memo(DontHave)
export default MemorizedDontHave;
