import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEdit, AiOutlineInfoCircle } from "react-icons/ai";
import useRestAPI from "../../api";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
function CareGiver() {
  tippy("#giverinfo", {
    content: "Caregiver is the person who will take care of the Care receiver",
  });
  const { getCareGiver, addCareGiver } = useRestAPI();
  const [FormVisable, setFormVisable] = useState(false);
  const [careProfile, setCareProfile] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const disableBackButton =
    location.state && location.state.from === "register";
  const goBack = () => {
    if (disableBackButton) {
      return;
    }

    navigate(-1);
  };
  useEffect(() => {
    return () => {
      getData();
    };
  }, []);

  const getData = () => {
    getCareGiver({ setFormVisable, setCareProfile });
  };

  return (
    <div>
      <div className="pt-3  md:mx-auto md:max-w-[1300px] ">
        <div
          className="cursor-pointer px-3 pt-2 font-bold "
          onClick={() => goBack()}
        >
          &lt;-Back{" "}
        </div>
      </div>
      {FormVisable ? (
        <CareGiverForm
          careProfile={careProfile}
          getData={getData}
          addCareGiver={addCareGiver}
          setFormVisable={setFormVisable}
          setCareProfile={setCareProfile}
        />
      ) : (
        <div>
          <div className="px-6 md:mx-auto md:max-w-[1300px]">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2  py-5  text-start">
                <span>Caregiver’s profile</span>{" "}
                <span id="giverinfo">
                  <AiOutlineInfoCircle />
                </span>
              </h3>
              <AiOutlineEdit
                className="cursor-pointer"
                onClick={() => setFormVisable(true)}
              />
            </div>
            <div className="my-5 flex w-full justify-start gap-10 text-start  leading-loose">
              <div className="text-[#616161] ">
                <div>Name</div>
                <div>Age</div>
                <div>Gender</div>
                <div>Relationship</div>
              </div>
              <div className="border"> </div>

              <div className="font-semibold text-[#454545] ">
                <div>{careProfile?.cg_name}</div>
                <div>{careProfile?.cg_age}</div>
                <div>
                  {careProfile?.cg_gender?.charAt(0).toUpperCase() +
                    careProfile?.cg_gender?.slice(1)}
                </div>
                <div>
                  {careProfile?.cg_relationship?.charAt(0).toUpperCase() +
                    careProfile?.cg_relationship?.slice(1)}
                </div>
              </div>
            </div>
            <Link to="/plans" className="flex justify-center ">
              <button className="my-10 min-w-[150px]   rounded-md bg-[#0566B1] py-2 font-semibold text-white">
                Next
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function CareGiverForm({
  careProfile,
  getData,
  addCareGiver,
  setFormVisable,
  setCareProfile,
}) {
  const formik = useFormik({
    initialValues: {
      name: careProfile?.cg_name,
      age: careProfile?.cg_age,
      gender: careProfile?.cg_gender,
      relationship: careProfile?.cg_relationship,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name  is required"),
      age: Yup.number()
        .min("18", "Age should be greater than 18 ")
        .max("150", "Age should be less than 150. ")
        .required("Age is required"),
      gender: Yup.string().required("Gender is required"),
      relationship: Yup.string().required("Relationship is required"),
    }),
    onSubmit: (values) => {
      addCareGiver({ setFormVisable, setCareProfile, values, getData });
    },
  });
  return (
    <div>
      <div>
        <div className="px-6 md:mx-auto md:max-w-[1300px]">
          <h3 className="flex items-center gap-2  py-5  text-start">
            <span>Caregiver’s profile</span>
            <span
              id="giverinfo"
              onMouseOver={() => {
                tippy("#giverinfo", {
                  content:
                    "Caregiver is the person who will take care of the Care receiver",
                });
              }}
            >
              <AiOutlineInfoCircle />
            </span>
          </h3>
          <div className="w-full ">
            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="w-full">
                {" "}
                <input
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2"
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-start text-sm text-red-600 ">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>{" "}
              <div className="w-full">
                {" "}
                <input
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2"
                  placeholder="Age"
                  type="number"
                  name="age"
                  value={formik.values.age?.toString()}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.age && formik.errors.age ? (
                  <div className="text-start text-sm text-red-600 ">
                    {formik.errors.age}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                {" "}
                <select
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2"
                  placeholder=""
                  defaultValue={careProfile?.cg_gender}
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Gender </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="text-start text-sm text-red-600 ">
                    {formik.errors.gender}
                  </div>
                ) : null}
              </div>
              <div className="w-full">
                {" "}
                <select
                  className="placeholder:text-primary-green border-primary-green w-full rounded-md border px-3 py-2"
                  placeholder="Relationship"
                  name="relationship"
                  defaultValue={careProfile?.cg_relationship}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Relationship </option>
                  <option value="family">Family</option>
                  <option value="friend">Friend</option>
                  <option value="professional">Professional</option>
                  <option value="other">Other</option>
                </select>
                {formik.touched.relationship && formik.errors.relationship ? (
                  <div className="text-start text-sm text-red-600 ">
                    {formik.errors.relationship}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="my-10 min-w-[150px]   rounded-md bg-[#0566B1] py-2 font-semibold text-white"
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
export default CareGiver;
