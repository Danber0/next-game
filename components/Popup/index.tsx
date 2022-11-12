import React, { FC, RefObject, useRef } from "react";

import styles from "styles/Popup.module.scss";

interface PopupType {
  children: React.ReactNode;
  active?: boolean;
}

const Popup: FC<PopupType> = ({ children, active }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickPopup = (event: any) => {
    if (!overlayRef?.current) return;

    if (!overlayRef.current.children[0].contains(event.target)) {
      overlayRef.current.classList.remove(styles.active);
    }
  };

  return (
    <div
      className={`${
        active ? `${styles.active} ${styles.overlay}` : styles.overlay
      }`}
      ref={overlayRef}
      onDoubleClick={handleClickPopup}
    >
      <div className={styles.popup}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
