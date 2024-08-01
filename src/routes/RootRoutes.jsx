// src/routes/RootRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import RouteConfig from "./RouteConfig";
import Layout from "../layouts/Layout";
import PrivateRoute from "./PrivateRoute";

const RootRoutes = () => {
  return (
    <Routes>
      {RouteConfig.map((route, index) => {
        // console.log('route: ' + route.path);
        const Pages = route.component;
        return route.requiresAuth ? (
          <Route
            key={index}
            path={route.path}
            element={
              <PrivateRoute>
                {route.layout ? (
                  <Layout>
                    <Pages />
                  </Layout>
                ) : (
                  <Pages />
                )}
              </PrivateRoute>
            }
          />
        ) : (
          <Route
            key={index}
            path={route.path}
            element={
              route.layout ? (
                <Layout>
                  <Pages />
                </Layout>
              ) : (
                <Pages />
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default RootRoutes;
