import React from "react";
import Image from "next/image";
import no from "../assets/image/Group.png";

const DontHave = ({ hide = false }) => {
  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-center flex-col h-full gap-1 items-center ">
          <div>
            <Image src={no} alt="no" />
          </div>
          <div className="sm:text-[20px] text-xl sm:max-md:max-w-full max-w-[80%] text-center font-semibold">
            Not enough data
          </div>
          {!hide && <div className="py-2">Try posting more content</div>}
        </div>
      </div>
    </>
  );
};
const MemorizedDontHave = React.memo(DontHave);
export default MemorizedDontHave;
