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
  const { form, name, label, disabled, onChange, value } = props;
  const { errors, formState } = form;
  const hasError = errors[name];
  // console.log(errors[name], formState[name]);
  const classes = useStyles();
  return (
    <Controller
      as={TextField}
      name={name}
      label={label}
      control={form.control}
      defaultValue=""
      value={value}
      margin="normal"
      variant="outlined"
      fullWidth
      error={!!hasError}
      helperText={errors[name]?.message}
      InputProps={{
        className: classes.root,
      }}
      // render={({ props }) => {
      //   return (
      //     <TextField
      //       label={label}
      //       onChange={onChange}
      //       value={value}
      //       margin="normal"
      //       variant="outlined"
      //       fullWidth
      //       error={!!hasError}
      //       helperText={errors[name]?.message}
      //     />
      //   );
      // }}
    />
  );
}

export default InputField;
