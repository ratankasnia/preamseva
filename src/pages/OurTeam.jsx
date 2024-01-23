import React, { useEffect, useState } from "react";
import TeamModal from "../components/Modal/TeamModal";
import Loader from "../components/Loader/Loader";
import { API_ROUTE, IMAGE_API_ROUTE } from "../api/constant";
import { getToken } from "../utility/utility";
// import {
//   IMAGE_API_ROUTE,
//   API_ROUTE,
//   REACT_APP_BASE_URL,
// } from "../api/constant";

// const team = [
//   {
//     id: 11,
//     icon: "../../public/images/2023-9-6_14-53-0_743.jpeg",
//     name: "Dr Sanjay Suri",
//     designation: "Director Prem Seva",
//   },
//   {
//     id: 12,
//     icon: "../../public/images/2023-9-6_14-53-0_743.jpeg",
//     name: "Dr Sanjay Suri",
//     designation: "Director Prem Seva",
//   },
//   {
//     id: 13,
//     icon: "../../public/images/2023-9-6_14-53-0_743.jpeg",
//     name: "Dr Sanjay Suri",
//     designation: "Director Prem Seva",
//   },
//   {
//     id: 14,
//     icon: "../../public/images/2023-9-6_14-53-0_743.jpeg",
//     name: "Dr Sanjay Suri",
//     designation: "Director Prem Seva",
//   },
// ];

const OurTeam = () => {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getTeam() {
      setIsLoading(true);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      };
      var res = await fetch(API_ROUTE + "/api/team/getTeam", {
        method: "GET",
        headers: headers,
      });
      var data = await res.json();
      setTeam(data.data);
      // console.log("data responce:", data.data);
      setIsLoading(false);
    }
    getTeam();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mx-auto mt-5 max-w-6xl px-5">
          <div className="mt-6 text-center text-2xl font-semibold">
            Our Team
          </div>
          <div className="mt-5">
            <div className="flex flex-wrap items-start justify-center gap-3">
              {team?.length > 0
                ? team.map((item) => (
                    <div
                      className="flex w-full flex-col items-center justify-center border-2 lg:w-[32%]"
                      key={item._id}
                    >
                      <img
                        src={IMAGE_API_ROUTE + "/" + item.image}
                        className="md:w-68 md:h-74 h-full w-full rounded object-cover shadow"
                        alt=""
                      />

                      <div className="w-60 p-3">
                        <div className="text-2xl font-bold">{item.name}</div>
                        <div>{item.designation}</div>
                        <div>
                          <TeamModal item={item} />
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OurTeam;
