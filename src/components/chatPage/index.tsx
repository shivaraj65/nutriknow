"use client";

import React, { useState, useEffect } from "react";
import styles from "./chatPage.module.css";
import Image from "next/image";
import { Card } from "antd";
import { Input, Space, Spin, message } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { UserOutlined } from "@ant-design/icons";

import PALM from "@/assets/icons/PALM.svg";

import useChatData from "@/store/chatData";
import { useShallow } from "zustand/react/shallow";

const { Search } = Input;

interface Props {}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const ChatPage = () => {
 const [search, setSearch] = useState("")

  const [loader, setLoader] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const [id, setId, chatHistory, setChatHistory, chatMessage, setChatMessage] =
    useChatData(
      useShallow((state) => [
        state.id,
        state.setId,
        state.chatHistory,
        state.setChatHistory,
        state.chatMessage,
        state.setChatMessage,
      ])
    );

  useEffect(() => {
    if (id !== "new") {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify({ threadId: id }),
    };
    const response = await fetch(
      "/api/getSelectedChatMessages",
      requestOptions
    );
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    // console.log(result);
    if (result.status === "success") {
      setChatMessage(result.data);
      // console.log(result.data);
    } else {
      messageApi.open({
        type: "error",
        content: "server error! try again later.",
      });
    }
  };

  const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
    setLoader(true);
    // console.log(info?.source, value);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify({ question: value }),
    };
    const response = await fetch("/api/generateAnswer", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    // console.log(result);
    if (result.status === "success") {
      // console.log(result);
      saveQuestionAnswer(value, result.data);
      //save question and answer api...
    } else {
      messageApi.open({
        type: "error",
        content: "server error! try again later.",
      });
      setLoader(false);
    }
  };

  const saveQuestionAnswer = async (question: string, answer: string) => {
    let threadId: any = "";
    if (id === "new") {
      threadId = await createThread(question);
      setId(threadId);
      console.log("after setting to store.");
      if (threadId === false) {
        messageApi.open({
          type: "error",
          content: "server error! try again later.",
        });
        setLoader(false);
      } else {
        //save question and answer...
        const saved = await saveQuestion(question, threadId);
        if (saved) {
          const saved = await saveAnswer(answer, threadId);
          setLoader(false);
        }
      }
    } else {
      //follow up questions
      let saved = await saveQuestion(question, id);
      if (saved) {
        let saved = await saveAnswer(answer, id);
        setLoader(false);
        //clearinput
      }
    }
  };

  const saveQuestion = async (question: string, threadId: string) => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify({
        threadId: threadId,
        messageFrom: "user",
        context: question,
      }),
    };
    const response = await fetch("/api/upsertChat", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    // console.log(result);
    if (result.status === "success") {
      return true;
      //save question and answer api...
    } else {
      setLoader(false);
      return false;
    }
  };

  const saveAnswer = async (answer: string, threadId: string) => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify({
        threadId: threadId,
        messageFrom: "bot",
        context: answer,
      }),
    };
    const response = await fetch("/api/upsertChat", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    if (result.status === "success") {
      loadData();
      return true;
    } else {
      setLoader(false);
      return false;
    }
  };

  const createThread = async (threadName: string) => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify({
        threadName: threadName,
        userId: localStorage.getItem("credEmail"),
      }),
    };
    const response = await fetch("/api/createThread", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    // console.log(result);
    if (result.status === "success") {
      // console.log(result?.data?.threadId);
      return result.data.threadId;
      //save question and answer api...
    } else {
      setLoader(false);
      return false;
    }
  };

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      {/* {contextHolder} */}
      <div className={styles.container}>
        <div className={styles.chatContainer}>
          <div className={styles.contextDiv}>
            {id === "new" ? (
              //empty page... may be a doodle later
              <></>
            ) : (
              chatMessage &&
              chatMessage?.map((data: any, index: number) => {
                return (
                  <>
                    {data.messageFrom === "user" ? (
                      <div className={styles.userContainer} key={index}>
                        <UserOutlined className={styles.userIcon} />
                        <p className={styles.title}>{data.context}</p>
                      </div>
                    ) : (
                      <div className={styles.botContainer} key={index}>
                        <Image
                          src={PALM}
                          width={25}
                          height={25}
                          alt={"icon"}
                        ></Image>
                        <p className={styles.title}>{data.context}</p>
                      </div>
                    )}
                  </>
                );
              })
            )}
            {loader ? <Spin /> : null}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <Search
            // value={search}
            // onChange={(e)=>{setSearch(e.target.value)}}
            autoFocus
            size="large"
            className={styles.input}
            placeholder="input search text"
            onSearch={onSearch}
          />
        </div>
      </div>
    </Card>
  );
};

export default ChatPage;
