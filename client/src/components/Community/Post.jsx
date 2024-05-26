import React from "react";
import { Row, Col, Typography, Input, Card } from "antd";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import "./Post.css";
import {HeartOutlined} from "@ant-design/icons"

const Post = ({ title, username, time, id, likes }) => {
  const { Title } = Typography;
  return (
    <div>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <Link
            to={`/post/${id}`}
            style={{ textDecoration: "none", minWidth: "100%" }}
          >
            <Card className="post">
              <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Col
                  span={5}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <p><HeartOutlined /> {likes}</p>
                </Col>
                <Col
                  span={10}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <h3>{title}</h3>
                </Col>
                <Col
                  span={5}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:"center",
                    flexDirection: "column",
                  }}
                >
                  <CgProfile />
                  <p>{username}</p>
                  <p>{time}</p>
                </Col>
              </Row>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Post;
