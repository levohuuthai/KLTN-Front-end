import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Controller } from "react-hook-form";

PasswordField.propTypes = {
  //   form: PropTypes.object.isRequired,
  //   name: PropTypes.string.isRequired,
  //   label: PropTypes.string,
  //   disabled: PropTypes.bool,
};

function PasswordField(props) {
  const { form, name, label, disabled } = props;
  const { errors, formState } = form;
  const hasError = errors[name];

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  return (
    <>
      <FormControl variant="outlined" margin="normal">
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Controller
          name={name}
          control={form.control}
          as={OutlinedInput}
          id={name}
          type={showPassword ? "text" : "password"}
          value={showPassword.password}
          label={label}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
              >
                {showPassword.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          disabled={disabled}
          error={!!hasError}
          // helperText={errors[name]?.message}
        />
      </FormControl>
      <FormHelperText error={!!hasError}>
        {errors[name]?.message}
      </FormHelperText>
    </>
  );
}

export default PasswordField;
