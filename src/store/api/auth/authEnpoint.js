import { onlineMarketApi } from "../api";
import { HttpMethods } from "../httpMethods";

const authEndpoint = onlineMarketApi.injectEndpoints({
  endpoints: (build) => ({
    auth: build.mutation({
      query: ({ email, password }) => ({
        url: "/auth/authorize/",
        method: HttpMethods.POST,
        body: {
          email,
          password,
        },
      }),
    }),
  }),
});

export const { useAuthMutation } = authEndpoint;
