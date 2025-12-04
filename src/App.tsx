import "./App.css";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load components
const Body = lazy(() => import("./Body/Body"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const Products = lazy(() => import("./Products/Products"));

// Loading fallback component
const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
    }}
  >
    <div className="loader">Loading...</div>
  </div>
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<PageLoader />}>
              <Body />
            </Suspense>
          ),
        },
        {
          path: "home",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Body />
            </Suspense>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Products />
            </Suspense>
          ),
        },
        {
          path: "dashboard",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
