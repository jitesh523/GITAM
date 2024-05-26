import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Card } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  //On submit
  async function updatePost(e) {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:4000/post/${id}`, {
        title: title,
        content: content,
      });
      navigate("/community");
    } catch (e) {
      console.log("updatePost function error");
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      // console.log("Params: ", id); ->post id
      try {
        const response = await axios.get(`http://localhost:4000/post/${id}`);
        console.log("Response data: ", response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (e) {
        console.log("Error EditpostPage client side");
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div style={{ marginBlock: "20px" }}>
        <Link className="edit-btn" to={`/post/${id}`}>
          Back
        </Link>
      </div>
      <Card className="posts-container">
        <form
          onSubmit={updatePost}
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

export default EditPost;
