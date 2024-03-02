import React from "react";
import Postdata from "./Postdata";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Charts from "./Charts"

const Communitydata = ({ state, analyticsdata, setState }) => {

  const communityData = state.stats && state?.stats?.map((d) => ({
    members: Number(d.Y1),
    X: d.X,
    visitors: Number(d.Y2)
  }))

  console.log(analyticsdata)

  return (
    <div className="max-h-[90%]">
      <div className="rounded-2xl dark:border-2 dark:border-[#313d4f] dark:text-white dark:bg-[#273142] bg-white">
        <div className="flex justify-between p-2">
          <Select
            className="dark:text-white dark:bg-[#323b4e] dark:border-none "
            // defaultValue={state.name}

            onValueChange={(selectedValue) => {
              const selectedData = analyticsdata?.commerged?.find(
                (item) => item.id === selectedValue
              );
              if (selectedData) {
                setState({
                  dp: selectedData.image,
                  name: selectedData.name,
                  popularity: selectedData.popularity,
                  stats: selectedData.stats,
                  totalmembers: selectedData.totalmembers,
                  visitors: selectedData.visitors,
                  paidmember: selectedData.paidmember,
                  id: selectedData.id,
                  age: selectedData.agerange,
                  location: selectedData.location
                });
              }
            }}

          >
            <SelectTrigger className="w-[150px] dark:text-white dark:bg-[#323b4e] dark:border-none ">
              <SelectValue
                placeholder={state.name}
                className="dark:text-white dark:bg-[#323b4e] dark:border-none "
              />
            </SelectTrigger>
            <SelectContent className="dark:text-white dark:bg-[#323b4e] dark:border-none ">
              <SelectGroup className="max-h-[200px] gap-1 w-full flex flex-col justify-center items-center">
                {analyticsdata?.commerged?.map((d, i) => (
                  <SelectItem
                    value={
                      `${d?.id}`
                    }
                    key={i}
                    className=" "
                  >

                    <div className="flex justify-center gap-2 items-center w-full">
                      <div>
                        <img
                          src={d?.image}
                          className="max-w-[30px] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                          alt="image"
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-xs">{d?.name?.length > 8 ? `${d?.name?.slice(0, 8)}...` : d?.name}</div>
                      </div>
                    </div>

                  </SelectItem>
                ))}

              </SelectGroup>
            </SelectContent>
          </Select>

          {/* <div className="flex pn:max-sm:hidden justify-center items-center gap-1">
            <div className="text-xl">
              <BiUpArrowAlt />
            </div>
            <div className="text-sm">2.1% vs last week</div>
          </div> */}
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

        <div className="w-full p-2 h-full z-0">

          {communityData && communityData.length > 0 && communityData <= 6 && <div className="h-[200px] w-full flex text-2xl font-semibold justify-center items-center">Data will be processed and will be displayed after 7 days.</div>}

          {communityData && communityData?.length > 6 &&
            < Charts data={communityData} />
          }
        </div>
      </div >

      <div className="flex flex-col my-3 gap-2 pn:max-sm:hidden dark:text-white dark:border-2 dark:border-[#313d4f]  dark:bg-[#273142] bg-white p-2 px-4 rounded-2xl">
        <div className="font-semibold">Topics</div>
        <div className="flex w-full items-center gap-4">
          {analyticsdata?.commerged
            ?.filter((c) => c?.name == state.name)
            .map((w) =>
              w?.topic.map((d, i) => (
                <div key={i} className="bg-[#fafafa] dark:text-white dark:border-2 dark:border-[#313d4f] dark:bg-[#323b4e] p-1 px-4 rounded-2xl">
                  {d?.title}
                </div>
              ))
            )}
          {/* <div className="bg-[#fafafa] p-1 px-4 rounded-2xl">Post</div> */}
        </div>
      </div>
      <Postdata analyticsdata={analyticsdata} state={state} />
    </div >
  );
};

const MemorizedCommunitydata = React.memo(Communitydata)

export default MemorizedCommunitydata;
