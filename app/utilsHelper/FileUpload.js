import axios from "axios";
import {
  completeUpload,
  setMergedData,
  setMergedDatas,
  setPost,
  setProgress,
  startUpload,
} from "../redux/slice/postSlice";
import toast from "react-hot-toast";

const FileUpload = async (
  dispatch,
  post,
  setLoading,
  socket,
  id,
  comid,
  decomid,
  router,
  topicId,
  mediaType,
  thumbnailImage,
  mergedData
) => {
  try {
    console.log(post, "post from upload");
    if (post?.image?.length === 0 && !thumbnailImage) {
      toast.error("Enter required details");
      console.log(post, "post");
      return;
    }
    router.push(`/main/post/${decomid}`);
    // setLoading(true);
    dispatch(startUpload());
    const data = new FormData();
    data.append("title", post.title);
    data.append("desc", post.desc);
    data.append("tags", post.tags);
    data.append("topicId", topicId);
    data.append("thumbnail", mediaType === "video" ? true : false);
    data.append("thumbnailImage", thumbnailImage);
    post?.image.forEach((d) => {
      data.append("image", d);
    });
    post?.video.forEach((d) => {
      data.append("video", d);
    });

	let dps;

	if (mediaType === "video" && thumbnailImage instanceof File) {
		dps = URL.createObjectURL(thumbnailImage);
	} else if (mediaType === "image" && post?.image?.[0] instanceof File) {
		dps = URL.createObjectURL(post.image[0]);
	}
	
    const postData = {
      status: "uploading",
      video: mediaType === "video" ? true : false,
      engrate: 0,
      dps,
      post: {
        _id: "1234567890",
        title: post?.title,
        likes: 0,
        comments: [],
        sharescount: 0,
        sharescount: 0,
        createdAt: Date.now(),
        post: [
          {
            type: mediaType === "video" ? "video/mp4" : post?.image?.[0].type,
          },
        ],
      },
    };

    dispatch(setMergedDatas(postData));

    // const res = await axios.post(
    // 	`https://monarchs.grovyo.xyz/api/post/postanythingworkspace/${id}/${comid}`,
    // 	data,
    // 	{
    // 		onUploadProgress: (progressEvent) => {
    // 			const total = progressEvent.total;
    // 			const current = progressEvent.loaded;
    // 			const percentage = Math.floor((current / total) * 100);
    // 			dispatch(setProgress(percentage));
    // 		},
    // 	}
    // );

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/postanythingworkspace/${id}/${comid}`,
      data,
      {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentage = Math.floor((current / total) * 100);
          dispatch(setProgress(percentage));
        },
      }
    );

    if (res.data.success) {
      toast.success("Post Created!");
	  const newId = res.data.postId;

	  const updatedData = [
		{
		  ...postData, // Spread postData object
		  status: null, // Update status to uploaded
		  post: { ...postData.post, _id: newId }, // Set new ID
		},
		...mergedData.filter((d) => d.post?._id !== "1234567890"), // Remove items with the temporary ID
	  ];
	  
	  // Dispatch the updated data with the new post at the beginning
	  dispatch(setMergedData(updatedData));
      socket?.emit("new-post-created");
    }
    // setLoading(false);

    dispatch(completeUpload());

    dispatch(
      setPost({
        title: "",
        desc: "",
        tags: [],
        image: [],
        video: [],
        sampletags: "",
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export default FileUpload;
