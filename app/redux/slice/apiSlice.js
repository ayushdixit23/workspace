import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
	reducerPath: "Api",
	baseQuery:
		// fetchBaseQuery({
		// 	baseUrl: "http://192.168.1.10:7700/api"
		// }),
		fetchBaseQuery({ baseUrl: "https://work.grovyo.xyz/api" }),
	endpoints: () => ({}),
});
