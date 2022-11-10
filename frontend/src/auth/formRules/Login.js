const loginFormRules = [
  {
    name: "email",
    nameValidate: "Email",
    rules: {
      isEmail: true,
    },
  },
  {
    name: "password",
    nameValidate: "Password",
    rules: {
      isRequired: true,
    },
  },
];

export default loginFormRules;
