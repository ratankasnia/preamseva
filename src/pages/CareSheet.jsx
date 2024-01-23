import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LoadingSVG from "../components/LoadingSvg";
import { poster } from "./../api/poster";
import { IMAGE_API_ROUTE } from "../api/constant";
import { getToken, isLogedInUser } from "../utility/utility";
import Login from "./Auth/Login";

function CareSheet() {
  const [categoryData, setCategoryData] = useState(null);
  const navigate = useNavigate();
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await poster(
          {
            url: "/api/user/getCategories",
            method: "GET",
            // authToken: currentUser?.token,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          },
        );
        setCategoryData(response.categories);
      } catch (error) {
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchData();
  }, []);

  // let categoryData = [
  //   {
  //     name: "Health",
  //     icon: "/images/categories/health.svg",
  //     id: "healthcare",
  //     categoryId: "11",
  //   },
  //   {
  //     name: "Equipment",
  //     icon: "/images/categories/equ.svg",
  //     id: "equipment",
  //     categoryId: "12",
  //   },
  //   {
  //     name: "Environment",
  //     icon: "/images/categories/env.svg",
  //     id: "environment",
  //     categoryId: "13",
  //   },
  //   {
  //     name: "Social needs",
  //     icon: "/images/categories/social.svg",
  //     vicon: "",
  //     id: "social needs",
  //     categoryId: "14",
  //   },
  //   {
  //     name: "Miscellaneous",
  //     icon: "/images/categories/miscellaneous.svg",
  //     vicon: "",
  //     id: "miscellaneous",
  //     categoryId: "16",
  //   },
  // ];
  return (
    <div>
      <div className="p-6">
        <h3 className="py-3 text-left font-bold">Care sheet categories</h3>

        {!categoryLoading ? (
          <div className="">
            {categoryData?.map((category, key) => (
              <Link to={"/sheets/" + category?._id} key={key}>
                <div className="py-2">
                  <div className="flex rounded-md bg-white drop-shadow-xl">
                    <div className="w-[100px]">
                      <img
                        className="w-full rounded-bl-md rounded-tl-md"
                        src={IMAGE_API_ROUTE + category.image}
                        alt={key}
                      />
                    </div>
                    <div className="flex w-full items-center justify-between px-4 font-medium text-[#353535] ">
                      <span>{category.category}</span>
                      <span>
                        <MdKeyboardArrowRight size={24} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <LoadingSVG />
        )}
      </div>
    </div>
  );
}

export default CareSheet;
