import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Button from "components/Button";
import Card from "components/Card";
import Layout from "components/Layout";

import styles from "./MemoryGame.module.scss";

import { generateCards } from "config/helpers";
import { filters } from "config/arrays";

import { CardType } from "types";

const getCard = generateCards(20);

const MemoryGame = () => {
  const [filtered, setFiltered] = useState("Еда");
  const [inputPair, setInputPair] = useState("");
  const [isStart, setIsStart] = useState(false);
  const [tryCount, setTryCount] = useState(0);
  const [time, setTime] = useState(0);
  const [activeCards, setActiveCards] = useState<Array<number>>([]);
  const [checkedCard, setCheckedCard] = useState<CardType>({} as CardType);
  const [closedCards, setClosedCards] = useState<Array<string>>([]);
  const [cards, setCards] = useState<Array<CardType>>(getCard);

  if (closedCards.length && closedCards.length === Number(inputPair)) {
    console.log("you won!");
  }

  useEffect(() => {
    let timer: NodeJS.Timer;
    setTime(0);
    setTryCount(0);
    setClosedCards([]);
    setActiveCards([]);

    if (isStart) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isStart]);

  const handleClickStart = () => {
    if (!inputPair) {
      return toast("Введите количество пар.", {
        autoClose: 1000,
        pauseOnHover: false,
      });
    }
    if (isNaN(Number(inputPair))) {
      return toast("Введите только число", {
        autoClose: 1000,
        pauseOnHover: false,
      });
    }
    if (Number(inputPair) < 7 || Number(inputPair) > 27) {
      return toast(`Введите число от 7 до 27. Вы ввели ${inputPair}`, {
        autoClose: 1000,
        pauseOnHover: false,
      });
    }

    const getCard = generateCards(Number(inputPair));
    setCards(getCard);
    setIsStart(true);
    setClosedCards([]);
    setActiveCards([]);
    setCheckedCard({} as CardType);
  };

  const handleClickBack = () => {
    setIsStart(false);
    setCards(getCard);
  };

  const handleClickRestart = () => {
    handleClickStart();
    setTime(0);
    setTryCount(0);
  };

  const handleClickOnCard = (index: number) => {
    // Если мы не нажали старт, то просто игнорим нажатия
    if (!isStart) {
      return;
    }

    // Этот if проверяет, если мы открыли 2 карточки то идёт проверка дальше
    if (activeCards.length !== 2 && activeCards[0] !== index) {
      setActiveCards([...activeCards, index]);
      setCheckedCard({ url: cards[index].url, id: cards[index].id });

      // Этот if отвечает за добавление попытки в стейт
      if (
        activeCards[0] !== activeCards[1] &&
        checkedCard.url !== cards[index].url
      ) {
        setTryCount((prev) => prev + 1);
      }

      // Этот if проверяет, одинаковые ли карточки мы открыли
      if (
        checkedCard.url === cards[index].url &&
        checkedCard.id !== cards[index].id
      ) {
        setClosedCards([...closedCards, cards[index].url]);
      }
    } else {
      // Иначе мы просто добавляем 1 карточку в стейт
      setActiveCards([index]);
      setCheckedCard({ url: cards[index].url, id: cards[index].id });
    }
  };

  const handleChangeInputPair = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPair(e.target.value);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={isStart ? styles.active : styles.notActive}>
          <div className={styles.settings}>
            <div className={styles.settingsInner}>
              <div className={styles.filter}>
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    text={filter.name}
                    active={filter.name === filtered}
                    onClick={() => setFiltered(filter.name)}
                    disabled={filter.name !== filtered}
                  />
                ))}
              </div>
              <div className={styles.start}>
                <input
                  value={inputPair}
                  placeholder="Введите количество пар..."
                  onChange={handleChangeInputPair}
                />
                <Button
                  text="Старт"
                  backgroundColor="#00c35a"
                  onClick={() => handleClickStart()}
                  padding
                  title="В этой игре тебе нужно открывать карточки, и искать пару к карточкам. Всего у карточки может быть 1 пара.Снизу ты можешь настроить, какие карточки ты хочешь искать, и сколько пар у тебя будет. Удачи!"
                />
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.left}>
              <Button
                text="Назад"
                backgroundColor="#00c35a"
                onClick={handleClickBack}
                padding
              />
              <Button
                text="Рестарт"
                backgroundColor="#00c35a"
                onClick={handleClickRestart}
                padding
              />
            </div>
            <div className={styles.right}>
              <Button text="Количество неправильных попыток:" type="info">
                <span style={{ color: "#00c35a" }}>{tryCount}</span>
              </Button>
              <Button text="Время:" type="info">
                <span style={{ color: "#00c35a" }}>{time}c.</span>
              </Button>
            </div>
          </div>
        </div>
        <div
          className={styles.cards}
          style={{ gridTemplateColumns: `repeat(${8}, 150px)` }}
        >
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
      </div>
    </Layout>
  );
};

export default MemoryGame;
