import { apiSlice } from "../userSlice/apiSlice";
const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
        body: data,
      }),
    }),
    getUsers: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/users`,
        method: "GET",
        body: data,
      }),
    }),
    getSingleUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/single-user`,
        method: "GET",
        params: {
          userId: data,
        },
      }),
    }),
    updateUserData: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/update-user`,
        method: "POST",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/delete-user`,
        method: "DELETE",
        params: {
          userId: data,
        },
      }),
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/add-user`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useGetUsersMutation,
  useGetSingleUserMutation,
  useUpdateUserDataMutation,
  useDeleteUserMutation,
  useAddUserMutation,
} = adminApiSlice;
