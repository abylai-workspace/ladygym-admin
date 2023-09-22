import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import "./scss/App.scss";
import { useSelector } from "react-redux";
import Tasks from "./pages/Tasks/Tasks";
import FinancePlan from "./pages/FinancePlan/FinancePlan";
import WorkAnalizy from "./pages/AnalizyWork/WorkAnalizy";
import CountVisit from "./pages/CountVisit/CountVisit";
import NotificationFreeze from "./pages/NotificationFreeze/NotificationFreeze";
import { Toaster } from "react-hot-toast";

const Dashboard = React.lazy(() => import("./pages/Clients/Clients"));
const Customers = React.lazy(() => import("./pages/Customer/Customers"));
const CustomerEdit = React.lazy(() => import("./pages/CustomerEdit"));
const Products = React.lazy(() => import("./pages/Personal"));
const ProductEdit = React.lazy(() => import("./pages/ProductEdit"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const BlankPage = React.lazy(() => import("./pages/Analytics"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/task" element={<Tasks />} />
              <Route path="/finance-plan" element={<FinancePlan />} />
              <Route path="/WorkAnalizy" element={<WorkAnalizy />} />
              <Route path="/CountVisit" element={<CountVisit />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/NotificationFreeze" element={<NotificationFreeze />} />

            
              <Route path="/customers/:customerId" element={<CustomerEdit />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductEdit />} />
              <Route path="/analytics" element={<BlankPage />} />
              <Route path="/discount" element={<BlankPage />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
