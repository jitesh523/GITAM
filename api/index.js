import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import Post from "./models/Post.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import cookieParser from "cookie-parser";

//Initializations
const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = "secret";

//Middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());

//Db connect
mongoose.connect(
  "mongodb+srv://dharmadeepmadisetty:iamdharmathelegend@cluster0.zldooer.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

////////////////////////
/////Get requests///////
///////////////////////

app.get("/", (req, res) => {
  res.json("Hello");
});

app.get("/test", (req, res) => {
  res.json("Test ok");
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jsonwebtoken.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.get("/post", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (e) {
    console.log("error fetching posts");
  }
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id);
  res.json(postDoc);
});
////////////////////////
/////Post requests///////
///////////////////////

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    // console.log("userDoc: " + userDoc);
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
    // res.status(400).json(e.errorResponse.errmsg);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      //Logged in
      jsonwebtoken.sign(
        { username, id: userDoc._id },
        secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({
            id: userDoc._id,
            username,
          });
        }
      );
    } else {
      res.status(400).json("Wrong creds");
    }
  } catch (error) {
    res.status(400).json("Error");
  }
});

app.post("/post", async (req, res) => {
  try {
    console.log("Req body: ", req.body);
    const { title, content, username, likes, alreadyLiked } = req.body;
    const postDoc = await Post.create({
      title,
      content,
      username,
      likes,
      alreadyLiked,
    });
    res.json(postDoc);
  } catch (e) {
    console.log("Error serevr side");
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logged out");
});

////////////////////////
/////Patch requests///////
///////////////////////
app.patch("/post/:id", async (req, res) => {
  const { id } = req.params; // id is post id
  const { title, content } = req.body;
  try {
    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.title = title;
    post.content = content;

    await post.save();
    res.json(post);
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/post/:id/like", async (req, res) => {
  const { id } = req.params;
  const { increment } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.likes += increment ? 1 : -1;
    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

////////////////////////
/////Delete requests///////
///////////////////////
app.delete("/post/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ error: "Server side error", message: error.message });
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
