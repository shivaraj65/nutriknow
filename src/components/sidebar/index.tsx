import React, { useState } from "react";
import styles from "./sidebar.module.css";
import Image from "next/image";
import { MessageOutlined, MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";
interface Props {}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const Sidebar = () => {
  return (
    <div className={styles.spaceBtwn}>
      <div>
        <div className={styles.brandContainer}>
          <h1 className={styles.brandText}>Nutri Know</h1>
        </div>
        <div className={styles.chatHistoryContainer}>
          <p className={styles.historyTitle}>chat history</p>
          <div className={styles.chatHistoryInnerContainer}>
            {arr.map((data, index) => {
              return (
                <div className={styles.historyCard} key={index}>
                  <MessageOutlined />
                  <div className={styles.textContainer}>
                    <span className={styles.historyText}>
                      long title jksbefiubweuibuoieoiwefoiehfiewh
                    </span>
                    <MoreOutlined />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>       
        <Button danger type={"text"} block className={styles.logoutButton}>Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;
