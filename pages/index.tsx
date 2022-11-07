import { FC } from "react";
import Image from "next/legacy/image";

import Layout from "components/Layout";
import Button from "components/Button";
import Divider from "components/Divider";

import styles from "styles/Home.module.scss";

const Home: FC = () => {
  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.text}>
            Приветствую тебя на сайте со сборником разных игры для тренировка
            твоего <span>мозга</span> и не только
          </div>
          <div className={styles.image}>
            <Image
              src="/images/main.svg"
              alt="main picture"
              width={500}
              height={500}
              layout="fixed"
            />
          </div>
          <Button
            text="Играть"
            padding
            backgroundColor="#00c35a"
            fontSize={45}
            href="games/memory-game"
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <Divider />
        <div className={styles.contact}>
          <span>
            Site by &nbsp;
            <a href="https://career.habr.com/danber" target="_blank">
              Danber
            </a>
          </span>
          <span>
            Telegram: &nbsp;
            <a href="https://t.me/danberl" target="_blank">
              @Danber
            </a>
          </span>
          <span>
            Email: &nbsp;
            <a href="mailto:bergauzen.danil@mail.ru" target="_blank">
              bergauzen.danil@mail.ru
            </a>
          </span>
        </div>
      </footer>
    </Layout>
  );
};

export default Home;
