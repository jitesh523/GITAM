import React, { useState } from "react";
import { Row, Col, Typography } from "antd";
import { Card } from "antd";
import data from "../../data/homepage_data.json";
import "./HomaPage.css";

const HomePage = () => {
  const { Title } = Typography;
  const [selectedButton, setSelectedButton] = useState("gitam-hyderabad");
  function handleClick(slug) {
    setSelectedButton(slug);
  }
  const selectedButtonData = data.sections.find(
    (section) => selectedButton === section.slug
  );

  return (
    <>
      <div className="homepage-container">
        <div className="homepage-container-buttons">
          <button
            className={selectedButton === "gitam-hyderabad" ? "active" : ""}
            onClick={() => handleClick("gitam-hyderabad")}
          >
            GITAMHYD
          </button>
          <button
            className={
              selectedButton === "research-initiatives" ? "active" : ""
            }
            onClick={() => handleClick("research-initiatives")}
          >
            Innovative Research
          </button>
          <button
            className={selectedButton === "departments" ? "active" : ""}
            onClick={() => handleClick("departments")}
          >
            departments
          </button>
          <button
            className={selectedButton === "events-activities" ? "active" : ""}
            onClick={() => handleClick("events-activities")}
          >
            events
          </button>
          <button
            className={selectedButton === "campus-life" ? "active" : ""}
            onClick={() => handleClick("campus-life")}
          >
            campus life
          </button>
          <button
            className={selectedButton === "admissions" ? "active" : ""}
            onClick={() => handleClick("admissions")}
          >
            admissions
          </button>
        </div>
        <div className="homepage-container-data">
          <Row style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Col sm={24} xs={24} lg={24}>
              <Card className="heading-card card">
                <h1>{selectedButtonData.title}</h1>
                <h2>{selectedButtonData.description}</h2>
              </Card>
            </Col>
          </Row>
          <Row gutter={[20, 20]}>
            {selectedButtonData.info.map((detail) => (
              <Col
                sm={24}
                xs={24}
                style={{ display: "flex", justifyContent: "center" }}
                className="card-container"
              >
                <Card
                  key={detail.subtitle}
                  className="home-card-body card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    textShadow: "2px 2px 4px black",
                  }}
                >
                  <h1>{detail.subtitle}</h1>
                  <p>{detail.content}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default HomePage;
