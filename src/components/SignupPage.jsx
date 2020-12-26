import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import {
  fieldset,
  blankForm,
  signupFieldsetDescriptor,
} from "./signupFieldsetDescriptor";
import CardForm from "./CardForm";
import Axios from "axios";

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

const SignupPage = () => {
  const handleSignupRequest = async (formData, onSuccess, onFail) => {
    try {
      await Axios({
        method: "POST",
        url: "/graphql",
        headers: {
          "content-type": "application/json",
        },
        data: JSON.stringify({
          query: `
            mutation {
              createUser(username: "${formData.username}", password: "${formData.password}") {
                _id
                username
                password
              }
            }
          `,
        }),
      });
      onSuccess();
    } catch (err) {
      onFail(err?.response?.data?.errors[0]?.message);
    }
  };

  const classes = useStyles();
  return (
    <Container className={clsx(classes.flexColContainer)} maxWidth="sm">
      <CardForm
        title="Sign Up"
        fieldset={fieldset}
        fieldsetDescriptor={signupFieldsetDescriptor}
        initialData={blankForm}
        buttonText="sign up"
        onSubmit={handleSignupRequest}
      />
    </Container>
  );
};

export default SignupPage;
