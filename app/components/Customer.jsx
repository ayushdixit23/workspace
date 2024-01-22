
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { Pie, PieChart } from "recharts";

const Customer = () => {
  const data02 = [
    {
      "name": "Group A",
      "value": 2400
    },
    {
      "name": "Group B",
      "value": 4567
    },
    {
      "name": "Group C",
      "value": 1398
    },
  ];
  return (
    <>
      <div>
        <div className="flex justify-between w-full p-2 items-center">
          <div className="text-lg font-semibold">Customers</div>
          <div className="flex justify-center items-center gap-1 p-2 rounded-xl bg-[#FAFAFA]">
            <div>Weekly</div>
            <div>
              <FaAngleDown />
            </div>
          </div>
        </div>
        <div className="flex justify-center p-3 max-h-[150px] w-full items-center">

          <PieChart width={430} height={150}>
            <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#5a6acf" label />
          </PieChart>
        </div>
      </div >
    </>
  );
};

export default Customer;
