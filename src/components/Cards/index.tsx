import React, { FC } from "react";

import Card from "src/components/Card";

import styles from "src/styles/Cards.module.scss";

import { CardType } from "src/types";

interface CardsProps {
  isStart: boolean;
  handleClickOnCard: (index: number) => void;
  inputPair: string;
  cards: CardType[];
  activeCards: Array<number>;
  closedCards: Array<string>;
  isAnimated: boolean;
}

const getSpaceForCard = (count: number) => {
  switch (true) {
    case count < 10:
      return 5;
    case count < 15:
      return 6;
    case count < 20:
      return 7;
    case count < 28:
      return 8;
    default:
      return 7;
  }
};

const Cards: FC<CardsProps> = ({
  isStart,
  handleClickOnCard,
  inputPair,
  cards,
  activeCards,
  closedCards,
  isAnimated,
}) => (
  <div
    className={isAnimated ? styles.cards : styles.none}
    style={{
      gridTemplateColumns: `repeat(${
        (isStart && getSpaceForCard(Number(inputPair))) || 8
      }, 150px)`,
    }}
  >
    {cards.map((card, index) => (
      <Card
        key={index}
        url={card.url}
        id={card.id}
        index={index}
        active={activeCards.includes(index) || closedCards.includes(card.url)}
        onClick={handleClickOnCard}
      />
    ))}
  </div>
);

export default Cards;
