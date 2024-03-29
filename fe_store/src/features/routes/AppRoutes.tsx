import { Header } from "common/components/Header";
import { OrderCart } from "common/components/OrderCart";
import { HomePage } from "pages/HomePage";
import { OrderPage } from "pages/OrderPage";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { AuthCheck } from "layout/AuthCheck";
import { useMemo } from "react";
import { CheckoutRoute } from "./CheckoutRoute";
import { HistoryPage } from "pages/HistoryPage";
import { NotFoundPage } from "pages/NotFoundPage";
import useAuth from "hooks/useAuth";
import { UserProfilePage } from "pages/UserProfilePage";

export const AppRoutes = (): JSX.Element => {
  const { currentUserProfile } = useAuth();

  const APP_ROUTES = [
    {
      path: "home",
      element: <HomePage />,
    },
    {
      path: "checkout/*",
      element: (
        <AuthCheck allow={true}>
          <CheckoutRoute />
        </AuthCheck>
      ),
    },
    {
      path: "history/*",
      element: (
        <AuthCheck allow={true}>
          <HistoryPage />
        </AuthCheck>
      ),
    },
    {
      path: "profile",
      element: (
        <AuthCheck allow={!!currentUserProfile}>
          <UserProfilePage />
        </AuthCheck>
      ),
    },
    {
      path: "order",
      element: <OrderPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];
  const { pathname } = useLocation();
  const isOrderCartShow = useMemo(() => {
    return !pathname.includes("checkout");
  }, [pathname]);
  return (
    <div>
      <Header />
      {isOrderCartShow && <OrderCart />}
      <Routes>
        <Route
          path="/"
          element={
            <div
              className={`mt-24 py-8 px-16 ${
                isOrderCartShow ? "w-4/5 mt-24" : "w-full"
              }`}
            >
              <Outlet />
            </div>
          }
        >
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<HomePage />} />
          {APP_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
