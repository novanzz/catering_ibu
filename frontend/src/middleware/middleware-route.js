import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { tokenAuthenticated } from "./cookies-manager";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authToken = tokenAuthenticated().authToken;
  // const adminRoute = { ...rest };

  console.log("private", authToken);
  // console.log(tokenAuth.tokenAuthenticated());
    return (
      <Route
        {...rest}
        render={props =>
          authToken ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
        }
      />
    );
}

export { PrivateRoute };
