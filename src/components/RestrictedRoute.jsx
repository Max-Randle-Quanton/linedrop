import { Backdrop, CircularProgress } from "@material-ui/core";
import Axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Route } from "react-router-dom";
import { getStoredToken } from "../helpers";
import { UserDataContext } from "./UserDataContext";

const RestrictedRoute = ({
  RestrictedComponent,
  UnrestrictedComponent,
  ...rest
}) => {
  const { userData, setUserData } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyJWT = async () => {
      try {
        setLoading(true);
        const res = await Axios({
          method: "POST",
          url: "/graphql",
          headers: {
            "content-type": "application/json",
            Authorization: `bearer ${getStoredToken()}`,
          },
          data: JSON.stringify({
            query: `
              query {
                verifyJwt {
                  _id
                  username
                }
              }
            `,
          }),
        });

        const { username, userId: _id } = res.data.data.verifyJwt;
        setUserData({
          username,
          _id,
          loggedIn: true,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (!userData.loggedIn) {
      verifyJWT();
    }
  }, [userData.loggedIn, setUserData]);

  return loading ? (
    <Backdrop open>
      <CircularProgress size={120} />
    </Backdrop>
  ) : (
    <Route
      {...rest}
      component={
        userData.loggedIn ? RestrictedComponent : UnrestrictedComponent
      }
    />
  );
};

export default RestrictedRoute;
