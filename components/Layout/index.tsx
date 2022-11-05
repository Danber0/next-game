import React, { FC } from "react";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Divider from "components/Divider";

import "react-toastify/dist/ReactToastify.css";
import styles from "styles/Layout.module.scss";

interface Layout {
  children: React.ReactNode;
}

const Layout: FC<Layout> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="/" className={pathname === "/" ? styles.active : ""}>
              Главная
            </Link>
          </li>
          <li>
            <Link
              href="/games"
              className={pathname?.includes("/games") ? styles.active : ""}
            >
              Игры
            </Link>
          </li>
          <li>
            <Link
              href="/support"
              className={pathname === "/support" ? styles.active : ""}
            >
              Поддержка
            </Link>
          </li>
        </ul>
      </nav>
      <Divider />
      <ToastContainer position="top-left" theme="dark" />
      {children}
    </div>
  );
};

export default Layout;
