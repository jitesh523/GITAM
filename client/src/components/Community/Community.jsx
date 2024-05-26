import React from "react";
import { Card } from "antd";
import Posts from "./Posts";

const Community = () => {
  return (
    <>
      <Card className="posts-container">
        <Posts />
      </Card>
    </>
  );
};

export default Community;
