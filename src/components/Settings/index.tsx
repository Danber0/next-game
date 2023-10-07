import React, { FC, useState } from "react";

import Button from "src/components/Button";

import styles from "src/styles/Settings.module.scss";

import { filters } from "src/config/arrays";

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
  const [filtered, setFiltered] = useState("Food");

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
            placeholder="Enter pairs..."
            onChange={handleChangeInputPair}
          />
          <Button
            text="Start"
            backgroundColor="#00c35a"
            onClick={handleClickStart}
            padding
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
