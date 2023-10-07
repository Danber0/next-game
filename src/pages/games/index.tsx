import React, { FC } from "react";

import Layout from "src/components/Layout";
import Game from "src/components/Game";
import Footer from "src/components/Footer";

const Games: FC = () => {
  return (
    <Layout>
      <Game />
      <Footer />
    </Layout>
  );
};

export default Games;
