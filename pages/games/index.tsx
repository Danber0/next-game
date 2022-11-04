import React from "react";
import { usePathname } from "next/navigation";

import MemoryGame from "./memory-game";
import LayoutGame from "components/LayoutGame";

const Games = () => {
  const pathname = usePathname();

  return (
    <LayoutGame>{pathname === "/memory-game" && <MemoryGame />}</LayoutGame>
  );
};

export default Games;
