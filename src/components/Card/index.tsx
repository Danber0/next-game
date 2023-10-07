import React, { FC } from "react";
import Image from "next/legacy/image";

import styles from "src/styles/Card.module.scss";

interface CardProps {
  url: string;
  id: number;
  active?: boolean;
  onClick: (index: number) => void;
  index: number;
}

const Card: FC<CardProps> = ({ url, active, onClick, index }) => {
  return (
    <div
      className={active ? `${styles.active} ${styles.card}` : styles.card}
      onClick={() => onClick(index)}
    >
      <div className={styles.flipCard}>
        <div className={styles.back}>
          <Image
            src={url}
            alt="Picture"
            width={150}
            height={150}
            className={styles.image}
          />
        </div>
        <div className={styles.front}>?</div>
      </div>
    </div>
  );
};

export default React.memo(Card);
