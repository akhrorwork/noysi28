import { Link, useActionData, Form } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { validateSignupOrLoginData } from "../utils";
import { useAuthWithGoogle } from "../hooks/useAuthWithGoogle";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("confirmPassword");
  return { displayName, email, password, confirmPassword };
};

function Register() {
  const { googleAuth, isPending } = useAuthWithGoogle();
  const [error, setError] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { registerWithEmailAndPassword } = useRegister();

  const signupActionData = useActionData();

  useEffect(() => {
    if (signupActionData) {
      const { valid, errors } = validateSignupOrLoginData(
        signupActionData,
        true
      );

      if (valid) {
        const { displayName, email, password } = signupActionData;
        registerWithEmailAndPassword(displayName, email, password);
      } else {
        setError(errors);
      }
    }
  }, [signupActionData]);

  console.log(error);
  return (
    <div className="h-screen grid place-items-center w-full">
      <Form action="" method="post" className="max-w-96 mx-auto w-full">
        <h2 className="text-4xl text-center mb-5 font-bold">Register</h2>
        <FormInput
          type="text"
          placeholder="Name"
          label="Display Name"
          name="name"
          error={error.displayName && "input-error"}
          errorText={error.displayName}
        />
        <FormInput
          type="email"
          placeholder="Name"
          label="Email"
          name="email"
          error={error.email && "input-error"}
          errorText={error.email}
        />
        <FormInput
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
          error={error.password && "input-error"}
          errorText={error.password}
        />
        <FormInput
          type="password"
          placeholder="Repeat Password"
          label="Repeat Password"
          name="confirmPassword"
          error={error.confirmPassword && "input-error"}
          errorText={error.confirmPassword}
        />
        <div className="my-5 flex flex-col gap-3">
          <button className="btn btn-primary btn-block">Register</button>
          <button
            disabled={isPending}
            onClick={googleAuth}
            type="button"
            className="btn btn-secondary btn-block"
          >
            {isPending ? "Loading..." : "Google"}
          </button>
        </div>

        <div className="text-center">
          <p>
            If you have accounter,
            <Link className="link link-primary " to="/login">
              Login
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Register;
