import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./dashboard.module.css";

import ChatPage from "@/components/chatPage";
import userCreds from "@/store/userCreds";
import { useShallow } from "zustand/react/shallow";

import Sidebar from "@/components/sidebar";

import {
  Button,
  Row,
  Col,
  Input,
  message,
  Layout,
  Divider,
  Popover,
} from "antd";
import {
  CompassOutlined,
  FolderOpenOutlined,
  ControlOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const router = useRouter();

  const [credName, setCredName] = useState("");

  const checkCredIdInLocalStorage = () => {
    return localStorage.getItem("credId");
  };

  const checkCredNameInLocalStorage = () => {
    return localStorage.getItem("credName");
  };

  useEffect(() => {
    if (!checkCredIdInLocalStorage()) {
      router.push("/");
    } else {
      let data: any = checkCredNameInLocalStorage()
        ? checkCredNameInLocalStorage()
        : "";
      setCredName(data);
    }
  }, [checkCredIdInLocalStorage]);

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className={styles.dashContainer}>
      <Row style={{ height: "100%", width: "100%" }}>
        <Col span={5} className={styles.sidebarContainer}>
          <Sidebar />
        </Col>
        <Col span={19}>
          <ChatPage />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
