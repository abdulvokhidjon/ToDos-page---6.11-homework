import { Form, Link, useActionData } from "react-router-dom";
import { useEffect } from "react";
import { FormInput } from "../components";
import { useRegister } from "../hooks/useRegister";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const displayName = formData.get("displayName");
  const photoURL = formData.get("photoURL");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  return { displayName, photoURL, email, password, confirmPassword };
};

function Register() {
  const userData = useActionData();
  const { isPending, registerWithGoogle, registerEmailAndPassword, error } = useRegister();

  useEffect(() => {
    if (userData) {
      registerEmailAndPassword(userData.email, userData.password, userData.displayName, userData.photoURL, userData.confirmPassword);
    }
  }, [userData]);

  return (
    <div className="auth-container">
      <div className="auth-bg-register auth-right">
        <Form method="post" className="flex flex-col w-[340px] shadow-2xl p-7 rounded-xl bg-[rgba(255,255,255,0.75)]">
          <h1 className="text-4xl font-semibold text-center text-emerald-500">Register</h1>
          <FormInput label="Your Name :" type="text" name="displayName" placeholder="Your Name" />
          <FormInput label="Photo Image URL :" type="url" name="photoURL" placeholder="Photo Image URL" />
          <FormInput label="Email :" type="email" name="email" placeholder="Email" />
          <FormInput label="Password :" type="password" name="password" placeholder="Password" />
          <FormInput label="Confirm Password :" type="password" name="confirmPassword" placeholder="Confirm Password" />
          <div className="mt-6">
            {isPending ? (
              <button disabled className="btn btn-info  border-red-400 btn-block font-bold">
                Loading...
              </button>
            ) : (
              <button className="btn btn-info text-black border-red-400 btn-block mb-2 font-bold ">
                Register
              </button>
            )}
          </div>
          <div>
            {!isPending && (
              <button onClick={registerWithGoogle} type="button" className="btn bg-green-300 border-red-400 text-black btn-block font-bold">
                Google
              </button>
            )}
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="text-center mt-2">
            <p className="font-medium text-slate-500">
              If you already have an account, <Link className="link link-primary" to="/login">Login</Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
