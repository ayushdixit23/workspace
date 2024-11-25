import { Api } from "../slice/apiSlice";
export const userLoginAndSettingApi = Api.injectEndpoints({
  endpoints: (builder) => ({

    loginWithQr: builder.mutation({
      query: ({ id }) => ({
        url: `/loginWithQr`,
        body: { id },
        method: "POST",
      }),
    }),
    idlogin: builder.query({
      query: ({ id }) => `/fetchwithid/${id}`,
    }),
    login: builder.mutation({
      query: ({ phone }) => ({
        url: `/loginWithMobile`,
        method: "POST",
        body: { phone },
      }),
    }),

    getRefreshToken: builder.mutation({
      query: ({ refresh_token }) => ({
        url: `/login/refresh`,
        method: "POST",
        body: { refresh_token },
      }),
    }),

    getFetchOrder: builder.query({
      query: ({ id }) => `/payments/fetchallorders/${id}`,
    }),
    // left
    getProfile: builder.query({
      query: ({ id }) => `/getprofileinfo/${id}`,
    }),
    // left
    postProfile: builder.mutation({
      query: ({ id, data }) => ({
        url: `/login/profileinfo/${id}`,
        method: "POST",
        body: data,
      }),
    }),

    // not needed
    postProfileStore: builder.mutation({
      query: ({ id, data }) => ({
        url: `/profilestore/${id}`,
        method: "POST",
        body: data,
      }),
    }),

    emailLogin: builder.mutation({
      query: (data) => ({
        url: `/loginWithEmail`,
        method: "POST",
        body: data
      })
    }),
    emailOtpLogin: builder.mutation({
      query: (data) => ({
        url: `/requestOtp`,
        method: "POST",
        body: data
      })
    }),
    verifyEmailOtp: builder.mutation({
      query: (data) => ({
        url: `/emailotplogin`,
        method: "POST",
        body: data
      })
    }),
  }),
});

export const {
  useLoginMutation,
  useGetRefreshTokenMutation,
  useVerifyEmailOtpMutation,
  useGetFetchOrderQuery,
  useGetProfileQuery,
  usePostProfileMutation,
  useLoginWithQrMutation,
  useEmailLoginMutation,
  usePostProfileStoreMutation,
  useEmailOtpLoginMutation,
  useIdloginQuery
} = userLoginAndSettingApi;
