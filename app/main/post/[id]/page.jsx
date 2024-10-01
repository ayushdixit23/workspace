"use client";
import {
  useDeletePostsMutation,
  useGetAllPostQuery,
} from "@/app/redux/apiroutes/community";
import { getData } from "@/app/utilsHelper/Useful";
import { decryptaes } from "@/app/utilsHelper/security";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import CreatePost from "../../community/CreatePost";
import Loader from "@/app/data/Loader";
import NoPost from "@/app/componentsWorkSpace/NoPost";
import { useDispatch, useSelector } from "react-redux";
import PostsWeb from "@/app/componentsWorkSpace/PostsWeb";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";
import { PiVideoFill } from "react-icons/pi";
import Hover from "@/app/data/Hover";
import { FaImages } from "react-icons/fa";
import Link from "next/link";
import { setMergedData } from "@/app/redux/slice/postSlice";

const page = () => {
  const path = usePathname();
  const decomid = path.split("/").pop();
  const { id } = getData();
  const searchparams = useSearchParams();
  const uploadPost = searchparams.get("uploadPost");
  const reduxComid = useSelector((state) => state.createPostSlice.comid);
  const comid = reduxComid || decryptaes(decomid);
  const [open, setOpen] = useState(false);
  const [topicId, setTopicId] = useState("");
  const [loading, setLoading] = useState(false);
  const postLoading = useSelector((state) => state.createPostSlice.isLoading);
  const [postid, setPostid] = useState(null);
  const [selectType, setSelectType] = useState(false);
  const type = searchparams.get("type");
  const dispatch = useDispatch();
  const mergedData = useSelector((state) => state.createPostSlice.mergedData);
  const skipFetch = !!mergedData?.length;
  const { data, refetch, isLoading } = useGetAllPostQuery(
    { comid },
    { skip: skipFetch || !comid }
  );
  const [deletePost] = useDeletePostsMutation();

  useEffect(() => {
    const a = Cookies.get("topic");
    const b = decryptaes(a);
    setTopicId(b);
  }, []);

  const postDeletion = async () => {
    try {
      setLoading(true);
      const res = await deletePost({
        id,
        postid,
      });
      if (res.data.success) {
        setLoading(false);
        toast.success("Post Deleted!");
        await refetch();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!skipFetch && data?.posts?.length > 0) {
      const newMergedData = data.posts.map((post) => ({
        post: post.post,
        dps: post.postdp,
        engrate: post.engrate,
        video: post?.video,
      }));

      dispatch(setMergedData(newMergedData));
    }
  }, [data, skipFetch, dispatch]);

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 w-screen z-50 bg-black/60 backdrop-blur-md h-screen flex justify-center items-center ">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters className="text-2xl text-white" />
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {(open || uploadPost == "true" || type) && (
        <CreatePost
          uploadPost={uploadPost}
          id={id}
          topicId={topicId}
          mediaType={type}
          decomid={decomid}
          comid={comid}
          open={open}
          setOpen={setOpen}
          refetch={refetch}
        />
      )}

      <div className={`${open ? "pn:max-sm:hidden " : null}`}>
        <div className="flex px-4 py-2 justify-between dark:text-white items-center">
          <div className=" p-2 text-[22px] text-[#202224] dark:text-white sm:font-semibold  ">
            <Hover
              text={"Posts"}
              para={
                "Create Post: Share text, images, videos, or polls to engage your community!"
              }
              mobile="left-0"
            />
          </div>
          <div
            onClick={() => {
              if (postLoading) {
                return;
              } else {
                sessionStorage.removeItem("postdata");
                // setOpen(true);
                setSelectType(!selectType);
              }
            }}
            className={`py-2 vs:max-pp:text-[12px] relative flex items-center ${
              postLoading ? "cursor-not-allowed" : "cursor-pointer"
            }  gap-1 border dark:bg-[#3d4654] dark:text-white light:border-[#f1f1f1] px-2.5 sm:px-5 font-medium bg-white text-black rounded-xl`}
          >
            Create Post
            <GoPlus />
            {selectType && (
              <div
                onClick={() => setSelectType(false)}
                className={`${
                  selectType
                    ? "absolute bg-white z-50  top-12 dark:bg-[#273142] rounded-xl overflow-hidden left-0 w-full"
                    : "hidden"
                } `}
              >
                <div
                  className="flex flex-col gap-3
                px-4 py-2"
                >
                  <Link
                    onClick={() => {
                      setSelectType(false);
                      // setOpen(true);
                    }}
                    href={`/main/post/${decomid}?type=video`}
                    className="flex items-center cursor-pointer gap-2"
                  >
                    <div>
                      <PiVideoFill />
                    </div>
                    <div>Video</div>
                  </Link>
                  <Link
                    onClick={() => {
                      setSelectType(false);
                      // setOpen(true);
                    }}
                    href={`/main/post/${decomid}?type=image`}
                    className="flex items-center cursor-pointer gap-2"
                  >
                    <div>
                      <FaImages />
                    </div>
                    <div>Photo</div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* web */}

        <div className="pn:max-sm:hidden bg-transparent h-[73vh] z-0 overflow-auto w-full min-w-full container no-scrollbar ">
          {mergedData?.length > 0 ? (
            <div className="bg-white dark:bg-[#273142] overflow-x-scroll no-scrollbar rounded-xl h-full sm:p-2 w-full">
              <table className="w-full text-sm text-left rtl:text-right min-w-full  text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 rounded-xl dark:text-gray-400">
                  <tr>
                    <th scope="col" className=""></th>
                    <th scope="col" className="px-6 py-3">
                      Posts
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Applauses
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Comments
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Shares
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Date Uploaded
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Engagement Rate
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mergedData?.map((d, i) => (
                    <PostsWeb
                      open={open}
                      decomid={decomid}
                      setOpen={setOpen}
                      key={i}
                      setPostid={setPostid}
                      d={d}
                      dispatch={dispatch}
                      postDeletion={postDeletion}
                      userid={id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoPost setOpen={setOpen} id={decomid} />
          )}
        </div>

        <div className="sm:hidden min-h-[70vh] z-0 ">
          {mergedData?.length > 0 ? (
            <div className="dark:bg-[#273142] dark:text-white bg-white">
              {mergedData?.map((d, i) => (
                <PostsWeb
                  key={i}
                  open={open}
                  setOpen={setOpen}
                  setPostid={setPostid}
                  d={d}
                  dispatch={dispatch}
                  postDeletion={postDeletion}
                />
              ))}
            </div>
          ) : (
            <NoPost setOpen={setOpen} id={decomid} />
          )}
        </div>
      </div>
    </>
  );
};

export default page;
