import React from "react";

export function useFormAndValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
  };

  return { values, handleChange, errors, setValues };
}