import React, { FC } from "react";
import Image from "next/legacy/image";

import Button from "src/components/Button";

import styles from "src/styles/ActiveGame.module.scss";

interface ActiveGameProps {
  path: string;
  text: string;
  pathToImage: string;
}

const ActiveGame: FC<ActiveGameProps> = ({ path, text, pathToImage }) => {
  return (
    <React.Fragment>
      {pathToImage && (
        <div className={styles.content}>
          <div className={styles.activeGame}>
            <div className={styles.text}>{text}</div>
            <div className={styles.image}>
              <Image
                src={pathToImage}
                alt="memory"
                width={500}
                height={373}
                layout="fixed"
              />
            </div>
          </div>
          <Button
            text="Play"
            padding
            backgroundColor="#00c35a"
            fontSize={45}
            style={{ position: "absolute", bottom: 0 }}
            href={path}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default ActiveGame;
