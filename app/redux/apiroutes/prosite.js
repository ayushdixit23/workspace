import { Api } from "../slice/apiSlice";
export const prositeApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    defaultProsite: builder.mutation({
      query: ({ id, checked }) => ({
        url: `/defaultprositeselector/${id}`,
        method: "POST",
        body: { checked },
      }),
    }),
    fetchValue: builder.query({
      query: ({ id }) => `/checkfordefault/${id}`
    }),
    deleteRecentProsites: builder.mutation({
      query: ({ id, prositeId }) => ({
        url: `/deleteRecentProsites/${id}/${prositeId}`,
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
