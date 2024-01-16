/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

const cardBtnCss = css`
  border-radius: 0;
  border: none;
  padding: 0;
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

const artcss = css`
  width: min(20vw, 200px);
  aspect-ratio: 1.4 / 1;
  object-fit: cover;
  @media (orientation: portrait) {
    width: 140px;
  }
  @media (orientation: portrait) and (min-width: 600px) {
    width: 200px;
  }
  @media (orientation: landscape) {
    max-width: 18vw;
  }
  @media (orientation: portrait) and (max-width: 500px) {
    width: min(200px, 40vw);
  }
`;

function Carousel({ data, deck, handleChooseCard }) {
  const [load, setload] = useState(0);
  const onload = () => {
    setload(load + 1);
  };
  const content = deck.map((n) => {
    return (
      <button
        key={data[n].oracle_id}
        onClick={handleChooseCard}
        data-index={n}
        css={cardBtnCss}
      >
        <img
          onLoad={onload}
          src={data[n].image_uris.art_crop}
          alt={data[n].name}
          data-index={n}
          css={artcss}
        ></img>
      </button>
    );
  });
  return <div css={cardContainer}>{content}</div>;
}

export { Carousel };
