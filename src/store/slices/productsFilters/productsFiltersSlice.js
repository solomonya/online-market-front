import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  limit: 6,
  productSearch: "",
  prices: {
    min: 5.5,
    max: 21.99,
  },
  providerName: "",
  sortBy: "",
};

const productsSlice = createSlice({
  name: "productsFilters",
  initialState,
  reducers: {
    setPage: (state, action) => {
      const { page } = action.payload;
      state.page = page;
    },
    setProductSearch: (state, action) => {
      const { productSearch } = action.payload;
      state.productSearch = productSearch;
    },
    setPrice: (state, action) => {
      const { min, max } = action.payload;
      state.prices.min = min;
      state.prices.max = max;
    },
    setProviderName: (state, action) => {
      const { providerName } = action.payload;
      state.providerName = providerName;
    },
    setSortBy: (state, action) => {
      const { sortBy } = action.payload;
      state.sortBy = sortBy;
    },
  },
});

export const { setPrice, setPage, setProductSearch, setProviderName } = productsSlice.actions;

const productsReducer = productsSlice.reducer;
export { productsReducer };
