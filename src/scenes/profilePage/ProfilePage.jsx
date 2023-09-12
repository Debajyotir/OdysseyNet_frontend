import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import FriendListWidget from "../widgets/FriendlistWidget";
import PostsWidgets from "../widgets/PostsWidgets";
import UserWidgets from "../widgets/UserWidgets";
import { server } from "../..";
import axios from "axios";


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    try {
      const {data} = await axios.get(`${server}/users/${userId}`,{headers: { Authorization: `Bearer ${token}` }});
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); 
  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidgets userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} isProfile/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? "-2rem" : "2rem"}
        >
          <PostsWidgets userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;