import { onlineMarketApi } from "../api";
import { HttpMethods } from "../httpMethods";

const productsEndpoint = onlineMarketApi.injectEndpoints({
  endpoints: (build) => ({
    productsList: build.query({
      query: () => ({
        url: "/products/",
        method: HttpMethods.GET,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useProductsListQuery } = productsEndpoint;
