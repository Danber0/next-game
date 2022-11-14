import React, { FC } from "react";

import Button from "components/Button";

import styles from "styles/Info.module.scss";

interface InfoProps {
  handleClickBack: () => void;
  handleClickRestart: () => void;
  tryCount: number;
  time: number;
  active: boolean;
}

const Info: FC<InfoProps> = ({
  handleClickBack,
  handleClickRestart,
  time,
  active,
  tryCount,
}) => (
  <div className={active ? styles.info : styles.none}>
    <div className={styles.left}>
      <Button
        text="Назад"
        backgroundColor="#00c35a"
        onClick={handleClickBack}
        padding
      />
      <Button
        text="Рестарт"
        backgroundColor="#00c35a"
        onClick={handleClickRestart}
        padding
      />
    </div>
    <div className={styles.right}>
      <Button text="Количество неправильных попыток:" type="info">
        <span style={{ color: "#00c35a" }}>{tryCount}</span>
      </Button>
      <Button text="Время:" type="info">
        <span style={{ color: "#00c35a" }}>{time}c.</span>
      </Button>
    </div>
  </div>
);

export default Info;
