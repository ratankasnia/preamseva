//import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  //const [value, setValue] = React.useState(0)

  let LINKS = [
    {
      icon:
        location.pathname === "/"
          ? "/images/footer/home-dark.png"
          : "/images/footer/home.png",
      title: (
        <div
          className={` ${
            location.pathname === "/" ? "text-[#0566B1]" : "text-white "
          } mt-2 text-xs `}
        >
          Home
        </div>
      ),
      link: "/",
      id: 1,
    },
    {
      icon:
        location.pathname === "/sheets"
          ? "/images/footer/sheets-dark.png"
          : "/images/footer/sheets.png",
      title: (
        <div
          className={` ${
            location.pathname === "/sheets" ? "text-[#0566B1]" : "text-white"
          } mt-2 text-xs `}
        >
          CARE SHEETS
        </div>
      ),
      link: "/sheets",
      id: 2,
    },
    {
      icon:
        location.pathname === "/videos"
          ? "/images/footer/video-dark.png"
          : "/images/footer/video.png",
      title: (
        <div
          className={` ${
            location.pathname === "/videos" ? "text-[#0566B1]" : "text-white"
          } mt-2 text-xs `}
        >
          CARE VIDEOS
        </div>
      ),
      link: "/videos",
      id: 3,
    },
    {
      icon:
        location.pathname === "/plans"
          ? "/images/footer/user-dark.png"
          : "/images/footer/user.png",
      title: (
        <div
          className={` ${
            location.pathname === "/plans" ? "text-[#0566B1]" : "text-white"
          } mt-2 text-xs `}
        >
          CARE PLAN
        </div>
      ),
      link: "/plans",
      id: 4,
    },
  ];

  return (
    <div className="w-full">
      <div className="fixed bottom-0  left-0 z-50 h-16 w-full border-t border-gray-200 bg-[#0566B1]">
        <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
          {LINKS.map((link) => (
            <div key={link.id}>
              <NavLink
                className={`group flex flex-col items-center justify-center ${
                  location.pathname === link.link
                    ? "bg-[#B7DFFD]"
                    : "bg-transparent"
                } `}
                to={link.link}
              >
                <button
                  type="button"
                  className="inline-flex flex-col items-center justify-center"
                >
                  <img src={link.icon} alt={link.icon} />

                  {link.title}
                </button>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
