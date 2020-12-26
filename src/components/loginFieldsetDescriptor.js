import { FreeTextInput, PasswordInput } from "./InputComponents";

export const fieldset = ["username", "password"];

export const blankForm = {
  username: "",
  password: "",
};
export const loginFormFieldsetDescriptor = {
  username: {
    displayName: "Username",
    displayValue: (data) => data.username,
    inputComponent: FreeTextInput,
    validationTests: [
      {
        test: (data) => data.username !== "",
        feedback: "field is required",
      },
    ],
  },

  password: {
    displayName: "Password",
    displayValue: (data) => "",
    inputComponent: PasswordInput,
    vaildationTests: [
      {
        test: (data) => data.password !== "",
        feedback: "field is required",
      },
    ],
  },
};
