import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { MdOutlineArrowBack } from "react-icons/md";
import LoadingSVG from "../components/LoadingSvg";
import { poster } from "../api/poster";
import { IMAGE_API_ROUTE } from "../api/constant";
import useRestAPI from "../api";

function ArticlePage() {
  const navigate = useNavigate();

  const params = useParams();
  const [articles, setArticles] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const { getArticle, addBookmark, deleteBookmark } = useRestAPI();
  const [isLoading, setLoading] = useState(false);
  const [BMC, setBmc] = useState(false);

  useEffect(() => {
    getData();
  }, [params.ArticlePage, BMC]);

  const getData = async () => {
    try {
      setCategoryLoading(true);

      const data = await poster({
        url: "/api/user/getArticle",
        method: "POST",
        bodyData: {
          cId: params.ArticlePage,
        },
      });
      setArticles(data?.article);
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
      <div className="md:mx-auto md:max-w-[1300px]">
        <header className={`h-[100px] bg-cover bg-bottom`}>
          <span
            className={`flex cursor-pointer items-center gap-3 p-5  font-bold`}
            onClick={() => navigate(-1)}
          >
            <MdOutlineArrowBack />
            <span>Back</span>
          </span>
          <div>
            <h1 className="hidden text-white">Flowbite Blocks Tutorial</h1>
          </div>
        </header>
        {categoryLoading ? (
          <LoadingSVG />
        ) : (
          <div>
            {articles?.map((article, key) => (
              <div
                className="relative -mt-5 rounded-t-md bg-white px-8 drop-shadow-xl"
                key={article._id}
              >
                <div className="flex justify-between text-left">
                  <div className="flex h-[100px] justify-start">
                    <div className="h-full">
                      <img
                        className="h-full rounded-bl-md rounded-tl-md object-contain p-4 md:w-full"
                        src={`${IMAGE_API_ROUTE + article?.cover_image}`}
                        alt=""
                      />
                    </div>
                    <div className="flex w-full items-center justify-between font-medium text-[#353535] ">
                      <div className="text-left text-[#353535]">
                        <p className="clamp-1 text-5xl">
                          {article?.chapter_name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-8 ">
                    <div className="flex">
                      {articles[0]?.is_BookMarked ? (
                        <BsFillBookmarkFill
                          size={24}
                          cursor="pointer"
                          onClick={() => {
                            setLoading(true);
                            deleteBookmark(
                              articles[0]._id,
                              articles[0].cid._id,
                              articles[0].sid,
                            )
                              .then(() => {
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
                            addBookmark(
                              articles[0]._id,
                              articles[0].cid._id,
                              articles[0].sid,
                            )
                              .then(() => {
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
                <div
                  className="article-post py-8"
                  dangerouslySetInnerHTML={{ __html: article?.content }}
                ></div>
                {article?.video_list
                  ? JSON.parse(article?.video_list)?.map((video) => (
                      <YoutubeVideo video={video} article={article} />
                    ))
                  : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const YoutubeVideo = ({ video, article, setArticle }) => {
  console.log(video);
  /*let category = [
    {
      name: 'Health',
      icon: process.env.PUBLIC_URL + '/images/categories/health.svg',
      vicon: '#B19DE5',
      bg: '#F1ECFF',
      id: '11',
    },
    {
      name: 'Equipment',
      icon: process.env.PUBLIC_URL + '/images/categories/equ.svg',
      vicon: '#F88B6F',
      bg: '#FFF3EC',
      id: '12',
    },
    {
      name: 'Environment',
      icon: process.env.PUBLIC_URL + '/images/categories/env.svg',
      vicon: '#4FD490',
      bg: '#ECFFF0',
      id: '13',
    },
    {
      name: 'Social needs',
      icon: process.env.PUBLIC_URL + '/images/categories/social.svg',
      vicon: '#F9C26F',
      bg: '#FFFDEC',
      id: '14',
    },
    {
      name: 'Miscellaneous',
      icon: process.env.PUBLIC_URL + '/images/categories/miscellaneous.svg',
      vicon: '#8B8279',
      bg: '#FFF4EC',
      id: '16',
    },
  ]*/
  //let title = category.find((item) => parseInt(item.id) === article.cid)
  return (
    <div>
      <div className="mx-6  py-5">
        {" "}
        {/* <div className="w-full"> */}
        <iframe
          width="100%"
          className="h-[17em] rounded-md md:h-[500px]"
          src={video.video}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        {/* </div> */}
      </div>
    </div>
  );
};
export default ArticlePage;
