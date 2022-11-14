import React, { FC, useState } from "react";

import Button from "components/Button";

import styles from "styles/Settings.module.scss";

import { filters } from "config/arrays";

interface SettingsProps {
  handleEnterPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleChangeInputPair: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickStart: () => void;
  inputPair: string;
  active: boolean;
}

const Settings: FC<SettingsProps> = ({
  handleEnterPress,
  handleClickStart,
  inputPair,
  handleChangeInputPair,
  active,
}) => {
  const [filtered, setFiltered] = useState("Еда");

  return (
    <div className={active ? styles.settings : styles.none}>
      <div className={styles.settingsInner}>
        <div className={styles.filter}>
          {filters.map((filter) => (
            <Button
              key={filter.id}
              text={filter.name}
              active={filter.name === filtered}
              onClick={() => setFiltered(filter.name)}
              disabled={filter.name !== filtered}
            />
          ))}
        </div>
        <div className={styles.start}>
          <input
            autoFocus
            onKeyDown={handleEnterPress}
            value={inputPair}
            placeholder="Введите количество пар..."
            onChange={handleChangeInputPair}
          />
          <Button
            text="Старт"
            backgroundColor="#00c35a"
            onClick={handleClickStart}
            padding
            title="В этой игре тебе нужно открывать карточки, и искать пару к карточкам. Всего у карточки может быть 1 пара.Снизу ты можешь настроить, какие карточки ты хочешь искать, и сколько пар у тебя будет. Удачи!"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
