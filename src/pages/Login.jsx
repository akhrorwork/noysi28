import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { useSelector } from "react-redux";
import { Button } from "../components/Button";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  return { email, password };
};

function Login() {
  const { isPending } = useSelector((store) => store.user);
  const { loginWithEmailandPassword } = useLogin();
  const data = useActionData();
  useEffect(() => {
    if (data) {
      loginWithEmailandPassword(data.email, data.password);
    }
  }, [data]);
  return (
    <div className="h-screen grid place-items-center w-full">
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h2 className="text-4xl text-center mb-5 font-bold">Login</h2>
        <FormInput type="email" placeholder="Name" label="Email" name="email" />
        <FormInput
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
        />
        <div className="my-5">
          {/* {!isPending && (
            <button className="btn btn-primary btn-block">Login</button>
          )}
          {isPending && (
            <button className="btn btn-primary btn-block" disabled>
              Loading..
            </button>
          )} */}
          <Button loading={isPending}>Login</Button>
        </div>

        <div className="text-center">
          <p>
            If you don't have accounter yet,
            <Link className="link link-primary" to="/register">
              Register
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Login;
