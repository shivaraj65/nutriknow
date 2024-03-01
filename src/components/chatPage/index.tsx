import React, { useState } from "react";
import styles from "./tabs.module.css";
import Image from "next/image";

interface Props {
 id:any;
}

const Tabs: React.FC<Props> = (props) => {
  return (
    <div className={styles.tabsContainer}>
        hello chatpage
    </div>
  );
};

export default Tabs;