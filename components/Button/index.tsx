import React, { FC } from "react";
import Link from "next/link";

import styles from "styles/Button.module.scss";
import classNames from "classnames/bind";

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
  disabled?: boolean;
  padding?: boolean;
}

const cx = classNames.bind(styles);

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
  disabled,
  padding,
}) => {
  return (
    <React.Fragment>
      {type === "button" ? (
        <button
          title={title}
          disabled={disabled}
          className={cx({
            button: true,
            active: active,
            disabled: disabled,
            padding: padding,
          })}
          onClick={onClick}
          style={{ color, backgroundColor }}
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
