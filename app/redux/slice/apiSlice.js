import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery:
    // fetchBaseQuery({ baseUrl: "http://192.168.1.8:5035/api" }),
    fetchBaseQuery({ baseUrl: "https://monarchs.grovyo.xyz/api" }),
  endpoints: () => ({}),
});
