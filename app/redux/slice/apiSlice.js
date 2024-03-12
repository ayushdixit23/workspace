import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
	reducerPath: "Api",
	baseQuery:
		// fetchBaseQuery({
		// 	baseUrl: "http://192.168.1.12:7190/api"
		// }),
		// fetchBaseQuery({
		// 	baseUrl: "http://192.168.29.225:7190/api"
		// }),
		// fetchBaseQuery({
		// 	baseUrl: "http://192.168.29.227:7190/api"
		// }),
		fetchBaseQuery({ baseUrl: "https://work.grovyo.xyz/api" }),
	endpoints: () => ({}),
});
