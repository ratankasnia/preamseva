// import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { poster } from "../../api/poster";
import { IMAGE_API_ROUTE } from "../../api/constant";

function CareBookVideos() {
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
        console.error("Error fetching data:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="p-6">
        <h3 className="py-3 text-left font-bold">Care Videos categories</h3>
        <div>
          {categoryData?.map((category, key) => (
            <Link to={"/bookmark/video/" + category._id} key={key}>
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
      </div>
    </div>
  );
}

export default CareBookVideos;
