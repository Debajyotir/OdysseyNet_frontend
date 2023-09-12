import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state/index";
import axios from "axios";
import { server } from "../..";

const FriendlistWidget = ({ userId, isProfile=false}) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const getFriends = async () => {

        try {
            const {data} = await axios.get(`${server}/users/${userId}/friends`,{headers: { Authorization: `Bearer ${token}`} });
            dispatch(setFriends({ friends: data }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFriends();
    }, []); 


  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
            isProfile={isProfile}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendlistWidget;