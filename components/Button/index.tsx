import React, { FC } from "react";
import Link from "next/link";

import styles from "styles/Button.module.scss";

interface ButtonProps {
  children?: React.ReactNode;
  text: string;
  type?: "button" | "info";
  active?: boolean;
  color?: string;
  backgroundColor?: string;
  onClick?: () => void;
  href?: string;
  title?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  text,
  type = "button",
  active,
  onClick,
  color,
  backgroundColor,
  href,
  title,
}) => {
  return (
    <React.Fragment>
      {type === "button" ? (
        <button
          title={title}
          className={
            active ? `${styles.active} ${styles.button}` : styles.button
          }
          onClick={onClick}
          style={{ color, backgroundColor, cursor: !href ? "pointer" : "auto" }}
        >
          {href ? <Link href={href}>{text}</Link> : text}
        </button>
      ) : (
        <span
          className={active ? `${styles.active} ${styles.info}` : styles.info}
          style={{ color, backgroundColor }}
        >
          <span>
            {text} {children}
          </span>
        </span>
      )}
    </React.Fragment>
  );
};

export default Button;
