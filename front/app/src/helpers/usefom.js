const useForm = (callback, validate, values, setValues, errors, setErrors) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const foundErrors = validate(values);
    setErrors(foundErrors);

    const valuesPolyfill = function values(object) {
      return Object.keys(object).map((key) => object[key]);
    };

    let errors = valuesPolyfill(foundErrors);
    errors = errors.filter((el) => el !== "");

    const errorsLen = errors.length;
    if (!errorsLen) {
      callback();
    }
  };
  return { handleChange, values, handleSubmit, errors };
};

export default useForm;
