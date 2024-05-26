import React, { useState, useContext } from "react";
import { Card } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const CreatePost = () => {
  const { userInfo } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const username = userInfo?.username;
  async function createNewPost(e) {
    e.preventDefault();
    // console.log("title: ", title);
    // console.log("content: ", content);
    try {
      await axios.post("http://localhost:4000/post", {
        title: title,
        content: content,
        username: username,
        likes: 0,
        alreadyLiked: "false",
      });

      // Navigate to community page
      navigate("/community");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <Card className="posts-container">
        <h1 style={{ color: "white" }}>
          Hey {username}! Post your thoughts here.
        </h1>
        <form
          onSubmit={createNewPost}
          style={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              minWidth: "90%",
              backgroundColor: "rgb(0, 0,0,0.5 )",
              color: "white",
            }}
          />
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(newValue) => setContent(newValue)}
            style={{
              width: "100%",
              color: "white",
              backgroundColor: "black",
              fontWeight: "normal",
            }}
          />

          <button style={{ minWidth: "50%" }}>Publish</button>
        </form>
      </Card>
    </div>
  );
};

export default CreatePost;
