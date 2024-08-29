import React, { useContext, useState } from "react";
import { MyContext } from "../../App"; 
import logo from "../../assets/Images/logo.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AnimatePresence, motion } from "framer-motion";

import {
  FaAngleDown,
  FaAngleRight,
  FaCartArrowDown,
  FaProductHunt,
  FaUserAlt,
} from "react-icons/fa";
import { InsertComment, NotificationsActive } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMenu } from "react-icons/md";

const Sidebar = () => {
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const { sidebarCollapsed, toggleSidebar } = useContext(MyContext);

  const [isActiveTab, setIsActiveTab] = useState(0);
  const [isToogleMenue, setIsToogleMenue] = useState(false);

  const isSubmenu = (index) => {
    setIsActiveTab(index);
    setIsToogleMenue(!isToogleMenue);
  };

  return (
    <>
      <div className="sidebar bg-white w-[278px] fixed h-full top-0 left-0 z-[100] p-4 overflow-hidden">
        <Link to="/">
          <div className="SideBarHeader flex justify-between items-center">
            <AnimatePresence>
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className={`logoWrapper py-2 mb-3 px-2 w-[150px] z-10 ${
                  sidebarCollapsed ? "opacity-0" : "opacity-100"
                } transition-opacity duration-300`}
              >
                <img src={logo} alt="Logo" />
              </motion.div>
            </AnimatePresence>
          </div>
        </Link>

        <div className="sidebarTabs">
          <ul className="flex gap-2 flex-col">
            <li>
              <h5
                className={`text-black/40 capitalize px-3 mt-3 mb-2 ${
                  sidebarCollapsed ? "opacity-0" : "opacity-100"
                } transition-opacity duration-300`}
              >
                overview
              </h5>
            </li>

            <li>
              <Link to="/">
                <Button
                  className={`w-100 ${isActiveTab === 0 ? "active" : ""} `}
                  onClick={() => isSubmenu(0)}
                >
                  <span className="icon mr-3 w-[25px] h-[35px] flex items-center justify-center rounded-md">
                    <DashboardIcon />
                  </span>
                  <div
                    className={`${
                      sidebarCollapsed ? "opacity-0" : "opacity-100"
                    } transition-opacity duration-300  `}
                  >
                    Dashboard
                  </div>
                </Button>
              </Link>
            </li>

            <li>
              <Button
                className={`w-100 flex items-center justify-between ${
                  isActiveTab === 1 ? "active" : ""
                } `}
                onClick={() => isSubmenu(1)}
              >
                <span className="icon mr-3 w-[25px] h-[35px] flex items-center justify-center rounded-md">
                  <FaProductHunt />
                </span>
                <span
                  className={`${
                    sidebarCollapsed ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300  `}
                >
                  Products
                </span>
                <span
                  className={`arrow mx-auto w-[30px] h-[30px] flex items-center justify-center ${
                    sidebarCollapsed ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300  `}
                >
                  <FaAngleRight
                    className={
                      isToogleMenue === true && isActiveTab === 1
                        ? "arrow-open"
                        : "arrow-close"
                    }
                  />
                </span>
              </Button>

              <AnimatePresence>
                <div
                  className={`submenuWrapper ${
                    isActiveTab === 1 && isToogleMenue === true
                      ? "colapse"
                      : "colapsed"
                  } ${
                    sidebarCollapsed ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300  `}
                >
                  <div className="submenu mt-1">
                    <Link to="/products/productList">
                      <Button className="w-100">Product List</Button>
                    </Link>
                    {/* <Link>
                      <Button className="w-100">Edit Products</Button>
                    </Link> */}
                    <Link>
                      <Button className="w-100">Product Details</Button>
                    </Link>
                    <Link to="/products/createProduct">
                      <Button className="w-100">Create Products</Button>
                    </Link>
                  </div>
                </div>
              </AnimatePresence>
            </li>

            <li>
              <Button
                className={`w-100 flex items-center justify-between ${
                  isActiveTab === 2 ? "active" : ""
                } `}
                onClick={() => isSubmenu(2)}
              >
                <span className="icon mr-3 w-[25px] h-[35px] flex items-center justify-center rounded-md">
                  <FaCartArrowDown />
                </span>
                Orders
              </Button>
            </li>

            <li>
              <Button
                className={`w-100 flex items-center justify-between ${
                  isActiveTab === 3 ? "active" : " "
                }`}
                onClick={() => isSubmenu(3)}
              >
                <span className="icon mr-3 w-[25px] h-[35px] flex items-center justify-center rounded-md">
                  <NotificationsActive />
                </span>
                Notifications
              </Button>
            </li>

            <li>
              <Button
                className={`w-100 flex items-center justify-between ${
                  isActiveTab === 4 ? "active" : ""
                }`}
                onClick={() => isSubmenu(4)}
              >
                <span className="icon mr-3 w-[25px] h-[35px] flex items-center justify-center rounded-md">
                  <SettingsIcon />
                </span>
                Settings
              </Button>
            </li>

            <li>
              {!sidebarCollapsed && (
                <li>
                  <h5 className="text-black/40 capitalize px-3 mt-3 mb-2">
                    Authentication
                  </h5>
                </li>
              )}
            </li>

            <li>
              <Button
                className={`w-100 flex items-center justify-between ${
                  isActiveTab === 5 ? "active" : ""
                }`}
                onClick={() => isSubmenu(5)}
              >
                <span className="icon mr-3 w-[25px] h-[35px] flex items-center justify-center rounded-md">
                  <AccountCircleIcon />
                </span>
                Login
              </Button>
            </li>

            <li>
              <Button
                className={`w-100 flex items-center justify-between ${
                  isActiveTab === 6 ? "active" : ""
                }`}
                onClick={() => isSubmenu(6)}
              >
                <span className="icon mr-3 w-[25px] h-[35px] flex items-center justify-center rounded-md">
                  <FaUserAlt />
                </span>
                SignUp
              </Button>
            </li>

            <li style={{ zoom: "88%", fontWeight : "bold" }}>
              <Button
                className={`w-100 flex items-center justify-between ${
                  isActiveTab === 7 ? "active" : ""
                }`}
                onClick={() => isSubmenu(7)}
              >
                <span className="icon mr-3 w-[25px] h-[35px] flex items-center justify-center rounded-md">
                  <RiLockPasswordLine />
                </span>

                <div
                  className={` ${sidebarCollapsed ? "displayNone" : "visible"}`}
                >
                  Forget Password
                </div>
              </Button>
            </li>

            <li>
              <Button
                className={`w-100 flex items-center justify-between ${
                  isActiveTab === 8 ? "active" : ""
                }`}
                onClick={() => isSubmenu(8)}
              >
                <span className="icon mr-3 w-[25px] h-[35px] flex items-center justify-center rounded-md">
                  <InsertComment />
                </span>
                OTP pages
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
