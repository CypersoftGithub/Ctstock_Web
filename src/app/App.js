import React, { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import "./App.css";
import AppRoutes from "./AppRoutes";
import Navbar from "./views/shared/Navbar";
import Sidebar from "./views/shared/Sidebar";

const App = () => {
  const { pathname } = useLocation();
  const [isFullPageLayout, setIsFullPageLayout] = useState(false);

  const onRouteChanged = () => {
    const body = document.querySelector("body");
    if (pathname === "/layout/RtlLayout") {
      body.classList.add("rtl");
    } else {
      body.classList.remove("rtl");
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [
      "/login",
      "/404"
    ];
    const isFullPage = fullPageLayoutRoutes.includes(pathname);
    setIsFullPageLayout(isFullPage);
    if (!isFullPage) {
      if (
        pathname.startsWith("/reset_password") ||
        pathname.startsWith("/signup")
      ) {
        setIsFullPageLayout(true);
      }
    }
  };

  useEffect(() => {
    onRouteChanged();
  }, [pathname]);

  // Redirect root path to /user
  if (pathname === '/') {
    return <Navigate to="/user" replace />;
  }

  let navbarComponent = !isFullPageLayout ? <Navbar /> : "";
  let sidebarComponent = !isFullPageLayout ? <Sidebar /> : "";

  return (
    <div className="container-scroller">
      {navbarComponent}
      <div
        className={`container-fluid page-body-wrapper ${
          pathname === "/login" ||
          pathname === "/404"
            ? "full-page-wrapper p-0"
            : ""
        }`}
      >
        {sidebarComponent}
        <div className="main-panel">
          <div className="content-wrapper">
            <AppRoutes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;