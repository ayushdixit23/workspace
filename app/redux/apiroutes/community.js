import { Api } from "../slice/apiSlice";
import axios from 'axios';

export const communityApi = Api.injectEndpoints({
  
  endpoints: (builder) => ({

    getAnalytics: builder.query({
      query: ({ id }) => `/analyticsuser/${id}`,
      keepUnusedDataFor: 400,
    }),

    getAnalyticsThirtyDays: builder.query({
      query: ({ id }) => `/analyticsuserThirtyDays/${id}`,
      keepUnusedDataFor: 400,
    }),

    getCommunity: builder.query({
      query: ({ id }) => `/allcoms/${id}`,
    }),

    // left
    getPost: builder.query({
      query: ({ id, comid }) => `/chats/getposts/${id}/${comid}`,
    }),

    getAllPost: builder.query({
      query: ({ comid }) => `/getallposts/${comid}`,
    }),

    editPosts: builder.mutation({
      query: ({ id, postid, data }) => ({
        url: `/editpost/${id}/${postid}`,
        method: "POST",
        body: data,
      }),
    }),

    createTopic: builder.mutation({
      query: ({ id, comid, data }) => ({
        url: `/createtopic/${id}/${comid}`,
        method: "POST",
        body: data,
      }),
    }),

    deleteTopic: builder.mutation({
      query: ({ id, topicId, data }) => ({
        url: `/deletetopic/${id}/${topicId}`,
        method: "POST",
        body: data,
      }),
    }),

    updateTopic: builder.mutation({
      query: ({ id, topicid, data }) => ({
        url: `/edittopic/${id}/${topicid}`,
        method: "POST",
        body: data,
      }),
    }),

    fetchTopic: builder.query({
      query: ({ id, comid }) => `/fetchtopic/${id}/${comid}`,
    }),

    createCom: builder.mutation({
      query: ({ id, data }) => ({
        url: `/createcom/${id}`,
        method: "POST",
        body: data,
      }),
    }),

    updateCom: builder.mutation({
      query: ({ id, comid, data }) => ({
        url: `/updatecommunity/${id}/${comid}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteCommunity: builder.mutation({
      query: ({ id, comid }) => ({
        url: `/v1/removecomwithposts/${id}/${comid}`,
        method: "POST",
      }),
    }),
    createPost: builder.mutation({
      query: ({ id, comid, data, onUploadProgress }) => ({
        url: `/postanythingworkspace/${id}/${comid}`,
        method: "POST",
        body: data,
        onUploadProgress
      })
    }),
    fetchPosts: builder.query({
      query: ({ id, comid }) => `/getallposts/${comid}/${id}`
    }),
    deletePosts: builder.mutation({
      query: ({ id, postid }) => ({
        url: `/deletepost/${id}/${postid}`,
        method: "DELETE",
      })
    }),
    fetchCommunity: builder.query({
      query: ({ id }) => `/fetchCommunityStats/${id}`
    }),
    monetization: builder.mutation({
      query: ({ id, comid }) => ({
        url: `/monetization/${id}/${comid}`,
        method: "POST",
      })
    }),

  }),
});

export const {
  useGetAnalyticsQuery,
  useGetCommunityQuery,
  useGetPostQuery,
  useCreateTopicMutation,
  useDeleteTopicMutation,
  useUpdateTopicMutation,
  useFetchTopicQuery,
  useCreateComMutation,
  useUpdateComMutation,
  useCreatePostMutation,
  useDeleteCommunityMutation,
  useGetAllPostQuery,
  useFetchPostsQuery,
  useFetchCommunityQuery,
  useMonetizationMutation,
  useDeletePostsMutation,
  useEditPostsMutation,
  useGetAnalyticsThirtyDaysQuery
} = communityApi;
