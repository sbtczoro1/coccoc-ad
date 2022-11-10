export const getErrorMessageOnField = (name, value, formRules, formData) => {
  const field = formRules.find((rule) => rule.name === name);
  const rules = field?.rules;
  if (!rules || rules.length === 0) {
    return "";
  }

  if (rules.isRequired && !value.trim()) {
    return field.nameValidate + " is required.";
  }

  if (rules.fieldMatch) {
    const matchField = formRules.find((rule) => rule.name === rules.fieldMatch);
    const isMatch = formData[rules.fieldMatch].trim() === value.trim();
    if (!isMatch) {
      return (
        field.nameValidate + " is not match with " + matchField.nameValidate
      );
    }
  }

  if (rules.isEmail) {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(value.trim()) ? "" : "Enter a valid email address";
  }
};

export const getAllErrorsForm = (formRules, formData) => {
  const allErrorsForm = {};
  formRules.forEach((field) => {
    const error = getErrorMessageOnField(
      field.name,
      formData[field.name],
      formRules,
      formData
    );
    if (error) {
      allErrorsForm[field.name] = error;
    }
  });

  return allErrorsForm;
};
