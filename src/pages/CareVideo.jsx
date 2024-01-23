import React, { useEffect, useState } from "react";
import { BsPlayCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import LoadingSVG from "../components/LoadingSvg";
import { poster } from "../api/poster";
import { IMAGE_API_ROUTE } from "../api/constant";

function CareVideo() {
  const [categoryData, setCategoryData] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await poster({
          url: "/api/user/getCategories",
          method: "GET",
          // authToken: currentUser?.token,
        });
        setCategoryData(response.categories);
      } catch (error) {
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchData();
  }, []);
  // let category = [
  //   {
  //     name: "Healthcare",
  //     icon: "/images/categories/health.svg",
  //     id: "healthcare",
  //     categoryId: "11",
  //     color: "blue",
  //   },
  //   {
  //     name: "Equipment",
  //     icon: "/images/categories/equ.svg",
  //     id: "equipment",
  //     categoryId: "12",
  //     color: "red",
  //   },
  //   {
  //     name: "Environment",
  //     icon: "/images/categories/env.svg",
  //     id: "environment",
  //     categoryId: "13",
  //     color: "green",
  //   },
  //   {
  //     name: "Social needs",
  //     icon: "/images/categories/social.svg",
  //     vicon: "",
  //     id: "social needs",
  //     categoryId: "14",
  //     color: "yellow",
  //   },
  //   {
  //     name: "Miscellaneous",
  //     icon: "/images/categories/miscellaneous.svg",
  //     vicon: "",
  //     id: "miscellaneous",
  //     categoryId: "16",
  //     color: "brown",
  //   },
  // ];

  return (
    <div>
      <div className="p-6">
        <h3 className=" py-3 text-left font-bold">Care Video categories</h3>
        <div>
          {!categoryLoading ? (
            <div className="">
              {categoryData?.map((category, key) => (
                <Link to={"/videos/" + category?._id} key={key}>
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
                          <BsPlayCircle size={34} color={category?.hexcode} />
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
    </div>
  );
}

export default CareVideo;
