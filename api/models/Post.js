import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String },
    content: { type: String },
    username: { type: String },
    likes: { type: Number },
    alreadyLiked: {type: Boolean}
  },
  { timestamps: true }
);

const PostModel = model("Post", PostSchema);
export default PostModel;
