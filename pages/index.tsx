import { FC } from "react";
import Image from "next/legacy/image";

import Layout from "components/Layout";
import Button from "components/Button";
import Footer from "components/Footer";

import styles from "styles/Home.module.scss";

const Home: FC = () => {
  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.text}>
            Приветствую тебя на сайте со сборником разных игры для тренировки
            твоего <span>мозга</span> и не только.
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
            href="games"
          />
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default Home;
