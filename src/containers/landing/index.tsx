import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./landing.module.css";

import { Button, Row, Col, Card } from "antd";

const { Meta } = Card;

import Dynamic from "@/assets/images/dynamic.jpg";
import Ai from "@/assets/images/ai.jpg";
import Diversity from "@/assets/images/diversity.jpg";
import Interactive from "@/assets/images/interactive.jpg";

const Landing = () => {
  const router = useRouter();
  const [test, settest] = useState(null);

  return (
    <div>
      <div className={styles.landingBg}>
        <div className={styles.innerContainer}>
          <h1 className={styles.brandText}>Nutri Know</h1>
          <br />
          <h5 className={styles.brandPhrase}>
          Unlock the power of nutrition with NutriKnow
          </h5>
          <h5 className={styles.brandPhrase}>
          your personalized guide to a healthier you
          </h5>
          <br />
          <div className={styles.buttonContainer}>
            <button
              className={styles.button1}
              onClick={() => router.push("/signup")}
            >
              Signup
            </button>
            <button
              className={styles.button2}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>

          {/* <p className={styles.contentB}>
            A quick and easy way to build stories for{" "}
            <span className={styles.badge}>Story3.com</span>{" "}
          </p> */}
        </div>
      </div>
      <hr />
      {/* features section */}
      {/* <div className={styles.featureSection}>
        <h4 className={styles.featureHeading}>Why Epic Weaver ?</h4>
        <Row>
          <Col span={6} className={styles.colStyle}>
            <Card
              hoverable
              cover={
                <Image
                  className={styles.logo}
                  src={Dynamic}
                  alt="image"
                  height={240}
                  priority
                />
              }
            >
              <Meta
                title="Dynamic Plot Generator"
                description="Unleash endless possibilities with an AI-powered dynamic plot generator that creates unique and captivating storylines tailored to your preferences."
              />
            </Card>
          </Col>
          <Col span={6} className={styles.colStyle}>
            <Card
              hoverable
              cover={
                <Image
                  className={styles.logo}
                  src={Interactive}
                  alt="image"
                  height={240}
                  priority
                />
              }
            >
              <Meta
                title="Interactive Storytelling"
                description="Engage readers with interactive storytelling features, enabling them to make choices that influence the plot's direction, providing a personalized reading experience."
              />
            </Card>
          </Col>
          <Col span={6} className={styles.colStyle}>
            <Card
              hoverable
              cover={
                <Image
                  className={styles.logo}
                  src={Ai}
                  alt="image"
                  height={240}
                  priority
                />
              }
            >
              <Meta
                title="AI Writing Assistant"
                description=" Enhance your writing with real-time suggestions, grammar checks, and style recommendations from the AI writing assistant, ensuring polished and engaging narratives"
              />
            </Card>
          </Col>
          <Col span={6} className={styles.colStyle}>
            <Card
              hoverable
              cover={
                <Image
                  className={styles.logo}
                  src={Diversity}
                  alt="image"
                  height={240}
                  priority
                />
              }
            >
              <Meta
                title="Genre Fusion"
                description="Break traditional genre boundaries by blending and fusing different genres, allowing users to explore innovative and hybrid story experiences."
              />
            </Card>
          </Col>
        </Row>
      </div> */}
      {/* partnerships */}
      {/* <div className={styles.featureSection}>
        <h4 className={styles.featureHeading}>Collaborations</h4>

        <Row>
          <Col span={11}>
            <div className={styles.bannerSideText}>
              <p className={styles.partnershipText}>
                Epic Weaver is a AI tool crafted to work with Story3 platform
              </p>
              <p className={styles.partnershipText}>
                Created as a part ot the STORY3 hackathon conducted by
                HackerEarth.
              </p>
              <p className={styles.partnershipText}></p>
            </div>
          </Col>
          <Col span={13}>
            <div className={styles.story3banner}></div>
          </Col>
        </Row>
      </div> */}

      {/* footer */}
      <div className={styles.footerSection}>
        <p className={styles.footerMade}>made with 💖 in INDIA</p>
        <span>Copyright © Then, Now & Forever - Team NutriKnow</span>
      </div>
      {/* <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          /> */}
    </div>
  );
};

export default Landing;
