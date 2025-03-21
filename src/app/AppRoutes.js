import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Spinner from "../app/views/shared/Spinner";

const Error404 = lazy(() => import("./views/pages/error/Error404"));
const Login = lazy(() => import("./views/pages/auth/Login"));
const Users = lazy(() => import("./views/pages/user/Users"));
const UserDetail = lazy(() => import("./views/pages/user/UserDetail"));
const AddUser = lazy(() => import("./views/pages/user/AddUser"));
const Company = lazy(() => import("./views/pages/company/Listcompany"));
const Register = lazy(() => import("./views/pages/register/Register"));
const AddRegister = lazy(() => import("./views/pages/register/AddRegister"));
const RegisterDetails = lazy(() => import("./views/pages/register/RegisterDetails"));
const AddCompany = lazy(() => import("./views/pages/company/AddCompany"));
const CompanyDetails = lazy(() => import("./views/pages/company/CompanyDetails"))
const AddSoftware = lazy(() => import("./views/pages/softwares/AddSoftware"))
const SoftwareDetails = lazy(() => import("./views/pages/softwares/SoftwareDetails"))

const SecureRoute = ({ redirectPath = "/login", children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/login" element={<Login />} />{" "}
        <Route
          path="/user"
          element={
            <SecureRoute>
              <Users />
            </SecureRoute>
          }
        />
        <Route
          path="/user/add"
          element={
          <SecureRoute>
            <AddUser />
          </SecureRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
          <SecureRoute>
            <UserDetail />
          </SecureRoute>
          }
        />
        <Route
          path="/company"
          element={
          <SecureRoute>
            <Company />
          </SecureRoute>
          }
        />
        <Route
          path="/company/add"
          element={
          <SecureRoute>
            <AddCompany />
          </SecureRoute>
          }
        />
        <Route
          path="/company/:id"
          element={
          <SecureRoute>
            <CompanyDetails />
          </SecureRoute>
          }
        />
        <Route
          path="/register"
          element={
          <SecureRoute>
            <Register />
          </SecureRoute>
          }
        />
        <Route
          path="/register/add"
          element={
          <SecureRoute>
            <AddRegister/>
          </SecureRoute>
          }
        />
        <Route
          path="/register/:id"
          element={
          <SecureRoute>
            <RegisterDetails />
          </SecureRoute>
          }
        />
        <Route
          path="/software/:id"
          element={
          <SecureRoute>
            <SoftwareDetails />
          </SecureRoute>
          }
        />
        <Route
          path="/software/add/:id"
          element={
          <SecureRoute>
            <AddSoftware />
          </SecureRoute>
          }
        />
        <Route path="*" element={
          <SecureRoute>
            <Error404 />
          </SecureRoute>
        } />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
