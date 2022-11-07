import React, { FC } from "react";
import Link from "next/link";
import classNames from "classnames/bind";

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
  disabled?: boolean;
  padding?: boolean;
  fontSize?: number;
  style?: any;
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
  fontSize,
  style,
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
          style={{ color, backgroundColor, fontSize, ...style }}
        >
          {href ? <Link href={href}>{text}</Link> : text}
        </button>
      ) : (
        <span
          className={active ? `${styles.active} ${styles.info}` : styles.info}
          style={{ color, backgroundColor, fontSize }}
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
