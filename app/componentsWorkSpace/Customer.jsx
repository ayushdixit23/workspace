import React from "react";
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from "recharts";
import Prem from "./Prem";

const Customer = ({ data, memberships }) => {
  const colors = ["#5a6acf", "#7fcce5", "#96d38c"];

  return (
    <>
      <div className="w-full ">
        {memberships === "Free" ? (
          <Prem
            height="h-[250px]"
            text={"Gain insights into your target audience's behaviour."}
            bgimage={"bg-customerlight  dark:bg-customerdark "}
          />
        ) : (
          <div className="w-full h-full">
            {data[0].value || data[1].value ? (
              <div className="overflow-y-scroll sm:max-h-[220px] no-scrollbar">
                <div className="flex justify-between w-full p-2 items-center">
                  <div className="text-lg font-semibold">Customers</div>
                  {/* <div className="flex justify-center items-center gap-1 p-2 rounded-xl bg-[#FAFAFA]">
                <div>Weekly</div>
                <div>
                  <FaAngleDown />
                </div>
              </div> */}
                </div>
                <div className="flex justify-center p-3 w-full items-center">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart width={200} height={220}>
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        label
                      >
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${entry.name}`}
                            fill={colors[index % colors.length]}
                          />
                        ))}
                      </Pie>
                      <Legend
                        align="center"
                        className="relative top-3 left-2"
                        verticalAlign="bottom"
                        layout="horizontal"
                        iconSize={10}
                        iconType="square"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="text-center flex justify-center h-[180px] font-semibold text-xl items-center text-gray-600 my-4">
                No Data available at the moment.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Customer;
