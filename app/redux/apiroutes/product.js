import { Api } from "../slice/apiSlice";
export const productApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/product/fetchProducts/${id}`,
    }),
    createCollection: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/createCollection/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    removeCollection: builder.mutation({
      query: ({ id, colid }) => ({
        url: `/product/collectiondelete/${id}/${colid}`,
        method: "DELETE",
      }),
    }),
    createStore: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/registerstore/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    checkStoreExists: builder.query({
      query: ({ id }) => `/product/checkstore/${id}`,
    }),
    addProduct: builder.mutation({
      query: ({ id, collecid, data }) => ({
        url: `/product/createproduct/${id}/${collecid}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ id, collecid, pid }) => ({
        url: `/product/deleteproduct/${id}/${collecid}/${pid}`,
        method: "DELETE",
      }),
    }),
    getSingleProduct: builder.query({
      query: ({ userid, pid }) => `/product/getaproduct/${userid}/${pid}`,
      keepUnusedDataFor: 400,
    }),
    updateProduct: builder.mutation({
      query: ({ userid, collectionid, product, formDataToSend }) => ({
        url: `/product/updateaproduct/${userid}/${collectionid}/${product}`,
        method: "POST",
        body: formDataToSend,
      }),
    }),
    updateProductvariant: builder.mutation({
      query: ({ userid, collectionid, product, formDataToSend }) => ({
        url: `/product/updateaproductvariant/${userid}/${collectionid}/${product}`,
        method: "POST",
        body: formDataToSend,
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useCreateCollectionMutation,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useRemoveCollectionMutation,
  useUpdateProductvariantMutation,
  useCreateStoreMutation,
  useCheckStoreExistsQuery,
} = productApi;
