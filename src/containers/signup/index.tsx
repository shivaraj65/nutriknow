import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./signup.module.css";

import userCreds from "@/store/userCreds";
import { useShallow } from "zustand/react/shallow";

import { Button, Row, Col, Input, message } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  CloseOutlined,
} from "@ant-design/icons";

const SignupContainer = () => {
  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const [credentials, setCredentials] = userCreds(
    useShallow((state) => [state.credentials, state.setCredentials])
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    console.log("submit action");
    console.log(name, email, password);
    setLoading(true);
    //api call
    if (name !== "" && isValidEmail(email) && isValidPassword(password)) {
      let body = {
        name: name,
        email: email,
        password: password,
      };
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": " application/json; charset=utf-8",
        },
        body: JSON.stringify(body),
      };
      const response = await fetch("/api/signup", requestOptions);
      const resWithoutStreaming = await new Response(response.body).text();
      const result = await JSON.parse(resWithoutStreaming);
      console.log(result);
      //save the res to zustand.
      if(result.status === 'userExist'){
        //notify here
        messageApi.open({
          type: "warning",
          content: "User Already Exist!",
        });
        setName("");
        setEmail("");
        setPassword("");
      }else{
        // setCredentials(result)
        router.push("/")
      }
      
    } else {
      if (name === "") {
        messageApi.open({
          type: "warning",
          content: "Name field cannot be empty",
        });
      } else if (!isValidEmail(email)) {
        messageApi.open({
          type: "warning",
          content: "entered EMAIL is not valid",
        });
      } else if (!isValidPassword(password)) {
        messageApi.open({
          type: "warning",
          content: "Password must be atleast 8 characters",
        });
      }
    }
    setLoading(false);
  };

  function isValidEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password: string) {
    const regex =  /^.{8,}$/;
    return regex.test(password);
  }

  return (
    <div>
      {contextHolder}
      <div className={styles.closeFloater} onClick={() => router.push("/")}>
        <CloseOutlined />
      </div>
      <Row className={styles.signupRow}>
        <Col span={16} className={styles.signupImage}></Col>
        <Col span={8} className={styles.signupCardOuter}>
          <div className={styles.signupCard}>
            <h5 className={styles.signupTitle}>Signup</h5>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              disabled ={loading}
              className={styles.inputStyles}
              size="large"
              placeholder="User name"
              prefix={<UserOutlined />}
            />
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
               disabled ={loading}
              className={styles.inputStyles}
              size="large"
              placeholder="Email ID"
              // prefix={<UserOutlined />}
            />
            <Input.Password
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              disabled ={loading}
              className={styles.inputStyles}
              size="large"
              placeholder="password"
            />
            <Button
              size="large"
              block
              disabled ={loading}
              className={styles.signupButton}
              onClick={() => {
                submit();
              }}
            >
              Create Account
            </Button>
            <p className={styles.signupLink}>
              already have an Account! <Link href="/login">Login</Link>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignupContainer;
