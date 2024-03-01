import React, { useState } from "react";
import styles from "./tabs.module.css";
import Image from "next/image";

interface Props {
  items: any;
  theme: String;
  selected: String;
  onChangeSelected: Function;
}

const Tabs: React.FC<Props> = (props) => {
  return (
    <div className={styles.tabsContainer}>
      {props.items.map((item: any) => {
        return (
          <div
          key={item}
            className={
              props.selected === item.text
                ? styles.tabButtonSelected
                : styles.tabButton
            }
            onClick={() => {
              props.onChangeSelected(item.text);
            }}
          >
            <Image src={item.icon} width={20} height={20} alt={"icon"}></Image>
            <span
              className={
                props.selected === item.text
                  ? styles.selectedText
                  : props.theme === "light"
                  ? styles.textLight
                  : styles.textDark
              }
            >
              &nbsp;&nbsp;{item.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;