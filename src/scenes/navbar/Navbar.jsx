import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import toast from "react-hot-toast";


const Navbar = () => {
  const [isMobileMenueToggled,setIsMobileMenueToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding='1rem 6%' backgroundColor={alt} >

      <FlexBetween gap='1.75rem'>
        <Typography
          fontWeight='bold'
          fontSize='clamp(1rem, 2rem, 2.5rem)'
          color="primary"
          onClick={()=>navigate("/home")}
          sx={{
            "&:hover":{
              color:primaryLight,
              cursor:"pointer"
            }
          }}
        >
          OdysseyNet
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3px" padding="0.1rem 1.5em" >
            <InputBase placeholder="Search..." />
            <IconButton onClick={()=>toast.success("This feature is coming soon")}>
              <Search/>
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>


      {isNonMobileScreens ? (<FlexBetween gap="2rem">

        <IconButton onClick={()=>dispatch(setMode())}>
          {theme.palette.mode === 'dark' ? (
            <DarkMode sx={{fontSize:"25px"}}/>
          ):(
            <LightMode sx={{ color:dark, fontSize:"25px"}}/>
          )}
        </IconButton>

        <IconButton onClick={()=>toast.success("This feature is coming soon")}>
          <Message sx={{color:dark, fontSize:"25px"}}/>
        </IconButton>


        <IconButton onClick={()=>toast.success("This feature is coming soon")}>
          <Notifications sx={{color:dark, fontSize:"25px"}}/>
        </IconButton>
        
        <IconButton onClick={()=>toast.success("This feature is coming soon")}>
          <Help sx={{color:dark, fontSize:"25px"}}/>
        </IconButton>
        

        <FormControl variant="standard" value={fullName}>
          <Select
            value={fullName}
            sx={{
              backgroundColor:neutralLight,
              width:"150px",
              borderRadius:"0.25rem",
              p:"0.25rem 1rem",
              "& .MuiSvgIcon-root":{
                pr:"0.25rem",
                width:"3rem"
              },
              "& .MuiSelect-select:focus":{
                backgroundColor: neutralLight
              }
            }}
            input={<InputBase/>}
          >
          <MenuItem value={fullName}>
            <Typography>{fullName}</Typography>
          </MenuItem>
          <MenuItem onClick={()=>dispatch(setLogout())}>
            LogOut
          </MenuItem>
          </Select>
        </FormControl>

      </FlexBetween>
      ) : 
      (
        <IconButton
          onClick={()=>setIsMobileMenueToggled(!isMobileMenueToggled)}
        >
          <Menu/>
        </IconButton>
      )}





      {!isNonMobileScreens && isMobileMenueToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >

          <Box display="flex" justifyContent="flex-end" p="1rem" >
            <IconButton
              onClick={()=>setIsMobileMenueToggled(!isMobileMenueToggled)}
            >
            <Close/>
          </IconButton>
          </Box>

          <FlexBetween flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">

            <IconButton onClick={()=>dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{fontSize:"25px"}}/>
              ):(
                <LightMode sx={{ color:dark, fontSize:"25px"}}/>
              )}
            </IconButton>

            <IconButton onClick={()=>toast.success("This feature is coming soon")}>
              <Message sx={{color:dark, fontSize:"25px"}}/>
            </IconButton>


            <IconButton onClick={()=>toast.success("This feature is coming soon")}>
              <Notifications sx={{color:dark, fontSize:"25px"}}/>
            </IconButton>
            
            <IconButton onClick={()=>toast.success("This feature is coming soon")}>
              <Help sx={{color:dark, fontSize:"25px"}}/>
            </IconButton>

            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor:neutralLight,
                  width:"150px",
                  borderRadius:"0.25rem",
                  p:"0.25rem 1rem",
                  "& .MuiSvgIcon-root":{
                    pr:"0.25rem",
                    width:"3rem"
                  },
                  "& .MuiSelect-select:focus":{
                    backgroundColor: neutralLight
                  }
                }}
                input={<InputBase/>}
              >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={()=>dispatch(setLogout())}>
                LogOut
              </MenuItem>
              </Select>
            </FormControl>

          </FlexBetween>
          

        </Box>
      )}

    </FlexBetween>
  )
}

export default Navbar;