import React, { FC, useState } from "react";
import { usePathname } from "next/navigation";

import Button from "src/components/Button";
import ActiveGame from "src/components/ActiveGame";

import { games } from "src/components/Layout/utils";

import styles from "src/styles/LayoutGame.module.scss";

const Game: FC = () => {
  const pathname = usePathname();
  const [activeGame, setActiveGame] = useState(games[0]);

  return (
    <div className={styles.games}>
      {games.map((game) => (
        <React.Fragment key={game.id}>
          <Button
            text={game.name}
            active={activeGame.id === game.id}
            onClick={() => setActiveGame(game)}
            disabled={!game.text}
          />
        </React.Fragment>
      ))}
      {games.map(
        (game) =>
          activeGame.id === game.id &&
          pathname === "/games" && (
            <ActiveGame
              key={game.id}
              path={activeGame.url}
              pathToImage={activeGame.pathToImage}
              text={activeGame.text}
            />
          )
      )}
    </div>
  );
};

export default Game;
