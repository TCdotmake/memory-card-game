/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Card } from "./Card";
import backImg from "./img/back.jpg";
import { useEffect, useState } from "react";
const cardBtnCss = css`
  border-radius: 0;
  border: none;
  padding: 0;
  filter: drop-shadow(5px 5px 7px #424242);
  background: transparent;
`;

const cardContainer = css`
  width: 100vw;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: min(2vw, 1rem);
  background: var(--transbg);
  margin-top: 2vh;
  padding: 3vh 0;
  @media (orientation: landscape) {
    display: grid;
    grid-template-columns: repeat(5, auto);
  }
  @media (orientation: portrait) and (max-width: 500px) {
    display: grid;
    grid-template-columns: repeat(2, auto);
  }
`;

function Carousel({ active, data, deck, handleChooseCard }) {
  let backs = [];
  for (let i = 0; i < deck.length; i++) {
    backs.push(`back${i}`);
  }
  backs = backs.map((n) => {
    return <Card key={n} src={backImg} alt="Reverse Artwork"></Card>;
  });
  const cards = deck.map((n) => {
    return (
      <button
        key={data[n].oracle_id}
        onClick={handleChooseCard}
        data-index={n}
        css={cardBtnCss}
      >
        <Card
          src={data[n].image_uris.art_crop}
          alt={data[n].name}
          index={n}
        ></Card>
      </button>
    );
  });
  const [hidden, sethidden] = useState(true);
  const showCard = () => {
    setTimeout(() => {
      sethidden(false);
    }, 700);
  };
  useEffect(showCard, []);
  useEffect(() => {
    sethidden(true);
    showCard();
  }, [deck]);
  return <div css={cardContainer}>{(hidden && backs) || cards}</div>;
}

export { Carousel };
