import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "styles/Header.module.scss";

const Header = () => {
  const pathname = usePathname();

  return (
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
  );
};

export default memo(Header);
