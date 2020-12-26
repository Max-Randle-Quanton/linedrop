import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  flexColContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(4),
  },
  flexColItem: {
    marginBottom: theme.spacing(4),
  },
  center: {
    textAlign: "center",
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  return (
    <Container className={clsx(classes.flexColContainer)} maxWidth="sm">
      <Typography
        className={clsx(classes.flexColItem, classes.center)}
        variant="h1"
      >
        Login
      </Typography>
    </Container>
  );
};

export default LoginPage;
