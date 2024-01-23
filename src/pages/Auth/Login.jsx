import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillGoogleCircle,
} from "react-icons/ai";
import { AuthContext } from "../../context/AuthContextProvider";

function Login() {
  const { handleLogin, handleGoogleSignIn } = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleVisiblePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      keepLogin: true,
    },

    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    }),

    onSubmit: (values) => {
      handleLogin(values, "Handle Login ");
    },
  });
  return (
    <div>
      <div>
        <div className=" px-6 md:mx-auto md:max-w-[1300px]">
          <h3 className="py-5 text-start">Please login if registered</h3>
          <div className="w-full">
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full">
                <label>Email</label>
                <input
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2"
                  placeholder="email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-start text-sm text-red-600">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <label>password</label>
                <div className="flex">
                  <input
                    className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2"
                    placeholder="password"
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  <span
                    onClick={handleVisiblePassword}
                    className="inline-flex  cursor-pointer items-center rounded-r-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 "
                  >
                    {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-start text-sm text-red-600 ">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-end text-[#B0B0B0]">
                <Link to="/auth/forgot">
                  <h4>Forgot Password ?</h4>
                </Link>
              </div>
              <button
                type="submit"
                className="min-w-[150px] rounded-md bg-primary-dark py-2 text-white"
              >
                {" "}
                Login
              </button>
              <div className="my-5 text-center ">
                <div>
                  <div className="mx-auto max-w-sm px-6 sm:px-0 ">
                    <button
                      onClick={handleGoogleSignIn}
                      type="button"
                      className="dark:focus:ring-[#4285F4]/55 mb-2  mr-2 inline-flex w-full items-center justify-between rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
                    >
                      <AiFillGoogleCircle size={24} />
                      Login with Google<div></div>
                    </button>
                  </div>
                </div>
                <h4 className="mt-5">
                  <span>
                    Don't have an account? <br></br>
                  </span>
                  <Link to="/auth/register">
                    <span className="font-semibold text-[#0566B1]">
                      Register here{" "}
                    </span>
                  </Link>
                </h4>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
