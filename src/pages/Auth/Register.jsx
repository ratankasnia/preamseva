import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillGoogleCircle,
} from "react-icons/ai";
import { useFormik } from "formik";
import { AuthContext } from "../../context/AuthContextProvider";

function Register() {
  const { handleRegister, handleGoogleSignIn } = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  const handleVisiblePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleVisiblePassword2 = () => {
    setIsPasswordVisible2(!isPasswordVisible2);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },

    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

      name: Yup.string().required("Name  is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      handleRegister(values);
    },
  });
  return (
    <div>
      <div>
        <div className="px-6 md:mx-auto md:max-w-[1300px]">
          <h3 className="py-5 text-start ">Create an account</h3>
          <div className="w-full ">
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              {/* //Email */}
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
              {/* //Phone  */}
              <div className="w-full">
                <label>Name </label>
                <input
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2"
                  placeholder="name"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-start text-sm text-red-600 ">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              {/* //Password  */}
              <div className="w-full">
                <label>Password</label>
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
              {/* //Conirm Password  */}
              <div className="w-full">
                <label>Confirm Password</label>
                <div className="flex">
                  <input
                    className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2"
                    placeholder="Confirm Password"
                    type={isPasswordVisible2 ? "text" : "password"}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                  />
                  <span
                    onClick={handleVisiblePassword2}
                    className="inline-flex  cursor-pointer items-center rounded-r-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 "
                  >
                    {isPasswordVisible2 ? (
                      <AiFillEye />
                    ) : (
                      <AiFillEyeInvisible />
                    )}
                  </span>
                </div>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-start text-sm text-red-600 ">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="min-w-[150px]  rounded-md bg-primary-dark py-2 text-white"
              >
                Create Account
              </button>
            </form>

            <div>
              <div class="mx-auto mt-5 max-w-sm px-6 sm:px-0">
                <button
                  type="button"
                  onClick={() => handleGoogleSignIn(false)}
                  className="dark:focus:ring-[#4285F4]/55 mb-2  mr-2 inline-flex w-full items-center justify-between rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
                >
                  <AiFillGoogleCircle size={24} />
                  Register with Google<div></div>
                </button>
              </div>
            </div>
            <div className="my-5 text-center ">
              <h4>
                <span>
                  Already have an account?<br></br>
                </span>
                <Link to="/auth/login">
                  <span className="font-semibold text-[#0566B1]">
                    Login here
                  </span>
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
