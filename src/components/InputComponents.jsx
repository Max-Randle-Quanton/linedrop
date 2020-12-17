// input component custom must-catch props if not accepted as ...rest by underlying element:
// label
// name
// value
// onUpdate
// error
// helperText

import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

export const FreeTextInput = ({ onUpdate, ...rest }) => (
  <TextField
    onChange={(event) => onUpdate(event.target.name, event.target.value)}
    {...rest}
  />
);

FreeTextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

export const PasswordInput = ({ onUpdate, ...rest }) => (
  <TextField
    onChange={(event) => onUpdate(event.target.name, event.target.value)}
    type="password"
    {...rest}
  />
);

PasswordInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  error: PropTypes.bool,
};
