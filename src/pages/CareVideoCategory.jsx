import React, { useEffect, useState } from "react";
import LoadingSVG from "../components/LoadingSvg";
import { MdOutlineArrowBack } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { poster } from "../api/poster";
import { IMAGE_API_ROUTE } from "../api/constant";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import useRestAPI from "../api";

function CareVideoCategory() {
  const navigate = useNavigate();
  const params = useParams();
  const [articleVideos, setArticleVideos] = useState([]);
  const [Videos, setVideos] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [BMC, setBmc] = useState(false);

  useEffect(() => {
    getData();
  }, [params.category, BMC]);

  const getData = async () => {
    try {
      setCategoryLoading(true);

      const data = await poster({
        url: "/api/user/getVideos",
        method: "POST",
        bodyData: {
          cId: params.category,
        },
      });
      setArticleVideos(data?.articleVideos);
    } catch (error) {
    } finally {
      setCategoryLoading(false);
    }
  };

  const YoutubeVideo = ({ articleVideo }) => {
    const { deleteVideoBookmark, addVideoBookmark } = useRestAPI();

    return (
      <>
        <div>
          <div className="mx-6  py-5">
            <div className="w-full">
              <iframe
                width="100%"
                className="h-[17em] rounded-md md:h-[500px]"
                src={articleVideo.video}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className=" text  rounded-bl-md rounded-br-md bg-white py-2 text-left  text-sm text-[#04518D]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 px-5">
                  {/* <img
                  className="rounded-full w-8 "
                  src={process.env.PUBLIC_URL + title.icon}
                  alt="i"
                /> */}
                  <div>
                    <div className="text-[#353535]">
                      {articleVideo?.sid?.subcategory}
                    </div>{" "}
                  </div>
                </div>
                <div className="item-center flex justify-end ">
                  {articleVideo?.is_BookMarked ? (
                    <BsFillBookmarkFill
                      size={24}
                      cursor="pointer"
                      onClick={() => {
                        setLoading(true);
                        deleteVideoBookmark(
                          articleVideo?._id,
                          articleVideo?.cid._id,
                        )
                          .then(() => {
                            // setVideos((prevVideos) => {
                            //   const updatedVideos = [...prevVideos]
                            //   updatedVideos[index] = {
                            //     ...updatedVideos[index],
                            //     is_bookmarked: 0,
                            //   }
                            //   return updatedVideos
                            // })
                            setBmc(!BMC);

                            setLoading(false);
                          })
                          .catch(() => {
                            setLoading(false);
                          });
                      }}
                    />
                  ) : (
                    <BsBookmark
                      size={24}
                      cursor="pointer"
                      onClick={() => {
                        setLoading(true);
                        addVideoBookmark(
                          articleVideo?._id,
                          articleVideo?.cid._id,
                        )
                          .then(() => {
                            // setVideos((prevVideos) => {
                            //   const updatedVideos = [...prevVideos]
                            //   updatedVideos[index] = {
                            //     ...updatedVideos[index],
                            //     is_bookmarked: 1,
                            //   }
                            //   return updatedVideos
                            // })
                            setBmc(!BMC);

                            setLoading(false);
                          })
                          .catch(() => {
                            setLoading(false);
                          });
                      }}
                    />
                  )}
                  Bookmark
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div>
      <div className="bg-[#F1ECFF]">
        <div className="p-6">
          <div>
            <span
              className={`flex cursor-pointer items-center gap-5 font-bold`}
              onClick={() => navigate(-1)}
            >
              <MdOutlineArrowBack />
              <span>Back</span>
            </span>
          </div>
          <h3 className="py-3 text-left font-bold">
            Care Videos-
            <span className="">{articleVideos[0]?.cid?.category}</span>
          </h3>
          <div className="md:mx-auto md:max-w-[1300px]">
            {articleVideos?.map((articleVideo, key) => (
              <YoutubeVideo
                articleVideo={articleVideo}
                key={key}
                index={key}
                setVideos={setVideos}
                Videos={Videos}
              />
            ))}
          </div>
          {!articleVideos?.length ? (
            <div>There is no video added in this category</div>
          ) : null}
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
        console.error("Error fetching data:", error);
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
        <div className="flex w-full justify-between">
          <Swiper
            spaceBetween={50}
            slidesPerView={4}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {categoryData?.map((category, key) => (
              <>
                {" "}
                {params.category != category._id && (
                  <SwiperSlide key={category._id}>
                    {" "}
                    <Link
                      to={"/videos/" + category._id}
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

export default CareVideoCategory;
