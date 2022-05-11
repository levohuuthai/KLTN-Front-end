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
function backup(props) {
  const { form, name, label, disabled, onChange, value } = props;
  const { errors, formState } = form;
  const hasError = errors[name];
  // console.log(errors[name], "error");
  // console.log(formState, "formState[name]");

  const classes = useStyles();
  // console.log(value);
  return (
    <Controller
      // as={TextField}
      // name="TextField"
      name={name}
      control={form.control}
      // defaultValue=""
      // value={value}
      // label={label}
      // onChange={onChange}
      // error={!!hasError}
      // helperText={errors[name]?.message}
      // InputProps={{
      //   className: classes.root,
      // }}
      render={(props) => (
        <TextField
          name={props.name}
          label={label}
          margin="normal"
          variant="outlined"
          fullWidth
          value={props.value}
          onChange={props.onChange}
          inputRef={props.ref} // wire up the input ref
          error={!!hasError}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
}

export default backup;
