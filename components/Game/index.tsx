import React, { FC } from "react";
import { usePathname } from "next/navigation";

import Button from "components/Button";
import { games } from "components/Layout/utils";

import styles from "styles/LayoutGame.module.scss";

const Game: FC = () => {
  const pathname = usePathname();
  const currentPath = "/" + pathname?.split("/").at(-1);

  return (
    <div className={styles.games}>
      {games.map((game) => (
        <Button
          key={game.id}
          text={game.name}
          active={currentPath === game.url}
          href={`/games${game.url}`}
        />
      ))}
    </div>
  );
};

export default Game;
