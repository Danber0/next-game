import Divider from "components/Divider";

import styles from "styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Divider />
      <div className={styles.contact}>
        <span>
          Site by &nbsp;
          <a
            href="https://career.habr.com/danber"
            target="_blank"
            rel="noreferrer"
          >
            Danber
          </a>
        </span>
        <span>
          Telegram: &nbsp;
          <a href="https://t.me/danberl" target="_blank" rel="noreferrer">
            @Danberl
          </a>
        </span>
        <span>
          Email: &nbsp;
          <a
            href="mailto:bergauzen.danil@mail.ru"
            target="_blank"
            rel="noreferrer"
          >
            bergauzen.danil@mail.ru
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
