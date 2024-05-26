import React, { useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Burger.css";
import { Divider } from "antd";

const Burger = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("top");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
        <Button
          style={{
            position: "relative",
            backgroundColor: "transparent",
            color: "black",
            fontSize: "30px",
          }}
          type="primary"
          onClick={showDrawer}
        >
          <MenuOutlined />
        </Button>
      </Space>
      <Drawer
        className="burger"
        style={{
          position: "absolute",
          // top: "50px",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          fontWeight: "normal",
          maxHeight: "250px",
        }}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "absolute",
            top: "50px",
          }}
        >
          <Link className="burger-items" to="/">
            Home
          </Link>
          <Link className="burger-items" to="/charecters">
            Characters
          </Link>
          <Link className="burger-items" to="/creator">
            Creator
          </Link>
          <Link className="burger-items" to="/myself">
            Myself
          </Link>
          <Link className="burger-items" to="/contactme">
            Contact me
          </Link>
        </div>
      </Drawer>
    </>
  );
};
export default Burger;
