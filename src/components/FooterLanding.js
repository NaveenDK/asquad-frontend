import React from "react";
import { Col, Row } from "react-bootstrap";

const FooterLanding = () => {
  return (
    <>
      <Row className="pb-5 footer-main">
        <Col>
          {" "}
          <h5 style={{ paddingBottom: "20px" }}>Docs</h5>
          <p>
            <a
              href="https://docs.google.com/document/d/1q0M9ks_oTGjWG93g8w5ngf8g_p3TVmr48yZ14UZEZv0/edit?usp=sharing"
              target="_blank"
              rel="noopener"
            >
              {" "}
              Getting started
            </a>
          </p>
          <p>
            {" "}
            <a
              href="https://app.diagrams.net/#G1PXjM92jYw7LrGjWYR28wqANfL0ht35_t"
              target="_blank"
              rel="noopener"
            >
              {" "}
              Designs
            </a>
          </p>
          <p>
            <a
              href="https://trello.com/invite/b/7rYynpzQ/ATTI393b210fb750ea2723160ca1d4e1d27fF10B7662/awa-s2"
              target="_blank"
              rel="noopener"
            >
              {" "}
              Trello Board
            </a>
          </p>
        </Col>
        <Col>
          <h5 style={{ paddingBottom: "20px" }}>Community</h5>
          <p>
            <a
              href="https://discord.gg/hnJJrZpb"
              target="_blank"
              rel="noopener"
            >
              {" "}
              Discord
            </a>
          </p>
        </Col>
        <Col>
          <h5 style={{ paddingBottom: "20px" }}>More</h5>
          <p>
            <a
              href="https://github.com/NaveenDK/asquad-backend"
              target="_blank"
              rel="noopener"
            >
              {" "}
              Front End Repo
            </a>
          </p>
          <p>
            <a
              href="https://github.com/NaveenDK/asquad-frontend"
              target="_blank"
              rel="noopener"
            >
              {" "}
              Backend Repo
            </a>
          </p>
        </Col>
      </Row>
      <Row>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "0px",
            color: "white",
          }}
        >
          {" "}
        </p>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white",
            fontSize: "13px",
            paddingTop: "0px",
            marginTop: "0",
          }}
        >
          {" "}
          Copyright © 2023 Asquad - Accountability made easy
        </p>
      </Row>
    </>
  );
};

export default FooterLanding;
