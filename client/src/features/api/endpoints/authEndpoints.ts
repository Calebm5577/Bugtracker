import { apiSlice } from "../apiSlice";

interface authObject {
  message: string;
  RefreshToken: string;
}

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    example: builder.query({
      query: () => "test",
    }),
    signIn: builder.mutation({
      query: (authObject) => ({
        url: "/auth/signin",
        method: "POST",
        // Include the entire post object as the body of the request
        body: authObject,
      }),
      transformResponse: (responseData: authObject) => {
        console.log("transform in signin");
        console.log(responseData);

        let token = responseData.RefreshToken
          ? responseData.RefreshToken
          : null;

        console.log("before token check");

        if (token) {
          console.log("gonna set session storage now!");
          sessionStorage.setItem(
            "user",
            JSON.stringify(token.replace('"', ""))
          );
        }
        console.log(`response data from authEndpoint ${responseData}`);
        console.log(`${responseData.RefreshToken}`);
        return responseData;
      },
    }),
    signUp: builder.mutation({
      query: (authObject) => ({
        url: "/auth/signup",
        method: "POST",
        // Include the entire post object as the body of the request
        body: authObject,
      }),
      transformResponse: (responseData: authObject) => {
        console.log("transform in signin");
        console.log(responseData);

        let token = responseData.RefreshToken
          ? responseData.RefreshToken
          : null;

        if (token) {
          sessionStorage.setItem(
            "user",
            JSON.stringify(token.replace('"', ""))
          );
        }

        return responseData;
      },
    }),
    signOut: builder.query({
      query: () => ({
        url: "/auth/signout",
        method: "GET",
        // Include the entire post object as the body of the request
      }),
    }),
    test: builder.query({
      query: () => ({
        url: "/test",
        method: "GET",
        // Include the entire post object as the body of the request
      }),
    }),
    verify: builder.query({
      query: () => ({
        url: "/auth/verify",
        method: "GET",
        // Include the entire post object as the body of the request
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignInMutation,
  useSignOutQuery,
  useSignUpMutation,
  useTestQuery,
  useVerifyQuery,
} = extendedApi;
