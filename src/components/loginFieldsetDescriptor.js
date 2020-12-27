import { FreeTextInput, PasswordInput } from "./InputComponents";

export const fieldset = ["username", "password"];

export const blankForm = {
  username: "",
  password: "",
};
export const loginFieldsetDescriptor = {
  username: {
    displayName: "Username",
    displayValue: (data) => data.username,
    inputComponent: FreeTextInput,
    inputComponentProps: {
      autoFocus: true,
    },
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
    validationTests: [
      {
        test: (data) => data.password !== "",
        feedback: "field is required",
      },
    ],
  },
};
