import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index";
import PostWidget from "./PostWidget";
import axios from "axios";
import {server} from "../../index"
import toast from "react-hot-toast";

const PostsWidgets = ({userId, isProfile = false}) =>{
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () =>{
        try {
            const {data} = await axios.get(`${server}/post`,{headers: { Authorization: `Bearer ${token}` }})
            dispatch(setPosts({ posts: data }));
        } catch (error) {
            toast.error("Something isn't working");
        }
    }

    const getUserPosts = async () =>{
        try {
            const {data} = await axios.get(`${server}/post/${userId}/posts`,{headers: { Authorization: `Bearer ${token}` }})
            dispatch(setPosts({ posts: data }));
        } catch (error) {
            toast.error("Something isn't working");
        }
    }


    useEffect(()=>{
        if(isProfile)
            getUserPosts();
        else
            getPosts();
    });
   

    
    return (
    <>
        {posts && posts.map(
        ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
        }) => (
            <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            isProfile={isProfile}
            />
        )
        )}  
    </>
    );
}

export default PostsWidgets;