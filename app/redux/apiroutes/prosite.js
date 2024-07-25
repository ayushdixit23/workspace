import { Api } from "../slice/apiSlice";
export const prositeApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    defaultProsite: builder.mutation({
      query: ({ id, checked }) => ({
        url: `/product/defaultprositeselector/${id}`,
        method: "POST",
        body: { checked },
      }),
    }),
    fetchValue: builder.query({
      query: ({ id }) => `/product/checkfordefault/${id}`
    }),
    deleteRecentProsites: builder.mutation({
      query: ({ id, prositeId }) => ({
        url: `/product/deleteRecentProsites/${id}/${prositeId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useDefaultPrositeMutation,
  useFetchValueQuery,
  useDeleteRecentPrositesMutation
} = prositeApi;
