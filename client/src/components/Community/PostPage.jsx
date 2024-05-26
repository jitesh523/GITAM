import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card } from "antd";
import Loading from "../Loading";
import LikeButton from "./LikeButton";
import { UserContext } from "../../UserContext";
import "./Post.css";

const PostPage = () => {
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // console.log("Params: ", id);
      try {
        const response = await axios.get(`http://localhost:4000/post/${id}`);
        setPostInfo(response.data);
        console.log("Post likes: ", postInfo.likes);
      } catch (e) {
        console.log("Error postPage client side fetching PostInfo");
      }
    };
    fetchData();
  }, []);

  // Send request to delete the post
  async function handleDelete(e) {
    // console.log("delete clicked");
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:4000/post/delete/${id}`);
      navigate("/community");
    } catch (e) {
      console.log("Client side delete error handleDelete()");
    }
  }
  if (!postInfo)
    return (
      <>
        <Loading />
      </>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        minWidth: "100%",
      }}
    >
      <div style={{ marginBlock: "20px" }}>
        <Link className="edit-btn" to={`/community`}>
          Back
        </Link>

        {/* Authorised user edit capability */}
        {userInfo?.username === postInfo.username && (
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            Edit Post
          </Link>
        )}

        {/* Authorised user delete capability */}
        {userInfo?.username === postInfo.username && (
          <Link
            className="edit-btn"
            style={{ backgroundColor: "red", border: "1px solid white" }}
            onClick={handleDelete}
          >
            Delete
          </Link>
        )}
      </div>
      <Card className="post Post">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {/* Title */}
          <h1 style={{ color: "white" }}>{postInfo.title}</h1>
          <div style={{ display: "flex", gap: "15px" }}>
            <div>
              <p style={{ fontStyle: "italic", color: "white" }}>
                Author: {postInfo.username}
              </p>
              <p style={{ fontStyle: "italic", color: "white" }}>
                Posted at {postInfo.createdAt}
              </p>
            </div>
            <LikeButton
              Post_id={id}
              Post_likes={postInfo.likes}
              Post_author={postInfo.username}
              Post_alreadyLiked={postInfo.alreadyLiked}
            />
          </div>
        </div>
        <div
          className="html-div"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </Card>
    </div>
  );
};

export default PostPage;
