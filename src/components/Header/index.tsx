import React, { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "src/styles/Header.module.scss";

const Header = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/" className={pathname === "/" ? styles.active : ""}>
            Main
          </Link>
        </li>
        <li>
          <Link
            href="/games"
            className={pathname?.includes("/games") ? styles.active : ""}
          >
            Games
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Header);
