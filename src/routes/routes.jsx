import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { SplashScreen } from "../pages/SplashScreen";
import { Home } from "../pages/home";
import { Lists } from "../pages/Lists";
import { Stores } from "../pages/Stores";
import { Products } from "../pages/Products";
import { Categories } from "../pages/Categories";
import { PurchaseRecords } from "../pages/PurchaseRecords";
import { MyExpenses } from "../pages/MyExpenses";
import { Inventory } from "../pages/Inventory";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const routes = createBrowserRouter([
  { path: "/", element: <SplashScreen /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },

  
  {
    element: <ProtectedRoute />, 
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "home", element: <Home /> },
          // { path: "list", element: <Lists /> },
          { path: "stores", element: <Stores /> },
          { path: "products", element: <Products /> },
          { path: "categories", element: <Categories /> },
          // { path: "purchase-records", element: <PurchaseRecords /> },
          { path: "my-expenses", element: <MyExpenses /> },
          // { path: "inventory", element: <Inventory /> },
        ],
      },
    ],
  },
]);