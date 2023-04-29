import { onlineMarketApi } from "../api";
import { HttpMethods } from "../httpMethods";

const paymentsEndpoint = onlineMarketApi.injectEndpoints({
  endpoints: (build) => ({
    payOrder: build.mutation({
      query: ({ order_id }) => ({
        url: `/payments/pay/${order_id}`,
        method: HttpMethods.POST,
      }),
      invalidatesTags: ["PAYMENT"],
    }),
  }),
  overrideExisting: true,
});

export const { usePayOrderMutation } = paymentsEndpoint;
