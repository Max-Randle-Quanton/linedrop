import React, { useContext } from "react";
import { Container, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import {
  fieldset,
  blankForm,
  loginFieldsetDescriptor,
} from "./loginFieldsetDescriptor";
import CardForm from "./CardForm";
import Axios from "axios";
import { UserDataContext } from "./UserDataContext";
import { setStoredToken } from "../helpers";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  flexColContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
  },
  flexColItem: {
    marginBottom: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
  center: {
    textAlign: "center",
  },
}));

const LoginPage = () => {
  const { setUserData } = useContext(UserDataContext);
  const history = useHistory();

  const handleLoginRequest = async (formData, onSuccess, onFail) => {
    try {
      const res = await Axios({
        method: "POST",
        url: "/graphql",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify({
          query: `
            query {
              login(username: "${formData.username}", password: "${formData.password}") {
                userId
                username
                token
              }
            }
          `,
        }),
      });

      const { username, userId, token } = res.data.data.login;
      setStoredToken(token);
      setUserData({
        username,
        userId,
        loggedIn: true,
      });
      onSuccess();
      history.push("/");
    } catch (err) {
      onFail(err?.response?.data?.errors[0]?.message);
    }
  };

  const classes = useStyles();
  return (
    <Container className={clsx(classes.flexColContainer)} maxWidth="sm">
      <CardForm
        title="Log In"
        fieldset={fieldset}
        fieldsetDescriptor={loginFieldsetDescriptor}
        initialData={blankForm}
        buttonText="log in"
        onSubmit={handleLoginRequest}
      />
    </Container>
  );
};

export default LoginPage;
