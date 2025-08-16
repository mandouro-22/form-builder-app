import type { LoginFormValues, RegisterFormValues } from "../validations/auth";

type Register = {
  name: keyof RegisterFormValues;
  label: string;
  type: string;
  placeholder: string;
};

type Login = {
  name: keyof LoginFormValues;
  label: string;
  type: string;
  placeholder: string;
};

export const login: Login[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
  },
];

export const register: Register[] = [
  {
    label: "Full Name",
    name: "fullName",
    type: "text",
    placeholder: "Enter your full name",
  },
  {
    label: "Username",
    name: "username",
    type: "text",
    placeholder: "Choose a username",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Re-enter your password",
  },
];
