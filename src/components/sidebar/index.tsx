import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import Image from "next/image";
import { MessageOutlined, MoreOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useRouter } from "next/router";

import useChatData from "@/store/chatData";
import { useShallow } from "zustand/react/shallow";

interface Props {}

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const Sidebar = () => {
  const router = useRouter();
  const [data, setData] = useState(null);

  const [messageApi, contextHolder] = message.useMessage();

  const [id, setId, chatHistory, setChatHistory] = useChatData(
    useShallow((state) => [
      state.id,
      state.setId,
      state.chatHistory,
      state.setChatHistory,
    ])
  );
  // const { id, setId, chatHistory, setChatHistory } = useChatData()

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": " application/json; charset=utf-8",
      },
      body: JSON.stringify({ userId: localStorage.getItem("credEmail") }),
    };
    const response = await fetch("/api/getAllHistory", requestOptions);
    const resWithoutStreaming = await new Response(response.body).text();
    const result = await JSON.parse(resWithoutStreaming);
    // console.log(result);
    if (result.status === "success") {
      setChatHistory(result?.data);
    } else {
      messageApi.open({
        type: "error",
        content: "server error! try again later.",
      });
    }
  };

  return (
    <div className={styles.spaceBtwn}>
      {/* {contextHolder} */}
      <div>
        <div className={styles.brandContainer}>
          <h1 className={styles.brandText}>Nutri Know</h1>
        </div>
        <div className={styles.chatHistoryContainer}>
          <p className={styles.historyTitle}>
            chat history{" "}
            <EditOutlined
              onClick={() => {
                setId("new");
                // console.log("set id called");
              }}
              className={styles.newChatIcon}
            />
          </p>
          <div className={styles.chatHistoryInnerContainer}>
            {chatHistory &&
              chatHistory?.map((data: any, index: number) => {
                // console.log(chatHistory);
                return (
                  <div
                    className={
                      data?.threadId === id
                        ? styles.historyCardSelected
                        : styles.historyCard
                    }
                    key={index}
                    onClick={() => {
                      setId(data.threadId);
                    }}
                  >
                    <MessageOutlined />
                    <div className={styles.textContainer}>
                      <span className={styles.historyText}>
                        <span className={styles.historyTextInner}>
                          {data.threadName}
                        </span>
                      </span>
                      {/* {data?.threadId === id ? <MoreOutlined className={styles.moreButton} /> : null} */}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <Button
          danger
          type={"text"}
          block
          className={styles.logoutButton}
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
