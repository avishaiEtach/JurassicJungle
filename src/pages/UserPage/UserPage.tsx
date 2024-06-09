import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { routesPath } from "../../routes";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import "./UserPage.scss"
import { getDateToObject, getMonthName, getTimeParameters } from "../../assets/util";
import Cookies from "js-cookie";

export function UserPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.usersModel);
  const [catagories , setCatagories] = useState<any>([])
  const [value, setValue] = useState(0);

  const userCatagories = [
    {
      value:"profile",
      icon : <PersonIcon/>,
      tooltip : "User Profile"
    },
    {
      value:"articles",
      icon : <StarIcon/>,
      tooltip : "Favorite Articles"
    }
  ]

  const memberCatagories:any = []

  useEffect(() => {

    if ( !user) {
      navigate(routesPath.home);
    }else{
      let catagories = [...userCatagories]
      if(user.permissions && user.permissions  > 1){
        catagories.push(...memberCatagories)
      }
      setCatagories(catagories)
    }
    
    

  }, [user]);

  console.log("user", user);

  const [chooseUser, setChooseUser] = useState("profile");

  const UserProfile = () => {
    return (
      <div style={{maxWidth:"40%" , marginBlock:"30px"}}>
        <h1>User Profile</h1>
        <div className="flex column g20" style={{display:"flex" , flexWrap:"wrap", }}>
          <TextField className="singup__text__filed" label="firstName" value={user?.firstname} />
          <TextField className="singup__text__filed" label="lastName" value={user?.lastname} />
          <TextField  className="singup__text__filed"label="email" value={user?.email} />
          <label>date of birth</label>
          <div className="flex g10">
                <TextField
                  select
                  size="small"
                  label={"day"}
                  fullWidth
                  value={getDateToObject(new Date(user?.dob as string))?.day}
                  // onChange={(ev) => {
                  //   onChange(ev, true);
                  // }}
                  name={"day"}
                  SelectProps={{
                    MenuProps: {
                      classes: { paper: "singup__up__popover" },
                    },
                  }}
                >
                  {getTimeParameters("day").map((name: any) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  size="small"
                  label={"month"}
                  fullWidth
                  value={getDateToObject(new Date(user?.dob as string))?.month}
                  // onChange={(ev) => {
                  //   onChange(ev, true);
                  // }}
                  name={"month"}
                  SelectProps={{
                    MenuProps: {
                      classes: { paper: "singup__up__popover" },
                    },
                  }}
                >
                  {getTimeParameters("month").map((name: any) => (
                    <MenuItem key={name} value={name}>
                      {getMonthName(name)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  size="small"
                  label={"year"}
                  fullWidth
                  value={getDateToObject(new Date(user?.dob as string))?.year}
                  // onChange={(ev) => {
                  //   onChange(ev, true);
                  // }}
                  name={"year"}
                  SelectProps={{
                    MenuProps: {
                      classes: { paper: "singup__up__popover" },
                    },
                  }}
                >
                  {getTimeParameters("year").map((name: any) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
          </div>
          <div className="flex g10">
          <Button className="login__button">Change Password</Button>
          <Button className="login__button">Edit</Button>
          </div>
        </div>
      </div>
    );
  };
  const UserArticles = () => {
    return <div>UserArticles</div>;
  };
  



  return (
    <>
    <div className="flex user__tab__container">
      {catagories.map((category:any) => <div onClick={()=>{setChooseUser(category.value)}} className={`user__tab ${chooseUser === category.value ? "active" :""}`}>
      {category.icon}
      </div>)}
    </div>
    {chooseUser === "profile" ? <UserProfile /> : <UserArticles />}
    </>
  );
}
