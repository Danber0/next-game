import React, { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Layout from "components/Layout";
import Button from "components/Button";

import { games } from "../Layout/utils";

import styles from "styles/LayoutGame.module.scss";

interface LayoutGameProps {
  children: React.ReactNode;
}

const LayoutGame: FC<LayoutGameProps> = ({ children }) => {
  const pathname = usePathname();
  const currentPath = "/" + pathname?.split("/").at(-1);

  return (
    <Layout>
      <div className={styles.games}>
        {games.map((game) => (
          <Link href={"/games" + game.url} key={game.id}>
            <Button text={game.name} active={currentPath === game.url} />
          </Link>
        ))}
      </div>
      {children}
    </Layout>
  );
};

export default LayoutGame;
