import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthLayout } from "./layout";
import { useForm } from "react-hook-form";
import { register } from "../../api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../validations/auth";
import { createRoute, Link, useNavigate } from "@tanstack/react-router";
import { doc, setDoc } from "firebase/firestore";
import { Loader2Icon } from "lucide-react";

export const SignUp = createRoute({
  getParentRoute: () => AuthLayout,
  path: "/sign-up",
  component: Page,
});

function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const handleRegisterSubmit = async (value: RegisterFormValues) => {
    setLoading(true);
    try {
      if (!value) return;

      // create account
      const credential = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );

      const user = credential.user;

      const newUser = {
        fullName: value.fullName,
        email: user.email,
        username: value.username,
      };

      // save user in Firestore
      await setDoc(doc(db, "users", user.uid), newUser);
      const idToken = await credential.user.getIdToken();
      // add token in the localstorage.
      sessionStorage.setItem("token", idToken);

      navigate({
        to: "/",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration error:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen w-full p-4 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-gradient-to-tr from-gray-200/40 via-blue-200/40 to-cyan-200/40 h-auto rounded-xl shadow p-4">
        <div className="flex items-center flex-col gap-1">
          <h1 className="font-bold text-gray-800 text-xl">Form Builder App</h1>
          <h3 className="font-medium text-gray-800 text-lg">Sign Up</h3>
        </div>

        <form
          onSubmit={form.handleSubmit(handleRegisterSubmit)}
          className="space-y-3 mt-3">
          {register.map((field, index) => (
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
            className="btn bg-cyan-700 w-full font-medium text-white flex items-center justify-center"
            disabled={loading}>
            {loading ? (
              <Loader2Icon className="size-6 animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-3">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-cyan-700 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}
