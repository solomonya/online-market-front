import { onlineMarketApi } from "../api";
import { HttpMethods } from "../httpMethods";

const productsEndpoint = onlineMarketApi.injectEndpoints({
  endpoints: (build) => ({
    providersList: build.query({
      query: () => ({
        url: "/products/providers",
        method: HttpMethods.GET
      })
    }),
    productsList: build.query({
      query: (productsFilters) => ({
        url: "/products/",
        method: HttpMethods.GET,
        params: {
          page: productsFilters.page - 1,
          query_limit: productsFilters.limit,
          product_name: productsFilters.productSearch,
          min_price: productsFilters.prices.min,
          max_price: productsFilters.prices.max,
          provider_name: productsFilters.providerName
        },
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

export const { useProductsListQuery, useProductByIdQuery, useProvidersListQuery } = productsEndpoint;
