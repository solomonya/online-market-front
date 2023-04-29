import { createBrowserRouter } from "react-router-dom";
import { AuthPage, ProductsListPage } from "@/pages";
import { Pathnames } from "./utils/constants";
import { OrdersPage } from "./pages/orders";

const router = createBrowserRouter([
  {
    path: Pathnames.ROOT,
    element: <ProductsListPage />,
  },
  {
    path: Pathnames.LOGIN,
    element: <AuthPage />,
  },
  {
    path: Pathnames.ORDER_ID,
    element: <OrdersPage />,
  },
]);

export { router };
