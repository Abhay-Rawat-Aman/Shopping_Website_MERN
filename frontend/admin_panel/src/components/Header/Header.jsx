import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import UserImage from "../UserImage/UserImage";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import SearchBar from "../SearchBar/SearchBar";
import { MyContext } from "../../App";
import { logout } from "../../Api/authApi"; 
import { useNavigate } from "react-router-dom"; 

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Initialize navigate
  const context = useContext(MyContext);
  const userName = context.user?.name || "pawan";
  console.log(context.user?.name);
  // alert(context.user?.name);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout(); 
      context.setIsLogin(false); 
      navigate("/login"); 
      // context.setIsLogin(false); 
    } catch (error) {
      console.error("Logout failed", error); 
    }
  };

  return (
    <header className="fixed top-0 right-0 bg-gray-300 flex items-center justify-between px-4 z-10">
      <SearchBar />
      <div className="ml-auto part2">
        <ul className="flex gap-3 items-center m-0">
          <li>
            <Button>
              <FaRegBell />
            </Button>
          </li>
          <li>
            <Button>
              <MdOutlineEmail />
            </Button>
          </li>
          <li>
            <div className="myAcc" onClick={handleClick}>
              <Button>
                <UserImage />
              </Button>
            </div>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>

                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </li>
          <li>
            {userName}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
