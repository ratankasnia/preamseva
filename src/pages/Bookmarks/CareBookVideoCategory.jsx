import React, { useContext, useEffect, useState } from "react";
import {
  BsArrowLeftShort,
  BsBookmark,
  BsFillBookmarkFill,
} from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import useRestAPI from "../../api";
// import { useQuery } from "@tanstack/react-query";
import { poster } from "../../api/poster";
import { AuthContext } from "../../context/AuthContextProvider";

function CareBookVideoCategory() {
  const params = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getVideoBookmarks } = useRestAPI();
  const [Videos, setVideos] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [articleVideos, setArticleVideos] = useState([]);
  const [BMC, setBmc] = useState(false);

  useEffect(() => {
    getData();
  }, [params.category, BMC]);

  const getData = async () => {
    try {
      const data = await getVideoBookmarks(params.category);
      setArticleVideos(data.bookmarks);
      setCategoryLoading(false);
    } catch (error) {}
  };

  // if (!categoryData) {
  //   return <LoadingSVG />;
  // }
  // console.log(data);
  // console.log("article vedio chevk :", articleVideos);
  const YoutubeVideo = ({
    category,
    setVideos,
    Videos,
    index,
    articleVideo,
  }) => {
    const { deleteVideoBookmark, addVideoBookmark } = useRestAPI();
    return (
      <div>
        <div className="mx-6  py-5  ">
          {" "}
          {/* <div className="w-full"> */}
          <iframe
            width="100%"
            className="h-[17em] rounded-md md:h-[500px]"
            src={category?.video}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          {/* </div> */}
          <div className=" text  rounded-bl-md rounded-br-md bg-white px-2 py-2 text-left  text-sm text-[#04518D]">
            <div className="flex items-center justify-between   gap-3">
              <div className="flex items-center  gap-3 px-5">
                {/* <img className="rounded-full w-8 " src={title?.icon} alt="i" /> */}
                <div>
                  <div className="text-[#353535]">{category?.subcategory}</div>{" "}
                </div>
              </div>
              <div className="item-center flex justify-end ">
                {!articleVideo?.is_BookMarked ? (
                  <BsFillBookmarkFill
                    size={24}
                    cursor="pointer"
                    onClick={() => {
                      setLoading(true);
                      deleteVideoBookmark(
                        articleVideo?.avid?._id,
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
                      addVideoBookmark(articleVideo?._id, articleVideo?.cid._id)
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
    );
  };
  return (
    <div>
      <div className="">
        <div className="p-6">
          <div>
            <span
              className={`flex cursor-pointer items-center font-bold `}
              onClick={() => navigate(-1)}
            >
              <BsArrowLeftShort size={30} /> &nbsp; Back{" "}
            </span>
          </div>
          <h3 className="py-3 text-left font-bold">
            Care Videos-
            <span className="">{articleVideos[0]?.cid?.category}</span>
          </h3>

          <div className="md:mx-auto md:max-w-[1300px]">
            {articleVideos?.map((articleVideo, key) => (
              <YoutubeVideo
                category={articleVideo?.avid}
                key={key}
                index={key}
                setVideos={setVideos}
                Videos={articleVideo?.avid?.video}
                articleVideo={articleVideo}
              />
            ))}
          </div>
          {!articleVideos?.length ? (
            <div>You don't have any bookmark </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CareBookVideoCategory;
