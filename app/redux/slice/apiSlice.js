import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
	reducerPath: "Api",
	baseQuery:
		// fetchBaseQuery({
		// 	baseUrl: "http://192.168.1.8:7190/api"
		// }),
		// fetchBaseQuery({
		// 	baseUrl: "http://192.168.29.225:7200/api"
		// }),
		fetchBaseQuery({ baseUrl: "https://work.grovyo.xyz/api" }),
	endpoints: () => ({}),
});
