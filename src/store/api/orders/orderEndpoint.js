import { onlineMarketApi } from "../api";
import { HttpMethods } from "../httpMethods";

const orderEndpoint = onlineMarketApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderById: build.query({
      query: (payload) => ({
        url: `/orders/${payload.id}`,
        method: HttpMethods.GET,
      }),
      providesTags: ["PAYMENT"]
    }),
    createOrder: build.mutation({
      query: (payload) => ({
        url: "/orders/",
        method: HttpMethods.POST,
        body: payload,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery } = orderEndpoint;
