import React, { FC } from "react";

import styles from "styles/Devider.module.scss";

interface DividerProps {
  padding?: string;
}

const Divider: FC<DividerProps> = ({ padding }) => {
  return <div className={styles.divider} style={{ padding }} />;
};

export default Divider;
