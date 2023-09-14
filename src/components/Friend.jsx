import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setFriends } from "../state/index";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios";
import { server } from "../index";
import toast from "react-hot-toast";

const Friend = ({friendId, name, subtitle, userPicturePath,isProfile=false}) =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend)=>friend._id === friendId);

    const patchFriend = async () =>{
        try {
            console.log(server)
            const {data} = await axios.patch(`${server}/users/${_id}/${friendId}`,{},{
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(data);
            dispatch(setFriends({ friends: data }));



            // const response = await fetch(
            //     `${server}/users/${_id}/${friendId}`,
            //     {
            //       method: "PATCH",
            //       headers: {
            //         Authorization: `Bearer ${token}`,
            //         "Content-Type": "application/json",
            //       },
            //     }
            //   );
            //   const data = await response.json();
            //   console.log(data);
            //   dispatch(setFriends({ friends: data }));
        } catch (error) {
            console.log(error);
            toast.error("Oops!!")
        }
    }

    
    const {userId}  = useParams();
    
    if(isProfile && userId && _id===userId){
        isProfile = false;
    }



    return(
        <FlexBetween>

            <FlexBetween gap="1rem">

                <UserImage image={userPicturePath} size="55px" />

                <Box
                    onClick={()=>{
                        navigate(`/profile/${friendId}`);
                        // navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer",
                        },
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>

            </FlexBetween>
            {_id!==friendId && !isProfile  &&
            <IconButton
                onClick={()=>patchFriend()}
                sx={{
                    backgroundColor:primaryLight,
                    p:"0.6rem"
                }}
            >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color:primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color:primaryDark}} />
                )}
            </IconButton>}
 
        </FlexBetween>
    )

}

export default Friend;