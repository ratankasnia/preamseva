import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useRestAPI from "../../api";

function Forgot() {
  const { verifyPassword, sendForgetApi } = useRestAPI();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isOtp, setIsOTP] = useState(false);
  useFormik(() => {
    setIsOTP(false);
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(4, "Password must be at least 8 characters long"),
      // otp: Yup.number()
      //   .positive()
      //   .required('OTP is required')
      //   .min(6)
      //   .max(6, 'OTP must be at least 6 characters long'),
    }),
    onSubmit: (values) => {
      let data = verifyPassword(values);
      if (data.status) {
        setIsOTP(false);
      }
    },
  });
  return (
    <div>
      <div>
        <div className="px-6 md:mx-auto md:max-w-[1300px]">
          <h3 className="py-5 text-start ">Forgot Password </h3>
          <div className="w-full ">
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
                  disabled={isOtp}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-start text-sm text-red-600 ">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>{" "}
              <>
                {isOtp && (
                  <>
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
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                          className="inline-flex  cursor-pointer items-center rounded-r-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 "
                        >
                          {isPasswordVisible ? (
                            <AiFillEye />
                          ) : (
                            <AiFillEyeInvisible />
                          )}
                        </span>
                      </div>
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-start text-sm text-red-600 ">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>{" "}
                    <div className="w-full">
                      <label>OTP</label>
                      <input
                        className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2"
                        placeholder="OTP"
                        type="number"
                        name="otp"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.otp && formik.errors.otp ? (
                        <div className="text-start text-sm text-red-600 ">
                          {formik.errors.otp}
                        </div>
                      ) : null}
                    </div>
                  </>
                )}
              </>
              {isOtp && (
                <span
                  className="cursor-pointer text-end text-sm text-gray-500"
                  onClick={() => {
                    sendForgetApi(formik.values.email);
                  }}
                >
                  Resend OTP <br></br>
                </span>
              )}
              {isOtp ? (
                <button
                  type="submit"
                  className="min-w-[150px]  rounded-md bg-primary-dark py-2 text-white"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={async () => {
                    let status = await sendForgetApi(formik.values.email);

                    setIsOTP(status);
                  }}
                  className="min-w-[150px]  rounded-md bg-primary-dark py-2 text-white"
                >
                  Get OTP
                </button>
              )}
              <div className="my-5 text-center ">
                <h4>
                  <span>
                    Don you have an account? <br></br>
                  </span>
                  <Link to="/auth/login">
                    <span className="font-semibold text-[#0566B1]">
                      Login here
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

export default Forgot;
