import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/styles";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  title: {
    color: "#fff",
  },
}));
function InputField(props) {
  const { form, name, label, disabled } = props;
  const { errors, formState } = form;
  const hasError = formState.touched[name] && errors[name];
  // console.log(errors[name], formState[name]);

  const classes = useStyles();

  return (
    <Controller
      name={name}
      control={form.control}
      as={TextField}
      label={label}
      margin="normal"
      variant="outlined"
      fullWidth
      // disabled={disabled}
      // className={classes.root}
      InputProps={{
        className: classes.root,
      }}
      // error={!!hasError}
      // helperText={errors[name]?.message}
    ></Controller>
  );
}

export default InputField;
