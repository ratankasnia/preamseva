import React, { createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";
import { API_ROUTE } from "../api/constant";
import { getToken } from "../../src/utility/utility";

export const AuthContext = createContext();
function AuthContextProvider({ _currentUser, children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setCurrentUser(JSON.parse(token));
      } catch (error) {
        // Handle the error, e.g., clear the token from localStorage
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogin = (user) => {
    axios
      .post(API_ROUTE + `/api/user/signIn`, {
        ...user,
      })
      .then((res) => {
        if (res.data.status) {
          localStorage.removeItem("jwt");
          localStorage.removeItem("user");
          let token = res.data.token;

          setCurrentUser(res.data[0]);
          localStorage.setItem("jwt", token);
          localStorage.setItem("user", res.data.data);
          navigate("/");
        } else {
          setCurrentUser(null);
          localStorage.setItem("token", null);
          navigate("/auth/login");
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setCurrentUser(user);
    localStorage.setItem("token", JSON.stringify(user));
  };

  const handleRegister = (values) => {
    axios
      .post(`http://192.168.1.75:4000/v2/api/user/signUp`, {
        ...values,
      })
      .then((res) => {
        if (res.data.status) {
          let token = res.data.token;
          setCurrentUser(res.data[0]);
          localStorage.setItem("jwt", token);
          localStorage.setItem("user", res.data.data);
          navigate("/profile/giver", { state: { from: "register" } });

          // alert("You have successfully Register!");
        } else {
          setCurrentUser(null);
          localStorage.setItem("token", null);
          alert(res.data.error);
          navigate("/auth/register");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleGoogleSignIn(isLogin = true) {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider).then((result) => {
      console.log(result?.user?.providerData[0]?.uid);
      const uid = result.user;
      if (isLogin) {
        handleLogin({
          email: uid.email,
          // google_id: uid.uid,
          google_id: result?.user?.providerData[0]?.uid,
        });
      } else {
        handleRegister({
          email: uid.email,
          name: uid.displayName,
          google_id: result?.user?.providerData[0]?.uid,
          // google_id: uid.uid,
        });
      }
    });
    // } 
  }

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const handleResetPassword = (values) => {
    console.log(values);
    axios
      .post(
        `http://192.168.1.75:4000/v2/api/user/resetPassword`,
        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        if (!res.data.status) {
          alert(res.data.error);
        } else {
          setCurrentUser(null);
          localStorage.setItem("token", null);
          navigate("/auth/login");
          alert("Password reset successful");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const handleDeactivateAccount = () => {
    axios
      .post(
        API_ROUTE + "/api/user/deactivateAccount",
        {
          email: currentUser?.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        },
      )
      .then((res) => {
        setCurrentUser(null);
        localStorage.setItem("token", null);
        navigate("/auth/login");
        alert("Account Deactivate successful");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        currentUser,
        handleRegister,
        handleLogout,
        handleGoogleSignIn,
        setCurrentUser,
        handleResetPassword,
        handleDeactivateAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
