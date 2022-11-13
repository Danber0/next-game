import React, { FC, memo } from "react";
import { ToastContainer } from "react-toastify";

import Divider from "components/Divider";
import Header from "components/Header";

import "react-toastify/dist/ReactToastify.css";
import styles from "styles/Layout.module.scss";

interface Layout {
  children: React.ReactNode;
}

const Layout: FC<Layout> = ({ children }) => (
  <div className={styles.container}>
    <Header />
    <Divider />
    <ToastContainer position="top-left" theme="dark" />
    {children}
  </div>
);

export default Layout;
