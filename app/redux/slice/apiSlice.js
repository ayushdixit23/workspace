import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "Api",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5035/api" }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://monarchs.grovyo.xyz/api" }),
  endpoints: () => ({}),
});
