import React, { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import useRestAPI from "../../api";
import { MdKeyboardArrowRight } from "react-icons/md";

function CareBookSheet() {
  const navigate = useNavigate();
  const { getBookmarks } = useRestAPI();
  const [bookMarks, setbookMarks] = useState(null);

  useEffect(() => {
    return async () => {
      let data = await getBookmarks();
      setbookMarks(data.articles);
    };
  }, []);

  return (
    <div>
      <div className="p-6">
        <div>
          <span
            className={`flex cursor-pointer items-center font-bold text-[#0566B1]`}
            onClick={() => navigate(-1)}
          >
            <BsArrowLeftShort size={30} /> &nbsp; Back{" "}
          </span>
        </div>
        <h3 className="py-3 text-left font-bold">My Saved Care Sheets</h3>
        <div className="mt-4">
          {bookMarks?.map((category, key) => (
            <Link
              to={`/sheets/${category.category.toLowerCase()}/${category.aid}`}
              key={key}
            >
              <div className="py-2" key={key}>
                <div className="flex h-[100px] rounded-md bg-white drop-shadow-xl">
                  <div className="h-full">
                    <img
                      className="w-30 h-full rounded-bl-md rounded-tl-md  md:w-full "
                      src={`http://premseva.com/admin/article-images/${category?.image}`}
                      alt={key}
                    />
                  </div>
                  <div className="flex w-full items-center justify-between px-4 font-medium text-[#353535] ">
                    <div className="flex w-full items-center justify-between text-[#353535] md:px-4 ">
                      <div className="text-left text-[#353535]">
                        <h3 className="clamp-1 font-medium">
                          {category.chapter_name}
                        </h3>
                        {/* <h4 className="text-xs md:text-sm py-1 text-sm ">
                          Published date: <br className="md:hidden"></br>
                          {category.published_date}
                        </h4> */}
                        <h2 className="font-500 text-sm text-[#B19DE5] ">
                          {category.category}
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
        </div>
      </div>
    </div>
  );
}

export default CareBookSheet;
