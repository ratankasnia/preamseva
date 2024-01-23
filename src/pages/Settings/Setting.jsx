import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
function Settings() {
  const { handleDeactivateAccount } = useContext(AuthContext);
  
  

  return (
    <div>
      <div className="p-6">
        <h3 className="py-3 text-left font-bold">Settings</h3>
        <div className="flex flex-col gap-3">
          <div className="w-full  rounded-md  bg-[#0566B1] p-3 text-white md:max-w-[300px]">
            <Link to="/settings/reset-password" className="">
              Change Password
            </Link>
          </div>
          <div
            className="w-full  rounded-md  bg-[#0566B1] p-3 text-white md:max-w-[300px]"
            onClick={() => handleDeactivateAccount()}
          >
            Delete Account
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
