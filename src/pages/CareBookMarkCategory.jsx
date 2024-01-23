import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdOutlineArrowBack } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRestAPI from "../api";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import LoadingSVG from "../components/LoadingSvg";
// import { useQuery } from "@tanstack/react-query";
import { poster } from "../api/poster";
import { IMAGE_API_ROUTE } from "../api/constant";
import { AuthContext } from "../context/AuthContextProvider";
import { getToken } from "../utility/utility";

function CareBookMarkCategory() {
  const { category: categoryId } = useParams();
  const navigate = useNavigate();
  const { getBookmarks } = useRestAPI();
  const { currentUser } = useContext(AuthContext);
  const [categoryData, setCategoryData] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [categoryId]);

  const getData = async () => {
    try {
      // Call the getBookmarks function
      const data = await getBookmarks(categoryId, getToken());
      setCategoryData(data);
      setCategoryLoading(false);
    } catch (error) {}
  };

  if (!categoryData) {
    return <LoadingSVG />;
  }

  let category = [
    {
      name: "Health Care",
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
            fill="#B19DE5"
          />
          <path
            d="M26.395 16.212C26.3877 15.2595 26.0061 14.3481 25.3325 13.6745C24.659 13.001 23.7475 12.6193 22.795 12.612H22.472V12.288C22.4645 11.6834 22.2209 11.1056 21.7932 10.6781C21.3655 10.2506 20.7877 10.0073 20.183 10C19.5785 10.0075 19.0009 10.251 18.5735 10.6785C18.146 11.1059 17.9025 11.6835 17.895 12.288V24.712C17.9025 25.3165 18.146 25.8941 18.5735 26.3215C19.0009 26.749 19.5785 26.9925 20.183 27C20.7355 26.9988 21.2694 26.8006 21.6888 26.4409C22.1082 26.0813 22.3856 25.5838 22.471 25.038C23.3697 24.9613 24.2061 24.5476 24.8124 23.8799C25.4187 23.2122 25.7501 22.3399 25.74 21.438C25.7392 20.5804 25.4405 19.7497 24.895 19.088C25.3621 18.7688 25.7433 18.3393 26.0049 17.8377C26.2665 17.3361 26.4005 16.7777 26.395 16.212V16.212Z"
            stroke="#FCFFFC"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.39494 16.212C9.40226 15.2595 9.7839 14.3481 10.4574 13.6745C11.131 13.001 12.0424 12.6193 12.9949 12.612H13.3219V12.288C13.3219 11.6811 13.563 11.099 13.9922 10.6698C14.4214 10.2406 15.0035 9.99951 15.6104 9.99951C16.2174 9.99951 16.7995 10.2406 17.2287 10.6698C17.6578 11.099 17.8989 11.6811 17.8989 12.288V24.712C17.8996 25.2941 17.6795 25.8547 17.2831 26.281C16.8867 26.7072 16.3434 26.9672 15.7628 27.0087C15.1823 27.0502 14.6075 26.87 14.1546 26.5045C13.7016 26.1389 13.404 25.6153 13.3219 25.039C12.4233 24.9623 11.5869 24.5486 10.9805 23.8809C10.3742 23.2132 10.0429 22.3409 10.0529 21.439C10.0527 20.5814 10.3503 19.7504 10.8949 19.088C10.4279 18.7688 10.0467 18.3393 9.78504 17.8377C9.52341 17.3361 9.38943 16.7777 9.39494 16.212V16.212Z"
            stroke="#FCFFFC"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.4719 18.4999C22.9024 18.4956 23.3294 18.5773 23.728 18.74C24.1265 18.9028 24.4886 19.1434 24.793 19.4479C25.0974 19.7523 25.338 20.1143 25.5008 20.5129C25.6636 20.9114 25.7452 21.3384 25.7409 21.7689"
            stroke="#FCFFFC"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.995 19.8119C12.0425 19.8046 11.1311 19.423 10.4575 18.7494C9.78398 18.0759 9.40234 17.1644 9.39502 16.2119"
            stroke="#FCFFFC"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.1029 14.0531C13.8601 13.8268 13.6655 13.5538 13.5306 13.2505C13.3957 12.9473 13.3234 12.6199 13.3179 12.2881"
            stroke="#FCFFFC"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      vicon: "",
    },
  ];
  return (
    <div>
      <div className="bg-[#F1ECFF]">
        <div className="p-6">
          {/* <h3 className="py-3 font-bold text-left">Care Sheets</h3> */}
          <div
            className="flex cursor-pointer items-center gap-5 px-3 pt-2 font-bold "
            onClick={() => navigate(-1)}
          >
            <MdOutlineArrowBack />
            <span>Back</span>
          </div>
          {categoryLoading ? (
            <LoadingSVG />
          ) : (
            <div>
              {categoryData?.bookmarks?.map((bookmark, key) => (
                <Link
                  to={`/sheets/${bookmark.cid.category.toLowerCase()}/${
                    bookmark.aid?._id
                  }`}
                  key={key}
                >
                  {console.log(bookmark, " bookmarksssss")}
                  <div className="py-2">
                    <div className="flex h-[100px] rounded-md bg-white drop-shadow-xl">
                      <div className="h-full">
                        <img
                          className="h-full w-20 rounded-bl-md rounded-tl-md p-5  md:w-full "
                          src={`${
                            IMAGE_API_ROUTE + bookmark?.aid?.cover_image
                          }`}
                          alt={key}
                        />
                      </div>
                      <div className="flex w-full items-center justify-between px-4 font-medium text-[#353535] ">
                        <div className="flex w-full items-center justify-between text-[#353535] md:px-4 ">
                          <div className="text-left text-[#353535]">
                            <h3 className="clamp-1  font-medium">
                              {bookmark?.aid?.chapter_name}
                            </h3>
                            {/* <h4 className="text-xs md:text-sm py-1 text-sm ">
                            Published date: <br className="md:hidden"></br>
                            {category.published_date}
                          </h4> */}
                            <h2 className="font-500 text-sm text-[#B19DE5] ">
                              {bookmark?.cid?.category}
                            </h2>
                          </div>

                          <span className="flex  text-sm md:text-base">
                            VIEW <MdKeyboardArrowRight size={24} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {!categoryData?.bookmarks?.length ? (
                <div>You don't have any bookmark </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CareBookMarkCategory;
