import React, { FC } from "react";
import Image from "next/legacy/image";

import styles from "styles/Card.module.scss";

interface CardProps {
  url: string;
  id: number;
  active?: boolean;
  onClick: () => void;
}

const Card: FC<CardProps> = ({ url, active, onClick }) => {
  return (
    <div
      className={active ? `${styles.active} ${styles.card}` : styles.card}
      onClick={onClick}
    >
      <div className={styles.flipCard}>
        <div className={styles.back}>
          <Image
            src={url}
            alt="Картинка"
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

export default Card;
