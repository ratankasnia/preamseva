import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
// import axios from "axios";
import { API_ROUTE } from "../api/constant";

function FeedBackForm() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      role: "",
      hear: "",
      findUseful: "",
      suggestion: "",
      rate: "",
      isPublished: true,
    },

    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup.string().required("Email is required"),
      mobileNumber: yup.string().required("mobileNumber is required"),
      role: yup.string().required("Role is required"),
      findUseful: yup.string().required("Find useful is required"),
      suggestion: yup.string().required("Suggestion is required"),
      mobileNumber: yup
        .string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    }),
    onSubmit: async (values) => {
      try {
        // Map form values to the expected data format
        let data = {
          name: values.name,
          email: values.email,
          phone: values.mobileNumber,
          role: values.role,
          hear: values.hear,
          useful: values.findUseful,
          suggestion: values.suggestion,
          rating: values.rate,
          publish: values.isPublished,
        };
        let jsonData = JSON.stringify(data);
        console.log(data);

        // Make the API request
        const response = await fetch(API_ROUTE + "/api/user/addFeedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
          body: jsonData,
          redirect: "follow",
          // mode: "no-cors",
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          console.log("Feedback submitted successfully!");
        } else {
          // Handle errors
          console.error("Failed to submit feedback:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred while submitting feedback:", error);
      }
    },
  });
  return (
    <div>
      <div>
        <div className="px-6 md:mx-auto md:max-w-[1300px]">
          <h3 className="flex items-center gap-2 py-5 text-start">
            <span>Feedback form</span>
          </h3>
          <div className="w-full">
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full">
                <div className="text-left font-semibold">Name</div>
                <input
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2 focus:outline-none"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-start text-sm text-red-600">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <div className="text-left font-semibold">Email</div>
                <input
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2 focus:outline-none"
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.email ? (
                  <div className="text-start text-sm text-red-600">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <div className="text-left font-semibold">Mobile Number</div>
                <input
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2 focus:outline-none"
                  type="text"
                  name="mobileNumber"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.mobileNumber ? (
                  <div className="text-start text-sm text-red-600">
                    {formik.errors.mobileNumber}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <div className="text-left font-semibold">
                  What is your role ?
                </div>
                <input
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2 focus:outline-none"
                  type="text"
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.role ? (
                  <div className="text-start text-sm text-red-600">
                    {formik.errors.role}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <div className="text-left font-semibold">
                  How did you hear about us?
                </div>
                <input
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2 focus:outline-none"
                  type="text"
                  name="hear"
                  value={formik.values.hear}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.hear ? (
                  <div className="text-start text-sm text-red-600">
                    {formik.errors.hear}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <div className="text-left font-semibold">
                  What did you find most useful in the Prem Seva app?
                </div>
                <input
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2 focus:outline-none"
                  type="text"
                  name="findUseful"
                  value={formik.values.findUseful}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.findUseful ? (
                  <div className="text-start text-sm text-red-600">
                    {formik.errors.findUseful}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                <div className="text-left font-semibold">
                  What are your suggestions for improving the Prem Seva app?
                </div>
                <input
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2 focus:outline-none"
                  type="text"
                  name="suggestion"
                  value={formik.values.suggestion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.suggestion ? (
                  <div className="text-start text-sm text-red-600">
                    {formik.errors.suggestion}
                  </div>
                ) : null}
              </div>
              <button className=" w-full rounded-md bg-primary-dark py-2 text-white">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedBackForm;
