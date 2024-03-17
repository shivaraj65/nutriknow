import React, { useState } from "react";
import styles from "./chatPage.module.css";
import Image from "next/image";
import { Card } from "antd";
import { Input, Space, Spin } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { UserOutlined } from "@ant-design/icons";

import PALM from "@/assets/icons/PALM.svg";

const { Search } = Input;

interface Props {}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const ChatPage = () => {
  const [Loading, setLoading] = useState(null);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <div className={styles.container}>
        <div className={styles.chatContainer}>
          <div className={styles.contextDiv}>
            {arr.map((data, index) => {
              return (
                <>
                  {data % 2 != 0 ? (
                    <div className={styles.userContainer} key={index}>
                      <UserOutlined className={styles.userIcon} />
                      <p className={styles.title}>data.Context</p>
                    </div>
                  ) : (
                    <div className={styles.botContainer}>
                      <Image
                        src={PALM}
                        width={25}
                        height={25}
                        alt={"icon"}
                      ></Image>
                      <p className={styles.title}>data.Context</p>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <Search
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
