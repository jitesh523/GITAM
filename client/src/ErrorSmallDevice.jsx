import React from "react";
import Lottie from "react-lottie";
import animationData from "./lotties/small_device_animation.json";
import "./index.css";

const ErrorSmallDevice = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="small-device">
      <Lottie options={defaultOptions} height={300} width={300} />
      <h1>
        <span style={{ color: "red" }}>Oops!</span> Try opening in larger
        devices
      </h1>
      <h3>Website for smaller devices in under construction.</h3>
    </div>
  );
};

export default ErrorSmallDevice;
