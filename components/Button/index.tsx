import React, { FC } from "react";

import styles from "styles/Button.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
  text: string;
  type?: "button" | "info";
  active?: boolean;
  color?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  text,
  type = "button",
  active,
  onClick,
  color,
  backgroundColor,
}) => {
  return (
    <React.Fragment>
      {type === "button" ? (
        <button
          className={
            active ? `${styles.active} ${styles.button}` : styles.button
          }
          onClick={onClick}
          style={{ color, backgroundColor }}
        >
          {text}
        </button>
      ) : (
        <span
          className={active ? `${styles.active} ${styles.info}` : styles.info}
          style={{ color, backgroundColor }}
        >
          {text} {children}
        </span>
      )}
    </React.Fragment>
  );
};

export default Button;
