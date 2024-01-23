import axios from "axios";
import { AuthContext } from "./context/AuthContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTE } from "./api/constant";
import { getToken } from "../src/utility/utility";

function useRestAPI() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const getCareGiver = ({ setFormVisable, setCareProfile }) => {
    axios
      .post(
        API_ROUTE + "/api/user/getCareGiver",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      )
      .then((res) => {
        if (res.data.status) {
          setFormVisable(false);
          setCareProfile(res.data.data);
        } else {
          setFormVisable(true);
        }
      }) 
      .catch((err) => {
        console.log(err);
      });
  };
  const addCareGiver = ({
    setFormVisable,
    setCareProfile,
    values,
    getData,
  }) => {
    axios
      .post(
        API_ROUTE + "/api/user/addCareGiver",
        {
          cg_name: values.name,
          cg_age: values.age,
          cg_gender: values.gender,
          cg_relationship: values.relationship,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      )
      .then(async (res) => {
        if (res.data.status) {
          setFormVisable(false);
          setCareProfile(res.data);
          getData();
          let isCareReceiver = await axios.post(
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
          );
          if (!isCareReceiver?.data?.status) {
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
  };
  const getCareReceiver = async ({ setFormVisable, setCareProfile }) => {
    return axios
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
          setFormVisable(false);
          setCareProfile(res.data);
        } else {
          setFormVisable(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCategories = (categoryId) => {
    return axios
      .post(API_ROUTE + "/api/user/getArticles", {
        categoryId: categoryId,
      })
      .then((res) => {
        if (res.data.status) {
          return res.data;
        } else {
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getArticle = (articleId) => {
    return axios
      .post(API_ROUTE + "/api/user/getArticle", {
        articleId: articleId,
        userId: currentUser?.id,
      })
      .then((res) => {
        if (res.data.status) {
          return res.data;
        } else {
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getVideos = (categoryId) => {
    return axios
      .post(API_ROUTE + "/api/user/getVideos", {
        categoryId: categoryId,
        userId: currentUser?.id,
      })
      .then((res) => {
        if (res.data.status) {
          return res.data;
        } else {
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addVideoBookmark = (vid, cid) => {
    return axios
      .post(
        API_ROUTE + "/api/user/addVideoBookmark",
        {
          avid: vid,
          cid: cid,
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
          return res.data;
        } else {
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteVideoBookmark = (vid, cid) => {
    return axios
      .post(
        API_ROUTE + "/api/user/deleteVideoBookmark",
        {
          avid: vid,
          cid: cid,
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
          return res.data;
        } else {
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBookmarks = (categoryId) => {
    return axios
      .post(
        API_ROUTE + "/api/user/getBookmarks",
        {
          categoryId: categoryId,
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
          return res.data;
        } else {
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getVideoBookmarks = (categoryId) => {
    return axios
      .post(
        API_ROUTE + "/api/user/getVideoBookmarks",
        {
          // userId: currentUser?.id,
          categoryId: categoryId,
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
          return res.data;
        } else {
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBookmark = (articleId, categoryId, subCategoryId) => {
    return axios
      .post(
        API_ROUTE + "/api/user/deleteBookmark",
        {
          userId: currentUser?.id,
          aid: articleId,
          cid: categoryId,
          sid: subCategoryId,
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
          return res.data;
        } else {
          console.log(res.data.error);
          return res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addBookmark = (articleId, categoryId, subCategoryId) => {
    return axios
      .post(
        API_ROUTE + "/api/user/addBookmark",
        {
          userId: currentUser?.id,
          aid: articleId,
          cid: categoryId,
          sid: subCategoryId,
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
          return res.data;
        } else {
          console.log(res.data.error);
          return res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const carePlanQuestions = (value) => {
    return axios
      .post(
        API_ROUTE + "/api/user/carePlan",
        {
          id: currentUser?.id,
          ...value,
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
          return res.data;
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCarePlanQuestions = async () => {
    return axios
      .post(
        API_ROUTE + "/api/user/getCarePlan",
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
          return res.data.data;
        } else {
          console.log(res.data.error);
          return res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendForgetApi = async (email) => {
    return axios
      .post(`http://192.168.1.75:4000/v2/api/user/sendForgetApi`, {
        email: email,
      })
      .then((res) => {
        if (res.data.status) {
          alert("OTP sent successfully");
          return res.data;
        } else {
          alert(res.data.error);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };
  const verifyPassword = async (values) => {
    return axios
      .post(`http://192.168.1.75:4000/v2/api/user/updatePassword`, {
        email: values.email,
        password: values.password,
        otp: values.otp,
      })
      .then((res) => {
        if (res.data.status) {
          alert("Password updated successfully");
          navigate("/auth/login");
          return res.data;
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendPrintMail = () => {
    return axios
      .post(
        API_ROUTE + "/api/user/printCarePlan",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      )
      .then((res) => {
        if (res.data.status) {
          alert("Mail sent successfully");
          return res.data;
        } else {
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadImage = async (formData) => {
    return axios
      .post(API_ROUTE + "/api/user/imageUpload", formData)
      .then((res) => {
        if (res.data.status) {
          return res.data;
        } else {
          console.log(res.data.error);
          return res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const feedbackForm = (values) => {
    return axios
      .post(API_ROUTE + "/api/user/addFeedback", {
        ...values,
      })
      .then((res) => {
        if (res.data.status) {
          navigate("/");
          alert("Feedback submit successfully");
          return res.data;
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    getCareGiver,
    addCareGiver,
    getCareReceiver,
    getCategories,
    getArticle,
    getBookmarks,
    deleteBookmark,
    addBookmark,
    carePlanQuestions,
    getCarePlanQuestions,
    getVideos,
    deleteVideoBookmark,
    addVideoBookmark,
    getVideoBookmarks,
    verifyPassword,
    sendForgetApi,
    uploadImage,
    sendPrintMail,
    feedbackForm,
  };
}

export default useRestAPI;
