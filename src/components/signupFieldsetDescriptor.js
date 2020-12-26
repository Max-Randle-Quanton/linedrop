import { FreeTextInput, PasswordInput } from "./InputComponents";

export const fieldset = ["username", "password", "confirmPassword"];

export const blankForm = {
  username: "",
  password: "",
  confirmPassword: "",
};

export const signupFieldsetDescriptor = {
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
        feedback: "too short",
      },
      {
        test: (data) => data.username.length <= 15,
        feedback: "too long",
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
      {
        test: (data) => data.password.length >= 5,
        feedback: "too short",
      },
      {
        test: (data) => data.password.length <= 24,
        feedback: "too long",
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
    validationTests: [
      {
        test: (data) => data.confirmPassword !== "",
        feedback: "field is required",
      },
      {
        test: (data) => data.confirmPassword.length >= 5,
        feedback: "too short",
      },
      {
        test: (data) => data.confirmPassword.length <= 24,
        feedback: "too long",
      },
      {
        test: (data) => data.confirmPassword === data.password,
        feedback: "passwords much match",
      },
    ],
  },
};
