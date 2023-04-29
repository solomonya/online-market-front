import { onlineMarketApi } from "../api";
import { HttpMethods } from "../httpMethods";

const orderEndpoint = onlineMarketApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (payload) => ({
        url: "/orders/",
        method: HttpMethods.POST,
        body: payload,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderEndpoint;