import React, { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      {children}
    </div>
  );
};

export default Layout;
