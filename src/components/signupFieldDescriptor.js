import { FreeTextInput, PasswordInput } from "./InputComponents";

export const fieldset = ["username", "password", "confirmPassword"];

export const blankForm = {
  username: "",
  password: "",
  confirmPassword: "",
};
export const signupFormFieldsetDescriptor = {
  username: {
    displayName: "Username",
    displayValue: (data) => data.username,
    inputComponent: FreeTextInput,
    validationTests: [
      {
        test: (data) => data.username !== "",
        feedback: "field is required",
      },
      {
        test: (data) => /^[\w-]*$/i.test(data.username),
        feedback: "may only contain letters and numbers",
      },
      {
        test: (data) => data.username.length >= 3,
        onFailFeedback: "too short",
      },
      {
        test: (data) => data.username.length >= 15,
        onFailFeedback: "too long",
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
      {
        test: (data) => data.password.length >= 6,
        feedback: "too short",
      },
      {
        test: (data) => data.password === data.confirmPassword,
        feedback: "passwords much match",
      },
    ],
  },

  confirmPassword: {
    displayName: "Confirm Password",
    displayValue: (data) => "",
    inputComponent: PasswordInput,
    vaildationTests: [
      {
        test: (data) => data.confirmPassword !== "",
        feedback: "field is required",
      },
      {
        test: (data) => data.confirmPassword.length >= 6,
        feedback: "too short",
      },
      {
        test: (data) => data.confirmPassword === data.password,
        feedback: "passwords much match",
      },
    ],
  },
};
