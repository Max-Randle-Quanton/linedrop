// input component custom must-catch props if not accepted as ...rest by underlying element:
// label
// name
// value
// onUpdate
// error
// helperText

import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export const FreeTextInput = ({ onUpdate, helperText, ...rest }) => (
  <TextField
    onChange={(event) => onUpdate(event.target.name, event.target.value)}
    helperText={helperText || " "}
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

export const PasswordInput = ({ onUpdate, helperText, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      onChange={(event) => onUpdate(event.target.name, event.target.value)}
      type={showPassword ? "text" : "password"}
      helperText={helperText || " "}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};
PasswordInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  error: PropTypes.bool,
};
