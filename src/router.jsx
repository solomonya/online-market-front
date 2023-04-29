import { createBrowserRouter } from "react-router-dom";
import { AuthPage, ProductsListPage } from "@/pages";
import { Pathnames } from "./utils/constants";

const router = createBrowserRouter([
  {
    path: Pathnames.ROOT,
    element: <ProductsListPage />,
  },
  {
    path: Pathnames.LOGIN,
    element: <AuthPage />,
  },
]);

export { router };
