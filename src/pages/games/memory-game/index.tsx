import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import Cards from "src/components/Cards";
import Layout from "src/components/Layout";
import Popup from "src/components/Popup";
import Settings from "src/components/Settings";
import Info from "src/components/Info";

import styles from "./MemoryGame.module.scss";

import { generateCards } from "src/config/helpers";

import { CardType } from "src/types";

const getCard = generateCards(20);

const formatter = Intl.NumberFormat("en", {
  style: "unit",
  unit: "second",
  unitDisplay: "long",
});

const MemoryGame = () => {
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
      return toast("Input couples.", {
        autoClose: 1000,
        pauseOnHover: false,
      });
    }
    if (isNaN(Number(inputPair))) {
      return toast("Only numbers", {
        autoClose: 1000,
        pauseOnHover: false,
      });
    }
    if (Number(inputPair) < 7 || Number(inputPair) > 27) {
      return toast(`Number between from 7 to 27. Your input is ${inputPair}`, {
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
      if (!isStart) {
        return;
      }

      if (activeCards.length !== 2 && activeCards[0] !== index) {
        setActiveCards([...activeCards, index]);
        setCheckedCard({ url: cards[index].url, id: cards[index].id });

        if (
          activeCards[0] !== activeCards[1] &&
          checkedCard.url !== cards[index].url
        ) {
          setTryCount((prev) => prev + 1);
        }

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
      <Settings
        handleChangeInputPair={handleChangeInputPair}
        handleClickStart={handleClickStart}
        handleEnterPress={handleEnterPress}
        inputPair={inputPair}
        active={!isStart}
      />
      <Info
        handleClickBack={handleClickBack}
        handleClickRestart={handleClickRestart}
        tryCount={tryCount}
        time={time}
        active={isStart}
      />
      <Cards
        isStart={isStart}
        handleClickOnCard={handleClickOnCard}
        inputPair={inputPair}
        activeCards={activeCards}
        closedCards={closedCards}
        isAnimated={isStart}
        cards={cards}
      />
      <Popup active={closedCards.length === Number(inputPair) && isStart}>
        <div className={styles.popupMain}>
          <div className={styles.title}>
            <h1>Congratulations you won!🔥😊</h1>
            <p>
              Your won in the <span>«Memory Game»</span>
            </p>
          </div>
          <div className={styles.desc}>
            <p>
              Your time is: <span>{formatter.format(time)}</span>
            </p>
            <p>
              Wrong tries: <span>{tryCount}</span>
            </p>
          </div>
        </div>
      </Popup>
    </Layout>
  );
};

export default MemoryGame;
