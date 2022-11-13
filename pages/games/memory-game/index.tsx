import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import Button from "components/Button";
import Card from "components/Card";
import Layout from "components/Layout";
import Popup from "components/Popup";

import styles from "./MemoryGame.module.scss";

import { generateCards } from "config/helpers";
import { filters } from "config/arrays";

import { CardType } from "types";

const getCard = generateCards(20);

const getSpaceForCard = (count: number) => {
  switch (true) {
    case count < 10:
      return 5;
    case count < 15:
      return 6;
    case count < 20:
      return 7;
    case count < 25:
      return 8;
    default:
      return 5;
  }
};

const formatter = Intl.NumberFormat("ru", {
  style: "unit",
  unit: "second",
  unitDisplay: "long",
});

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

  let closedCardRef = useRef<Array<string>>([]);

  closedCardRef.current = closedCards;

  useEffect(() => {
    let timer: NodeJS.Timer;
    setTime(0);
    setTryCount(0);
    setClosedCards([]);
    setActiveCards([]);

    if (isStart) {
      timer = setInterval(() => {
        if (closedCardRef.current.length !== Number(inputPair)) {
          setTime((prev) => prev + 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer as NodeJS.Timer);

    //  eslint-disable-next-line react-hooks/exhaustive-deps
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
    setTime(0);
    setTryCount(0);
    setCheckedCard({} as CardType);
  };

  const handleClickBack = () => {
    setIsStart(false);
    setCards(getCard);
  };

  const handleClickRestart = () => {
    handleClickStart();
  };

  const handleClickOnCard = React.useCallback(
    (index: number) => {
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
    },
    [isStart, activeCards, cards, checkedCard.url, checkedCard.id, closedCards]
  );

  const handleChangeInputPair = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPair(e.target.value);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClickStart();
    }
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
                  autoFocus
                  onKeyDown={handleEnterPress}
                  value={inputPair}
                  placeholder="Введите количество пар..."
                  onChange={handleChangeInputPair}
                />
                <Button
                  text="Старт"
                  backgroundColor="#00c35a"
                  onClick={handleClickStart}
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
          style={{
            gridTemplateColumns: `repeat(${
              isStart ? getSpaceForCard(Number(inputPair)) : 8
            }, 150px)`,
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={index}
              url={card.url}
              id={card.id}
              index={index}
              active={
                activeCards.includes(index) || closedCards.includes(card.url)
              }
              onClick={handleClickOnCard}
            />
          ))}
        </div>
        <Popup active={closedCards.length === Number(inputPair) && isStart}>
          <div className={styles.popupMain}>
            <div className={styles.title}>
              <h1>Поздравляю ты открыл все карточки🔥😊</h1>
              <p>
                Ты выиграл в игре <span>«Игра на память»</span>
              </p>
            </div>
            <div className={styles.desc}>
              <p>
                Твоё время: <span>{formatter.format(time)}</span>
              </p>
              <p>
                Количество неправильных попыток: <span>{tryCount}</span>
              </p>
            </div>
          </div>
        </Popup>
      </div>
    </Layout>
  );
};

export default MemoryGame;
