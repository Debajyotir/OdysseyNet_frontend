import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme, InputBase, } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state/index";
import axios from "axios";
import { server } from "../..";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import toast from "react-hot-toast";


const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    isProfile
}) =>{

    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const primaryDark = palette.primary.dark;

    const [commentPost,setCommentPost] = useState("");


    const patchLike = async () =>{
        try {
            const body = { userId: loggedInUserId };
            const {data} = await axios.patch(`${server}/post/${postId}/like`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            dispatch(setPost({post:data}));

        } catch (error) {
            console.log(error);
        }
    }

    const AddComment = async() =>{
        try {
            console.log("ll....")
            const body = { comment: commentPost};

            const {data} = await axios.patch(`${server}/post/${postId}/add/comments`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            dispatch(setPost({post:data}));

            setCommentPost("");
            toast.success("Comment added successfully")
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <WidgetWrapper m="2rem 0">

            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
                isProfile={isProfile}
            />

            <Typography color={main} sx={{mt:"1rem"}}>{description}</Typography>

            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="Post"
                    style={{
                        borderRadius:"0.75rem",
                        marginTop: "0.75rem"
                    }}
                    src={`${server}/assets/${picturePath}`}
                />
            )}

            <FlexBetween mt="0.25rem">

                <FlexBetween gap="1rem">

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{color:primary}} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={()=>setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>

                </FlexBetween>

                <IconButton onClick={()=>toast.success("This feature is coming soon")}>
                    <ShareOutlined />
                </IconButton>

            </FlexBetween>

            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment,i)=>(
                        <Box key={`${name}-${i}`}>
                            <Divider/>
                            <Typography
                                sx={{
                                    color:main,
                                    // m:"0.5rem 0",
                                    // pl:"1rem"
                                    width:"100%",
                                    backgroundColor: palette.primary.light,
                                    m:"1rem 0",
                                    pl:"1rem",
                                    borderRadius:"15px"
                                }}
                            >
                                {comment}
                            </Typography>
                        </Box>
                    ))}

                    <Divider/>
                    <FlexBetween>
                    <InputBase
                    placeholder="Express your thought..."
                    onChange={(e)=>setCommentPost(e.target.value)}
                    value={commentPost}
                    sx={{
                        width:"100%",
                        backgroundColor: palette.neutral.light,
                        m:"0.5rem 0",
                        pl:"1rem",
                        borderRadius:"15px"
                    }}
                    />
                    <IconButton
                        onClick={()=>AddComment()}
                        sx={{
                            p:"0.6rem"
                        }}
                    >
                        <SendOutlinedIcon sx={{ color:primaryDark }}/>
                    </IconButton>
                    </FlexBetween>
                    <Divider/>
                </Box>
            )}

        </WidgetWrapper>
    )

}

export default PostWidget;