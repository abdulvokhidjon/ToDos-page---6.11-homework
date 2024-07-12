import { Form, Link, useActionData } from "react-router-dom";
import { useEffect } from "react";
import { FormInput } from "../components";
import { useLogin } from "../hooks/useLogin";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  return { email, password };
};

function Login() {
  const userData = useActionData();
  const { isPending, signIn, signInWithGoogle, error } = useLogin();

  useEffect(() => {
    if (userData) {
      signIn(userData.email, userData.password);
    }
  }, [userData]);

  return (
    <div className="auth-container">
      <div className="auth-bg-login auth-right">
        <Form
          method="post"
          className="flex flex-col gap-5 w-[340px] shadow-2xl p-7 rounded-xl  bg-[rgba(255,255,255,0.6)]"
        >
          <h1 className="text-4xl font-semibold text-center text-emerald-500">Login</h1>
          <FormInput
            label="Email :"
            type="email"
            name="email"
            placeholder="Email"
          />
          <FormInput
            label="Password :"
            type="password"
            name="password"
            placeholder="Password"
          />
          <div className="form-control flex items-center">
            <label className="cursor-pointer flex gap-1">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-secondary w-4 h-4"
              />
              <span className="text-[10px] mr-16 ">Remember Password</span>
              <span className="text-[10px] text-primary">Forgot password?</span>
            </label>
          </div>
          <div>
            {isPending ? (
              <button disabled className="btn btn-primary btn-block font-bold">
                Loading...
              </button>
            ) : (
              <button className="btn btn-primary btn-block font-bold">
                Login
              </button>
            )}
          </div>
          <div>
            {isPending ? (
              <button
                disabled
                className="btn bg-green-300 border-red-400 btn-block font-bold"
              >
                Loading...
              </button>
            ) : (
              <button
                onClick={signInWithGoogle}
                type="button"
                className="btn bg-green-300 border-red-400 btn-block font-bold"
              >
                Google
              </button>
            )}
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="text-center text-emerald-500">
            <p className="font-medium text-slate-500">
              If you don't have an account,{" "}
              <Link className="link link-primary" to="/register">
                Register
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
