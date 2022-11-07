import React, { FC } from "react";

import Layout from "components/Layout";
import Game from "components/Game";
import Footer from "components/Footer";

const Games: FC = () => {
  return (
    <Layout>
      <Game />
      <Footer />
    </Layout>
  );
};

export default Games;
