import { FC } from "react";
import Image from "next/legacy/image";

import Layout from "src/components/Layout";
import Button from "src/components/Button";
import Footer from "src/components/Footer";

import styles from "src/styles/Home.module.scss";

const Home: FC = () => {
  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.text}>
            I welcome you to a website with a collection of games to train your
             <span>brain</span> and more!
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
            text="Play"
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
