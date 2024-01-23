import React, { useContext } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp, IoMdSettings } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { BiIdCard } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { VscTasklist } from "react-icons/vsc";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { PiMedalLight } from "react-icons/pi";
import { RiTeamLine } from "react-icons/ri";
import { TbDiscountCheck } from "react-icons/tb";
import { CiCircleInfo } from "react-icons/ci";

import {
  MdBookmarkAdded,
  MdOutlineExitToApp,
  MdOutlinePermContactCalendar,
} from "react-icons/md";
import { RiHandHeartLine } from "react-icons/ri";
import { FiEdit, FiPlay } from "react-icons/fi";
import { TbMessages } from "react-icons/tb";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { isLogedInUser } from "../../utility/utility";
import { AuthContext } from "../../context/AuthContextProvider";

function Sidebar() {
  const [isOpenDrawer, setOpenDrawer] = React.useState(false);

  const onOpenHandler = () => {
    setOpenDrawer(true);
  };
  const onCloseHandler = () => {
    setOpenDrawer(false);
  };

  const onHandlerDwawer = () => {
    setOpenDrawer(!isOpenDrawer);
  };
  return (
    <div>
      <div className="fixed left-0 right-0 z-50 rounded-b-3xl bg-primary drop-shadow-xl">
        <div className="flex items-center justify-between px-6">
          <div className="flex items-center  py-3 pt-6">
            <span className="rounded-full bg-white p-3">
              <img src="/images/logo.svg" alt="" />
            </span>
            <div className="px-2 font-semibold">
              <h2 className="text-2xl text-primary-dark">PREM SEVA</h2>
              <h3 className="text-sm text-primary-dark ">
                Supporting your caregiving
              </h3>
            </div>
          </div>
          <div onClick={onOpenHandler}>
            <span className="cursor-pointer">
              <img src={"/images/burger.svg"} alt="" />
            </span>
          </div>
        </div>

        <SwipeableDrawer
          anchor="right"
          open={isOpenDrawer}
          onClose={onHandlerDwawer}
          onOpen={onHandlerDwawer}
        >
          <div className="w-[350px] ">
            <div>
              <div className="flex items-center  justify-between  border-b-2 p-6">
                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-white p-3 drop-shadow-xl">
                    <img src={"/images/logo.svg"} alt="" />
                  </span>

                  <span className="text-2xl font-semibold text-[#414042]">
                    PremSeva
                  </span>
                </div>
                <AiFillCloseCircle
                  onClick={onCloseHandler}
                  size={30}
                  className="cursor-pointer"
                  color="#616161"
                />
              </div>
            </div>
            <div className="p-6">
              <NestedDrawer setOpenDrawer={setOpenDrawer} />
            </div>
          </div>
        </SwipeableDrawer>
      </div>
    </div>
  );
}

const NestedDrawer = ({ setOpenDrawer }) => {
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [bookmarksOpen, setBookmarksOpen] = React.useState(false);
  const [aboutUsOpen, setAboutUsOpen] = React.useState(false);

  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const onOpenDropdownHandler = () => {
    setOpenDrawer(false);
  };

  const onListItemHandler = (toScreen) => {
    setOpenDrawer(false);
    navigate(toScreen);
  };

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
    // Close other dropdowns
    setBookmarksOpen(false);
    setAboutUsOpen(false);
  };

  const handleBookmarksClick = () => {
    setBookmarksOpen(!bookmarksOpen);
    // Close other dropdowns
    setProfileOpen(false);
    setAboutUsOpen(false);
  };

  const handleAboutUsClick = () => {
    setAboutUsOpen(!aboutUsOpen);
    // Close other dropdowns
    setProfileOpen(false);
    setBookmarksOpen(false);
  };

  return (
    <>
      {isLogedInUser() ? (
        <>
          <div>
            <ListItemButton onClick={handleProfileClick}>
              <ListItemIcon>{<FaUserFriends size={25} />}</ListItemIcon>
              <ListItemText primary="Profile" />
              {profileOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </ListItemButton>
            <Collapse in={profileOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/profile/giver" onClick={onOpenDropdownHandler}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <BiIdCard size={24} />
                    </ListItemIcon>
                    <ListItemText primary="Caregiver" />
                  </ListItemButton>
                </Link>

                <Link to="/profile/receiver" onClick={onOpenDropdownHandler}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <CgProfile size={24} />
                    </ListItemIcon>
                    <ListItemText primary="Care Receiver" />
                  </ListItemButton>
                </Link>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <VscTasklist size={24} />
                  </ListItemIcon>
                  <ListItemText primary="Subscription" />
                </ListItemButton>
              </List>
            </Collapse>
          </div>
          <div>
            <ListItemButton onClick={handleBookmarksClick}>
              <ListItemIcon>{<MdBookmarkAdded size={25} />}</ListItemIcon>
              <ListItemText primary="Bookmarks" />
              {bookmarksOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </ListItemButton>
            <Collapse in={bookmarksOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/bookmark/sheets" onClick={onOpenDropdownHandler}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <RiHandHeartLine size={24} />
                    </ListItemIcon>
                    <ListItemText primary="Care sheets" />
                  </ListItemButton>
                </Link>
                <Link to="/bookmark/videos" onClick={onOpenDropdownHandler}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FiPlay size={24} />
                    </ListItemIcon>
                    <ListItemText primary="Care videos" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
          </div>
          <div>
            <Link to="/feedback" onClick={onOpenDropdownHandler}>
              <ListItemButton>
                <ListItemIcon>
                  <FiEdit size={24} />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
              </ListItemButton>{" "}
            </Link>
            <ListItemButton>
              <ListItemIcon>
                <TbMessages size={24} />
              </ListItemIcon>
              <ListItemText primary="Forum" />
            </ListItemButton>{" "}
            <a
              href="mailto:premsevateam@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemButton>
                <ListItemIcon>
                  <MdOutlinePermContactCalendar size={24} />
                </ListItemIcon>
                <ListItemText primary="Contact Us" />
              </ListItemButton>{" "}
            </a>
            <ListItemButton onClick={onListItemHandler.bind(this, "/settings")}>
              <ListItemIcon>
                <IoMdSettings size={24} />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>{" "}
            <ListItemButton
              onClick={() => {
                setOpenDrawer(false);
                handleLogout();
              }}
            >
              <ListItemIcon>
                <BiIdCard size={24} />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItemButton>
            <ListItemButton onClick={onListItemHandler.bind(this, "/privacy")}>
              <ListItemIcon>
                <IoShieldCheckmarkOutline size={24} />
              </ListItemIcon>
              <ListItemText primary="Privacy Policy" />
            </ListItemButton>
          </div>
          <div>
            <ListItemButton onClick={handleAboutUsClick}>
              <ListItemIcon>{<CiCircleInfo size={25} />}</ListItemIcon>
              <ListItemText primary="About Us" />
              {aboutUsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </ListItemButton>
            <Collapse in={aboutUsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/disclaimer" onClick={onOpenDropdownHandler}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <TbDiscountCheck size={24} />
                    </ListItemIcon>
                    <ListItemText primary="Disclaimer" />
                  </ListItemButton>
                </Link>
                <Link to="/acknowledgment" onClick={onOpenDropdownHandler}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PiMedalLight size={24} />
                    </ListItemIcon>
                    <ListItemText primary="Acknowledgments" />
                  </ListItemButton>
                </Link>
                <Link to="/our-team/" onClick={onOpenDropdownHandler}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <RiTeamLine size={24} />
                    </ListItemIcon>
                    <ListItemText primary="Our Team" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
          </div>
        </>
      ) : (
        <>
          <ListItemButton onClick={onListItemHandler.bind(this, "/auth/login")}>
            <ListItemIcon>
              <MdOutlineExitToApp size={24} />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
          <ListItemButton
            onClick={onListItemHandler.bind(this, "/auth/register")}
          >
            <ListItemIcon>
              <CgProfile size={24} />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItemButton>
          <ListItemButton onClick={onListItemHandler.bind(this, "/privacy")}>
            <ListItemIcon>
              <IoShieldCheckmarkOutline size={24} />
            </ListItemIcon>
            <ListItemText primary="Privacy Policy" />
          </ListItemButton>

          <div>
            <ListItemButton onClick={handleAboutUsClick}>
              <ListItemIcon>{<CiCircleInfo size={25} />}</ListItemIcon>
              <ListItemText primary="About Us" />
              {aboutUsOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </ListItemButton>
            <Collapse in={aboutUsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to="/disclaimer" onClick={onOpenDropdownHandler}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <TbDiscountCheck size={24} />
                    </ListItemIcon>
                    <ListItemText primary="Disclaimer" />
                  </ListItemButton>
                </Link>
                <Link to="/acknowledgment" onClick={onOpenDropdownHandler}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PiMedalLight size={24} />
                    </ListItemIcon>
                    <ListItemText primary="Acknowledgments" />
                  </ListItemButton>
                </Link>
                <Link to="/our-team/" onClick={onOpenDropdownHandler}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <RiTeamLine size={24} />
                    </ListItemIcon>
                    <ListItemText primary="Our Team" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
