import { cards } from "./arrays";
import { CardType } from "src/types";

export const generateCards = (number: number): CardType[] => {
  let res: any = [];
  const sortedCard = cards.sort(() => Math.random() - 0.5);

  for (let i = 0; i < number * 2; i++) {
    res.push({
      id: i,
      url: i >= number ? sortedCard[i - number].url : sortedCard[i].url,
    });
  }

  return res.sort(() => Math.random() - 0.5);
};
