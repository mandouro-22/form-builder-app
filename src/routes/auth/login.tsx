import { createRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "./layout";
import { login } from "../../api/api";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "../../validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export const Login = createRoute({
  getParentRoute: () => AuthLayout,
  path: "/login",
  component: Page,
});

function Page() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitLogin = (value: LoginFormValues) => {
    console.log(value);
  };

  return (
    <section className="h-screen w-full p-4 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-gradient-to-tr from-gray-200/40 via-blue-200/40 to-cyan-200/40 h-auto rounded-xl shadow p-4">
        <div className="flex items-center flex-col gap-1">
          <h1 className="font-bold text-gray-800 text-xl">Form Builder App</h1>
          <h3 className="font-medium text-gray-800 text-lg">Login</h3>
        </div>

        <form
          onSubmit={form.handleSubmit(handleSubmitLogin)}
          className="space-y-3 mt-3">
          {login.map((field, index) => (
            <div key={index} className="flex flex-col gap-y-2">
              <label htmlFor={field.name} className="font-medium text-gray-800">
                {field.label}
              </label>
              <input
                type={field.type}
                {...form.register(field.name)}
                name={field.name}
                placeholder={field.placeholder}
                className={`input py-2 px-3 border rounded ${
                  form.formState.errors[field.name]
                    ? "!border-red-500"
                    : "!border-black/5"
                }`}
              />
              {form.formState.errors[field.name] && (
                <p className="text-red-600 text-sm">
                  {form.formState.errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="btn bg-cyan-700 w-full font-medium text-white">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-3">
          Don’t have an account?{" "}
          <Link
            to="/auth/sign-up"
            className="text-cyan-700 font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
