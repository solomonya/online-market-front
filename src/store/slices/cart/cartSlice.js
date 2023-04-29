import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsInCart: [],
  productsQuantity: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product_id } = action.payload;
      state.productsInCart.push(product_id);
      state.productsQuantity.push({ product_id, quantity: 1 });
    },
    increaseCartQuantity: (state, action) => {
      const { product_id } = action.payload;
      const product = state.productsQuantity.find((product) => product_id === product.product_id);
      product.quantity += 1;
    },
    decreaseCartQuantity: (state, action) => {
      const { product_id } = action.payload;
      const product = state.productsQuantity.find((product) => product_id === product.product_id);
      product.quantity -= 1;
    },
    clearCart: (state) => {
      state.productsInCart.splice(0);
      state.productsQuantity.splice(0);
    },
  },
});

const selectProductsIdsFromCart = createSelector(
  (state) => state.cart.productsInCart,
  (value) => value
);

const cartReducer = cartSlice.reducer;

export const { addToCart, increaseCartQuantity, decreaseCartQuantity, clearCart } =
  cartSlice.actions;
export { cartReducer };
export { selectProductsIdsFromCart };
