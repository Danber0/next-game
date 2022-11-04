import React, { useState } from "react";

import LayoutGame from "components/LayoutGame";
import Button from "components/Button";
import Card from "components/Card";

import styles from "./MemoryGame.module.scss";
import { CardType, generateCards } from "./helper";
import { filters } from "./utils";

const MemoryGame = () => {
  const [filtered, setFiltered] = useState("Еда");
  const [inputPair, setInputPair] = useState("10");
  const [activeCards, setActiveCards] = useState<Array<number>>([]);
  const [checkedCard, setCheckedCard] = useState<CardType>({} as CardType);
  const [closedCards, setClosedCards] = useState<Array<string>>([]);
  const [cards, setCards] = useState<Array<CardType>>([]);

  if (closedCards.length && closedCards.length === Number(inputPair)) {
    console.log("you won!");
  }

  const handleClickStart = () => {
    const getCard = generateCards(Number(inputPair));
    setCards(getCard);
    setClosedCards([]);
    setActiveCards([]);
    setCheckedCard({} as CardType);
  };

  const handleClickOnCard = (index: number) => {
    if (activeCards.length !== 2 && activeCards[0] !== index) {
      setActiveCards([...activeCards, index]);
      setCheckedCard({ url: cards[index].url, id: cards[index].id });
      if (
        checkedCard.url === cards[index].url &&
        checkedCard.id !== cards[index].id
      ) {
        setClosedCards([...closedCards, cards[index].url]);
      }
    } else {
      setActiveCards([index]);
      setCheckedCard({ url: cards[index].url, id: cards[index].id });
    }
  };

  console.log(activeCards);

  return (
    <LayoutGame>
      <p className={styles.desc}>
        В этой игре тебе нужно открывать карточки, и искать пару к карточкам.
        Всего у карточки может быть 1 пара. Снизу ты можешь настроить, какие
        карточки ты хочешь искать, и сколько пар у тебя будет. Удачи!{" "}
      </p>
      <div className={styles.filter}>
        {filters.map((filter) => (
          <Button
            key={filter.id}
            text={filter.name}
            active={filter.name === filtered}
            onClick={() => setFiltered(filter.name)}
          />
        ))}
      </div>
      <div className={styles.settings}>
        <div className={styles.start}>
          <input
            value={inputPair}
            placeholder="Введите количество пар..."
            onChange={(event) => setInputPair(event.target.value)}
          />
          <Button
            text="Старт"
            color="#fff"
            backgroundColor="#0FC5FF"
            onClick={() => handleClickStart()}
          />
        </div>
        <div className={styles.info}>
          <Button text="Количество попыток:" type="info">
            <span style={{ color: "#fff" }}>11</span>
          </Button>
          <Button text="Время:" type="info">
            <span style={{ color: "#fff" }}>34c.</span>
          </Button>
        </div>
      </div>
      <div className={styles.cards}>
        {cards.map((card, index) => (
          <Card
            key={index}
            url={card.url}
            id={card.id}
            active={
              activeCards.includes(index) || closedCards.includes(card.url)
            }
            onClick={() => handleClickOnCard(index)}
          />
        ))}
      </div>
    </LayoutGame>
  );
};

export default MemoryGame;
