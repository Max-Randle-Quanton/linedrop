import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FormBase from "./FormBase";
import PropTypes from "prop-types";

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

const CardForm = ({
  title,
  fieldset,
  fieldsetDescriptor,
  initialData,
  buttonText,
  onSubmit,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <FormBase
      inputClassName={classes.input}
      fieldset={fieldset}
      initialData={initialData}
      fieldsetDescriptor={fieldsetDescriptor}
      onSubmit={(formData, onSuccess, onFail) => {
        // gives a chance to override any of the callbacks
        onSubmit(formData, onSuccess, onFail);
      }}
      WrapperComponent={({
        renderFields,
        renderButton,
        renderFeedback,
        ...wrapperRest
      }) => (
        <Card {...rest} {...wrapperRest}>
          <CardHeader title={title} />
          <Divider />
          <CardContent>{renderFields}</CardContent>
          <Divider />
          {renderFeedback}
          <CardActions>
            <Box style={{ flexGrow: 1 }} /> {renderButton}
          </CardActions>
        </Card>
      )}
      FeedbackComponent={({ message }) => (
        <>
          <CardContent>
            <Typography>{message}</Typography>
          </CardContent>
          <Divider />
        </>
      )}
      ButtonComponent={(props) => (
        <Button variant="contained" color="primary" {...props}>
          {buttonText}
        </Button>
      )}
    />
  );
};

export default CardForm;

CardForm.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  fieldset: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialData: PropTypes.object,
  fieldsetDescriptor: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
