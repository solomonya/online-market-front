import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./slices/auth/authSlice";
import { onlineMarketApi } from "./api/api";
import { cartReducer } from "./slices/cart/cartSlice";

const persistConfig = {
  key: "root",
  storage: storage,
  version: 1,
  blacklist: [onlineMarketApi.reducerPath],
};

const rootReducer = () => {
  return combineReducers({
    [onlineMarketApi.reducerPath]: onlineMarketApi.reducer,
    auth: authReducer,
    cart: cartReducer,
  });
};

const persistedReducer = persistReducer(persistConfig, rootReducer());

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }),
    onlineMarketApi.middleware,
  ],
  devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);

const persistor = persistStore(store);

export { store, persistor };
