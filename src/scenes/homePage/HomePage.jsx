import React from 'react'
import Navbar from "../navbar/Navbar"
import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux';
import UserWidgets from '../widgets/UserWidgets';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidgets from '../widgets/PostsWidgets';
import AdWidget from '../widgets/AdWidget';
import FriendlistWidget from '../widgets/FriendlistWidget';

const HomePage = () => {
  const  isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const {_id, picturePath} = useSelector((state)=>state.user);
  return (
    <Box>

      <Navbar/>

      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >

        <Box 
          flexBasis={isNonMobileScreens ? "26%" : undefined}
        >
          <UserWidgets userId={_id} picturePath={picturePath}/>
        </Box>


        <Box 
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidgets userId={_id}/>
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdWidget />
            <Box m="2rem " />
            <FriendlistWidget userId={_id}/>
          </Box>
        )}

      </Box> 

    </Box>
  )
}

export default HomePage