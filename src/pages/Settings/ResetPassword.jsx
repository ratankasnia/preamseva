import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContextProvider";
function ResetPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { handleResetPassword } = useContext(AuthContext);
  const { currentUser } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      password: "",
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .required("Old Password is required")
        .min(4, "New Password must be at least 8 characters long"),
      newPassword: Yup.string()
        .required("New Password is required")
        .min(4, "Password must be at least 8 characters long"),
    }),

    onSubmit: async (values) => {
      if (values.newPassword === values.password) {
        alert("New password is not be same as old password");
      } else {
        await handleResetPassword({
          oldPassword: values.password,
          password: values.newPassword,
          email: currentUser?.email,
        });
      }
    },
  });
  return (
    <div>
      <div>
        <div className="px-6">
          <h3 className="py-5 text-start ">Reset Password </h3>
          <div className="w-full ">
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full">
                <div className="flex">
                  <input
                    className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2"
                    placeholder="Old password"
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
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

              <div className="w-full">
                <div className="flex">
                  <input
                    className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2"
                    placeholder="New Password"
                    type={isPasswordVisible ? "text" : "password"}
                    name="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="inline-flex  cursor-pointer items-center rounded-r-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 "
                  >
                    {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                </div>
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="text-start text-sm text-red-600 ">
                    {formik.errors.newPassword}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="min-w-[150px]  rounded-md bg-primary-dark py-2 text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
