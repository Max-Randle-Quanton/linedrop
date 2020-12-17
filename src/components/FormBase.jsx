import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import populateFields from "./populateFormFields";

const useStyles = makeStyles((theme) => ({
  flexColContainer: {
    display: "flex",
    flexDirection: "column",
  },

  flexColItem: {
    marginBottom: theme.spacing(3),
  },
}));

const FormBase = ({
  fieldset,
  initialData,
  fieldsetDescriptor,
  onSubmit,
  disabledColumns,
  className,
  WrapperComponent,
  ...rest
}) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialData);
  const [feedback, setFeedback] = useState("");

  return (
    <WrapperComponent
      renderTitle={}
      renderFields={populateFields({
        fieldset,
        formData,
        setFormData,
        fieldsetDescriptor,
        className,
        ...rest,
      })}
    />
  );
};

FormBase.propTypes = {
  fieldset: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialData: PropTypes.object,
  fieldsetDescriptor: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormBase;
