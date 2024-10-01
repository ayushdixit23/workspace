"use client"
import { configureStore } from "@reduxjs/toolkit";
import userData from "./slice/userData";
import { Api } from "./slice/apiSlice";
import reduxSlice from "./slice/reduxSlice";
import dataSlice from "./slice/dataSlice";
import createPostSlice from "./slice/postSlice";

export const store = configureStore({
	reducer: {
		userData: userData,
		prosite: reduxSlice,
		data: dataSlice,
		createPostSlice: createPostSlice,
		[Api.reducerPath]: Api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(Api.middleware),
})