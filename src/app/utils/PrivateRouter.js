import React from "react";
import { Route, Redirect } from "react-router-dom";
import Sidebar from "../components/layouts/Sidebar";
const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("username")) {
          return (
            <>
              <Sidebar>
                <Component {...props} />
              </Sidebar>
            </>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRouter;
