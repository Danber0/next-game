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
    <div className={styles.card} onClick={onClick}>
      {active ? (
        <div className={styles.front}>
          <Image
            src={url}
            alt="Картинка"
            width={150}
            height={150}
            className={styles.image}
          />
        </div>
      ) : (
        <div className={styles.back}>?</div>
      )}
    </div>
  );
};

export default Card;
