import React, { useState, useEffect } from "react";
import "./preloader.css"; // Import the CSS file

const PreLoader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader-container ${showLoader ? "" : "hidden"}`}>
      <h1 className="tulpen-one-regular">Tiny Coders</h1>
      <ul>
        <li>R Jitesh HU21CSEN0100563</li>
        <li>Srindhi Vaishnavi P HU21CSEN0101104</li>
        <li>Raghavendra D HU21CSEN0100625</li>
        <li>Avani M HU21CSEN0100594</li>
        <li>Likhtiht M HU21CSEN0100573</li>
      </ul>
    </div>
  );
};

export default PreLoader;
