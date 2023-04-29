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
    productById: build.query({
      query: ({ product_id }) => ({
        url: `/products/${product_id}`,
        method: HttpMethods.GET,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useProductsListQuery, useProductByIdQuery } = productsEndpoint;
