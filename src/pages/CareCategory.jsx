import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import LoadingSVG from "../components/LoadingSvg";
import { poster } from "../api/poster";
import { IMAGE_API_ROUTE } from "../api/constant";

// let categoryData = [
//   {
//     name: "Fluid And Hydration",
//     icon: "/images/2023-9-6_18-4-0_951.png",
//     chapterName: "Healthcare",
//     categoryID: 5,
//   },
//   {
//     name: "Eye Care",
//     icon: "/images/2023-8-29_11-59-0_384.png",
//     chapterName: "Healthcare",
//     categoryID: 6,
//   },
//   {
//     name: "Hand Hygiene",
//     icon: "/images/2023-9-6_18-4-0_75.png",
//     chapterName: "Healthcare",
//     categoryID: 7,
//   },
// ];

function CareCategory() {
  const params = useParams();
  const [articles, setArticles] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [params.Category]);

  const getData = async () => {
    try {
      setCategoryLoading(true);

      const data = await poster({
        url: "/api/user/getArticles",
        method: "POST",
        bodyData: {
          cId: params.Category,
        },
      });
      setArticles(data?.articles);
    } catch (error) {
    } finally {
      setCategoryLoading(false);
    }
  };

  if (!articles || categoryLoading) {
    return <LoadingSVG />;
  }

  return (
    <div>
      <div className="bg-[#F1ECFF]">
        <div className="p-6">
          <h3 className="py-3 text-left font-bold">Care Sheets</h3>
          {categoryLoading ? (
            <LoadingSVG />
          ) : (
            <div>
              {articles?.map((article, key) => (
                <Link to={`/sheets/healthcare/${article._id}`} key={key}>
                  <div className="py-2">
                    <div className="flex h-[100px] rounded-md bg-white drop-shadow-xl">
                      <div className="h-full">
                        <img
                          className="h-full w-full rounded-bl-md rounded-tl-md  object-contain p-4 md:w-full"
                          src={`${IMAGE_API_ROUTE + article?.cover_image}`}
                          alt={key}
                        />
                      </div>
                      <div className="flex w-full items-center justify-between px-4 font-medium text-[#353535] ">
                        <div className="flex w-full items-center justify-between text-[#353535] md:px-4 ">
                          <div className="text-left text-[#353535]">
                            <h3 className="clamp-1  font-medium">
                              {article.chapter_name}
                            </h3>
                            {/* <h4 className="text-xs md:text-sm py-1 text-sm ">
                          Published date: <br className="md:hidden"></br>
                          {category.published_date}
                        </h4> */}
                            <h2 className="font-500 text-sm text-[#B19DE5] ">
                              {article.cid.category}
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
              {!articles?.length ? (
                <div>There is not article added in this category</div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <Categories />
    </div>
  );
}

const Categories = () => {
  const params = useParams();
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
        // Handle error
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchData();
  }, [categoryLoading]);

  return (
    <>
      <div className="p-6">
        <h3 className="py-3 text-left font-bold">Other categories</h3>
        <div className="flex w-full justify-between  ">
          <Swiper
            spaceBetween={50}
            slidesPerView={4}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {categoryData?.map((category, key) => (
              <>
                {" "}
                {params.Category != category._id && (
                  <SwiperSlide key={category._id}>
                    {" "}
                    <Link
                      to={"/sheets/" + category._id}
                      key={key}
                      className="flex flex-col items-center justify-center "
                    >
                      <div>
                        <img
                          className="w-[50px] rounded-full "
                          src={IMAGE_API_ROUTE + category.image}
                          alt={category.category}
                        />
                      </div>
                      <div className="mt-2 text-sm ">{category?.category}</div>
                    </Link>
                  </SwiperSlide>
                )}
              </>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
export default CareCategory;

// let otherCategory = [
//   {
//     name: "Health",
//     // icon: process.env.PUBLIC_URL + "/images/categories/health.svg",
//     icon: "/images/categories/health.svg",
//     id: "healthcare",
//     categoryId: "6585385db0fb16ccad823d85",
//   },
//   {
//     name: "Equipment",
//     // icon: process.env.PUBLIC_URL + "/images/categories/equ.svg",
//     icon: "/images/categories/equ.svg",
//     id: "equipment",
//     categoryId: "65853977b0fb16ccad823d88",
//   },
//   {
//     name: "Environment",
//     // icon: process.env.PUBLIC_URL + "/images/categories/env.svg",
//     icon: "/images/categories/env.svg",
//     id: "environment",
//     categoryId: 13,
//   },
//   {
//     name: "Social",
//     // icon: process.env.PUBLIC_URL + "/images/categories/social.svg",
//     icon: "/images/categories/social.svg",
//     vicon: "",
//     id: "social needs",
//     categoryId: 14,
//   },
//   {
//     name: "Miscellaneous",
//     // icon: process.env.PUBLIC_URL + "/images/categories/miscellaneous.svg",
//     icon: "/images/categories/health.svg",
//     vicon: "",
//     id: "miscellaneous",
//     categoryId: 16,
//   },
// ];
