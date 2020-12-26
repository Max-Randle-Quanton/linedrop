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

  const verifyJWT = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        mothod: "POST",
        url: "/graphql",
        headers: {
          "content-type": "application/json",
          Authorization: `bearer ${getStoredToken()}`,
        },
      });
      console.log(res);
      const { username, userId } = res.data.data.verifyJwt;
      setUserData({
        username,
        userId,
        loggedIn: true,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData.loggedId) {
      verifyJWT();
    }
  }, []);

  //   return (
  //     <Backdrop open>
  //       <CircularProgress size={120} />
  //     </Backdrop>
  //   );

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
