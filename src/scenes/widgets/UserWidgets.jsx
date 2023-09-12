import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
  } from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../..";
import toast from "react-hot-toast";



const UserWidgets = ({userId, picturePath}) =>{
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    
    const getUser = async() =>{
        const response  = await axios.get(`${server}/users/${userId}`,{
            headers: { Authorization: `Bearer ${token}` }
        })
    
        setUser(response.data);
    }

    useEffect(()=>{
        getUser();
    },[])

    if(!user)
        return null;


    const {firstName, lastName, location, occupation, viewedProfile, impressions, friends} = user;

    return(
        <WidgetWrapper>
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={()=>navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">

                    <UserImage image={picturePath} />

                    <Box>

                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover":{
                                    color:palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>

                        <Typography color={medium}>{friends.length} friends</Typography>

                    </Box>

                </FlexBetween>

                <ManageAccountsOutlined/>

            </FlexBetween>


            <Divider/>


            <Box p="1rem 0">

                <Box display="flex" alignItems="center" mb="0.5rem" gap="1rem">
                    <LocationOnOutlined fontSize="large" sx={{color:main}} />
                    <Typography color="medium">{location}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined fontSize="large" sx={{color:main}} />
                    <Typography color="medium">{occupation}</Typography>
                </Box>

            </Box>


            <Divider/>


            <Box p="1rem 0">

                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
                </FlexBetween>

                <FlexBetween>
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={main} fontWeight="500">{impressions}</Typography>
                </FlexBetween>

            </Box>


            <Divider/>


            <Box p="1rem 0">
                
                <Typography fontWeight="500" color={main} fontSize="1rem" mb="1rem">Social Profile</Typography>

                <FlexBetween gap="1rem" mb="0.5rem">

                    <FlexBetween gap="1rem">

                        <img src="../assets/twitter.png" alt="twitter"/>

                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>
                                Social Network
                            </Typography>
                        </Box>

                    </FlexBetween>

                    <IconButton onClick={()=>toast.success("This feature is coming soon")}>
                        <EditOutlined sx={{color:main}} />
                    </IconButton>


                </FlexBetween>

                <FlexBetween gap="1rem" mb="0.5rem">

                    <FlexBetween gap="1rem">

                        <img src="../assets/linkedin.png" alt="linkedin"/>

                        <Box>
                            <Typography color={main} fontWeight="500">
                                Linkedin
                            </Typography>
                            <Typography color={medium}>
                                Network Plartform
                            </Typography>
                        </Box>

                    </FlexBetween>

                    <IconButton onClick={()=>toast.success("This feature is coming soon")}>
                        <EditOutlined sx={{color:main}} />
                    </IconButton>


                </FlexBetween>

            </Box>


            
        </WidgetWrapper>
    )
}


export default UserWidgets;