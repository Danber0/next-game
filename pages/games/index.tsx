import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import MemoryGame from "./memory-game";
import Layout from "components/Layout";
import Game from "../../components/Game";

const Games = () => {
  const pathname = usePathname();
  const router = useRouter();

  //react-hooks/exhaustive-deps
  useEffect(() => {
    router.push("games/memory-game");
  }, [router]);

  return (
    <Layout>
      <Game />
      {pathname === "/memory-game" && <MemoryGame />}
    </Layout>
  );
};

export default Games;
