import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FooterLanding from "./FooterLanding";

const LandingPage = () => {
  return (
    <>
      <Container className="section-one">
        <Container>
          <Row>
            <Col>
              <div
                className="first-section pt-5"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <h1> ASQUAD </h1>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p>Accountability made easy ! </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p style={{ maxWidth: "600px", textAlign: "center" }}>
                  Easily create and discover accountability groups, and
                  together, reach your goals faster. Join us today and start
                  achieving your dreams with Asquad.
                </p>
              </div>

              <Row>
                <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="dark">Contribute </Button>
                </Col>
                <Col>
                  <Button variant="dark">Sign Up</Button>
                </Col>
              </Row>
              <Row>
                <p
                  style={{
                    paddingTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Current Version : V1.1
                </p>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container>
        <Container>
          <Row className="pb-5">
            <h2
              className="pt-5"
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "800",
              }}
            >
              {" "}
              How it works?{" "}
            </h2>
            <Row>
              <Col className="pt-5">
                <iframe
                  width="100%"
                  height="300"
                  src="https://www.youtube.com/embed/WxboAmyt-f4"
                  title="Asquad Intro &amp; how you can contribute (4th Oct) - MERN stack"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </Col>
              <Col
                className="pt-5"
                style={{
                  display: "flex",
                }}
              >
                <div className="lists pt-3">
                  <ul className="no-bullets">
                    <li>✅ Find groups</li>
                    <li>✅ Create groups</li>
                    <li>✅ Create goals and cycles</li>
                    <li>✅ Review and stay accountable</li>
                  </ul>
                </div>
              </Col>
            </Row>

            <div></div>
          </Row>
        </Container>
      </Container>

      <Container className="sectionFooter2">
        <Container>
          <Row className="sectionFooter pt-5 pb-3">
            <Col>
              <h4>Unlock Your Full Potential with Asquad </h4>
              <p>
                With Asquad, you have the power to create and manage
                accountability groups effortlessly. Whether you're working on
                personal goals, professional projects, or fitness challenges,
                Asquad makes it easy to bring like-minded individuals together.
                Create your group, set your objectives, and watch your progress
                soar as you and your group members hold each other accountable.
              </p>
            </Col>

            <Col>
              <h4>Connect with a Community that Supports Your Goals </h4>
              <p>
                Finding the right accountability group is essential for your
                success. Asquad offers a robust search and discovery feature
                that allows you to connect with individuals who share your
                interests and objectives. Browse through a diverse range of
                groups, from fitness enthusiasts to budding entrepreneurs, and
                discover your ideal community. Join a group that aligns with
                your goals and embark on your journey towards success together.
              </p>
            </Col>
            <Col>
              <h4>Track, Collaborate, and Thrive</h4>
              <p>
                Asquad equips you with the tools you need to stay on track and
                reach your goals. Share progress updates, set milestones, and
                engage in collaborative discussions with your group members. The
                built-in accountability features ensure that you remain focused
                and motivated throughout your journey. Whether it's daily
                check-ins, weekly goal-setting, or sharing resources, Asquad
                empowers you to stay accountable and turn your dreams into
                reality.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className="FooterWrapper">
        <Container className="pt-5">
          <Row>
            <FooterLanding />
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default LandingPage;
