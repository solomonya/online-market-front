import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set("Authorization", token);
    return headers;
  },
});

const onlineMarketApi = createApi({
  reducerPath: "onlineMarketApi",
  baseQuery,
  endpoints: () => ({}),
});

export { onlineMarketApi };
