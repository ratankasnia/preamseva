import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineCloudUpload,
  AiOutlineEdit,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import useRestAPI from "../../api";
import { API_ROUTE, IMAGE_API_ROUTE } from "../../api/constant";
import axios from "axios";
import { AuthContext } from "../../context/AuthContextProvider";
import { BsArrowLeftShort } from "react-icons/bs";
import LoadingSVG from "../../components/LoadingSvg";
import tippy from "tippy.js";
import { getToken } from "../../utility/utility";

function CareReceiver() {
  const { getCareReceiver, uploadImage, getCarePlanQuestions } = useRestAPI();
  const { currentUser } = useContext(AuthContext);
  const [FormVisable, setFormVisable] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [careProfile, setCareProfile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    return async () => {
      getData();
    };
  }, []);

  const getData = async () => {
    setLoading(true);
    axios
      .post(
        API_ROUTE + "/api/user/getCareReceiver",
        {
          id: currentUser?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      )
      .then((res) => {
        if (res.data.status) {
          setCareProfile(res.data.data);
          setLoading(false);
        } else {
          setLoading(false);
          setFormVisable(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function CareReceiverForm(careProfile) {
    const { currentUser } = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [ImageUpload, setUploadImage] = useState(null);
    useEffect(() => {
      tippy("#giverec", {
        content:
          "Care receiver is the person who will receive care from the Caregiver",
      });
    }, []);

    const formik = useFormik({
      initialValues: {
        name: careProfile?.careProfile?.cr_name,
        displayName: careProfile?.careProfile?.cr_ProfileCreator,
        age: careProfile?.careProfile?.cr_age,
        gender: careProfile?.careProfile?.cr_gender,
        relationship: "friend",
        //form
        allergies: careProfile?.careProfile?.cr_allergies,
        favouriteFood: careProfile?.careProfile?.cr_favFood,
        tvProgram: careProfile?.careProfile?.cr_favTV,
        hobbies: careProfile?.careProfile?.cr_hobbies,
        aids: careProfile?.careProfile?.cr_hearing ? true : false,
        spectacles: careProfile?.careProfile?.cr_spectacles ? true : false,
        diagnoses: careProfile?.careProfile?.cr_diagnoses,
      },
      validationSchema: Yup.object({
        age: Yup.number()
          .min("18", "Age should be greater than 18 ")
          .max("150", "Age should be less than 150. ")
          .required("Age is required"),
      }),
      onSubmit: async (values) => {
        const formData = new FormData();
        formData.append("file", selectedImage);
        var path = "";
        if (selectedImage != null) {
          path = await uploadImage(formData);
        }

        console.log(values, path);
        // if (!careProfile?.careProfile?.image && !path.url) {
        //   alert('Please upload Image ')
        // } else
        axios
          .post(
            API_ROUTE + "/api/user/addCareReceiver",
            {
              id: currentUser?.id,
              cr_name: values.name.trim(),
              cr_nicname: values.displayName.trim(),
              cr_age: values.age,
              cr_gender: values.gender,
              cr_allergies: values.allergies,
              cr_favFood: values.favouriteFood,
              cr_favTV: values.tvProgram,
              cr_hobbies: values.hobbies,
              cr_hearing: values.aids ? values.aids : false,
              cr_spectacles: values.spectacles ? values.spectacles : false,
              cr_diagnoses: values.diagnoses,
              cr_ProfileDate: "03/07/1963",
              cr_ProfileCreator: values.displayName,
              cr_relationship: "friend",
              image: selectedImage,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${getToken()}`,
              },
            },
          )
          .then(async (res) => {
            if (res.data.status) {
              setFormVisable(false);
              setCareProfile(res.data);
              getData();
              let isQuestion = await getCarePlanQuestions();
              if (isQuestion?.status === false) {
                navigate("/profile/receiver");
              }
            } else {
              alert(res.data.error);
              setFormVisable(true);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

    return (
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div
              className={`bg-[url(${"/images/rec-bg.png"})] flex justify-center py-5 `}
            >
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="flex h-[150px] w-[150px]  cursor-pointer
                  justify-center  rounded-full bg-white "
                >
                  {!ImageUpload ? (
                    <div className="flex flex-col items-center justify-center  ">
                      <AiOutlineCloudUpload size={24} />
                      <span className="font-bold">Click To Upload </span>
                    </div>
                  ) : (
                    <img
                      src={ImageUpload}
                      className="h-full w-full rounded-full bg-black object-cover  "
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src =
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                      }}
                    />
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      console.log(
                        event.target.files[0],
                        "photo check kmkfewfjoiwrj",
                      );
                      setSelectedImage(event.target.files[0]);
                      setUploadImage(
                        URL.createObjectURL(event.target.files[0]),
                      );
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="mx-auto max-w-md  py-5">
              <div>
                <h3 className="flex items-center justify-center  gap-2   px-6  py-5  text-start font-semibold ">
                  <span>Care Receiver's profile</span>{" "}
                  <span id="giverec">
                    <AiOutlineInfoCircle />
                  </span>
                </h3>
                <div className="font-semibold">
                  <input
                    className=" border-primary-green w-full  rounded-md  border-b-2 px-3 py-2 text-center outline-none"
                    placeholder="Name"
                    type="text"
                    name="name"
                    required
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <input
                    className=" border-primary-green  w-full  rounded-md  border-b-2 px-3 py-2 text-center outline-none"
                    placeholder="Display Name "
                    type="text"
                    name="displayName"
                    required
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <input
                    className="placeholder:text-primary-green border-primary-green w-full  rounded-md  border-b-2 px-3 py-2 text-center outline-none"
                    placeholder="Age "
                    type="number"
                    name="age"
                    required
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.age && formik.errors.age ? (
                    <div className="text-start text-sm text-red-600 ">
                      {formik.errors.age}
                    </div>
                  ) : null}
                  <select
                    className=" border-primary-green w-full rounded-md border px-3 py-2 text-center outline-none"
                    placeholder=""
                    name="gender"
                    required
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Gender </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6">
            <div className=" mx-auto max-w-md bg-white py-5  drop-shadow-xl ">
              <div className="grid w-full border-separate border-spacing-x-2 grid-cols-2 gap-2  text-start text-sm">
                <>
                  <div className=" border-r-2 py-3">Allergies</div>
                  <div className=" py-3 ">
                    <div>
                      {" "}
                      <input
                        className=" border-b-2 outline-none  "
                        type="text"
                        name="allergies"
                        required
                        value={formik.values.allergies}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </>
                <>
                  <div className="flex-1 border-r-2 py-3">Favourite food</div>
                  <div className="flex-1 py-3 ">
                    {" "}
                    <div>
                      {" "}
                      <input
                        className=" border-b-2 outline-none  "
                        type="text"
                        name="favouriteFood"
                        required
                        value={formik.values.favouriteFood}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </>
                <>
                  <div className=" border-r-2 py-3">
                    Favourite <br></br>TV programme
                  </div>
                  <div className=" py-3 ">
                    <div>
                      {" "}
                      <input
                        className=" border-b-2 outline-none  "
                        type="text"
                        name="tvProgram"
                        required
                        value={formik.values.tvProgram}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </>

                <>
                  <div className=" border-r-2 py-3">Hobbies</div>
                  <div className=" py-3 ">
                    <div>
                      {" "}
                      <input
                        className=" border-b-2 outline-none  "
                        type="text"
                        name="hobbies"
                        required
                        value={formik.values.hobbies}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </>

                <>
                  <td className="flex-1 border-r-2 py-3">Hearing aids</td>
                  <td className="flex-1 py-3 ">
                    <div className=" items-center">
                      <input
                        className="flex-1 border-b-2  outline-none"
                        type="checkbox"
                        name="aids"
                        value={formik.values.aids}
                        checked={formik.values.aids}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <span className="px-2">Yes</span>
                      <input
                        className="flex-1 border-b-2  outline-none"
                        type="checkbox"
                        name="aids"
                        value={formik.values.aids}
                        checked={!formik.values.aids}
                        onChange={() => {
                          // handleChange
                          formik.setFieldValue("aids", false);
                        }}
                        onBlur={formik.handleBlur}
                      />
                      {/* <input
                        className="outline-none border-b-2  flex-1"
                        type="checkbox"
                        name="aids"
                        value={!formik.values.aids}
                        checked={!formik.values.aids}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      /> */}
                      <span>No</span>
                    </div>
                  </td>
                </>

                <>
                  <div className="flex-1 border-r-2 py-3">Spectacles</div>
                  <div className="flex-1 py-3 ">
                    {" "}
                    <div>
                      {/* {' '}
                      <input
                        className="outline-none border-b-2  "
                        type="checkbox"
                        name="spectacles"
                        value={formik.values.spectacles}
                        checked={formik.values.spectacles}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />{' '}
                      Yes/No */}
                      <td className="flex-1 py-3 ">
                        <div className=" items-center">
                          <input
                            className="flex-1 border-b-2  outline-none"
                            type="checkbox"
                            name="spectacles"
                            value={formik.values.spectacles}
                            checked={formik.values.spectacles}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <span className="px-2">Yes</span>
                          <input
                            className="flex-1 border-b-2  outline-none"
                            type="checkbox"
                            name="spectacles"
                            value={formik.values.spectacles}
                            checked={!formik.values.spectacles}
                            onChange={() => {
                              // handleChange
                              formik.setFieldValue("spectacles", false);
                            }}
                            onBlur={formik.handleBlur}
                          />

                          <span>No</span>
                        </div>
                      </td>
                    </div>
                  </div>
                </>
                <>
                  <div className="flex-1 border-r-2 py-3">Diagnoses</div>
                  <div className="flex-1 py-3 ">
                    {" "}
                    <div>
                      {" "}
                      <textarea
                        className="border-b-2 outline-none  "
                        name="diagnoses"
                        required
                        value={formik.values.diagnoses}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />{" "}
                    </div>
                  </div>
                </>
                {/* <>
                  <div className="flex-1 py-3 border-r-2">Relationship</div>
                  <div className="flex-1 py-3 ">
                    <div>
                      <select
                        className="outline-none border-b-2 bg-transparent  "
                        placeholder="Relationship"
                        name="relationship"
                        required
                        value={formik.values.relationship}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Select Relationship </option>
                        <option value="family">Family</option>
                        <option value="friend">Friend</option>
                        <option value="professional">Professional</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </> */}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="my-5  w-full max-w-[150px] rounded-md bg-primary-dark py-2 font-semibold  text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
  useEffect(() => {}, []);
  if (isLoading) {
    return <LoadingSVG />;
  }

  return (
    <>
      {FormVisable ? (
        <CareReceiverForm careProfile={careProfile} />
      ) : (
        <div>
          <div>
            <div
              className={`bg-[url(${"/images/rec-bg.png"})] relative flex justify-center py-5  `}
            >
              <div className="absolute left-0">
                <span
                  className={`flex cursor-pointer items-center font-bold text-[#0566B1]`}
                  onClick={() => navigate("/")}
                >
                  <BsArrowLeftShort size={30} /> &nbsp; Back{" "}
                </span>
              </div>
              <div
                className="flex h-[150px] w-[150px]
          flex-col  items-center justify-center rounded-full bg-white p-1 "
              >
                <img
                  src={IMAGE_API_ROUTE + "/" + careProfile?.image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                  }}
                  className="h-full w-full rounded-full bg-black object-cover  "
                  alt=""
                />
              </div>
            </div>
            {/* //Profile */}

            <div>
              <div className="mx-auto flex max-w-md items-center   justify-between">
                <h3 className="flex items-center gap-2  py-5  text-start ">
                  <span>Care Receiver's profile</span>{" "}
                  <span
                    id="givenreciver"
                    onMouseOver={() => {
                      tippy("#givenreciver", {
                        content:
                          "Care receiver is the person who will receive care from the Caregiver",
                      });
                    }}
                  >
                    <AiOutlineInfoCircle />
                  </span>
                </h3>
                <AiOutlineEdit
                  className="cursor-pointer"
                  onClick={() => setFormVisable(true)}
                />
              </div>

              <div>
                <h2 className="  text-center text-2xl font-semibold  ">
                  {careProfile?.cr_name?.trim()} (
                  {careProfile?.cr_ProfileCreator?.trim()})
                </h2>
                <h5 className="flex justify-center gap-5 font-semibold text-[#616161] ">
                  <span>{careProfile?.cr_age} Years old </span>
                  <span className="capitalize">{careProfile?.cr_gender} </span>
                </h5>
              </div>
              <div className="px-6">
                <div className=" mx-auto max-w-md bg-white py-5  drop-shadow-xl ">
                  {" "}
                  <div className="my-5 flex w-full justify-between  px-10 text-start  leading-loose">
                    <div className="w-[600px] text-[#616161]">
                      <div>Allergies</div>
                      <div>Favourite food </div>
                      <div>Favourite TV programme </div>
                      <div>Hobbies</div>
                      <div>Hearing aids</div>
                      <div>Spectacles </div>
                      <div>Diagnoses</div>

                      {/* <div>Relationship</div> */}
                    </div>
                    <div className="ml-10 mr-5 border"> </div>

                    <div className="w-full font-semibold text-[#454545] ">
                      <div>{careProfile?.cr_allergies}</div>
                      <div>{careProfile?.cr_favFood}</div>
                      <div className="">{careProfile?.cr_favTV}</div>
                      <div>{careProfile?.cr_hobbies}</div>
                      <div>{careProfile?.cr_hearing ? "Yes" : "No"}</div>
                      <div>{careProfile?.cr_spectacles ? "Yes" : "No"}</div>
                      <div>{careProfile?.cr_diagnoses}</div>
                      {/* <div>{careProfile?.cr_relationship}</div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Link to="/plans">
                  <button className="my-10 min-w-[150px]   rounded-md bg-[#0566B1] py-2 font-semibold text-white">
                    Go to Care Plan
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CareReceiver;
