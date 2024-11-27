import { Api } from "../slice/apiSlice";
export const paymentApi = Api.injectEndpoints({
	endpoints: (builder) => ({

		getEarningStats: builder.query({
			query: ({ id }) => `/earnings/${id}`
		}),

		addBank: builder.mutation({
			query: ({ id, data }) => ({
				url: `/addbank/${id}`,
				body: data,
				method: "POST"
			}
			)
		}),

		memfinalize: builder.mutation({
			query: ({ id, orderid, data }) => ({
				// url: `/v1/memfinalize/${id}/${res.data?.order}`,
				url: `/v1/memfinalize/${id}/${orderid}`,
				method: "POST",
				body: data
			})
		}),

		changeMontent: builder.mutation({
			query: ({ comid, ismonetized }) => ({
				url: `/changemont/${comid}`,
				method: "POST",
				body: { ismonetized }
			})
		}),

		createWithDrawRequest: builder.mutation({
			query: ({ id, amount }) => ({
				url: `/createwithdrawRequest/${id}`,
				method: "POST",
				body: { amount }
			})
		}),
		
		fetchWithDrawRequest: builder.query({
			query: ({ id }) => `/fetchwithdrawrequest/${id}`
		})
	}),
});

export const {
	useGetEarningStatsQuery,
	useAddBankMutation,
	useMemfinalizeMutation,
	useChangeMontentMutation,
	useCreateWithDrawRequestMutation,
	useFetchWithDrawRequestQuery
} = paymentApi;
