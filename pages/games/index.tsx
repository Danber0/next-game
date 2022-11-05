import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import MemoryGame from "./memory-game";
import Layout from "components/Layout";
import Game from "../../components/Game";

const Games = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    router.push("games/memory-game");
  }, []);

  return (
    <Layout>
      <Game />
      {pathname === "/memory-game" && <MemoryGame />}
    </Layout>
  );
};

export default Games;
