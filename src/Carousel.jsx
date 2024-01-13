/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const cardBtnCss = css`
  border-radius: 0;
  border: none;
  padding: 0;
`;

const cardContainer = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.3);
  padding: 1rem 0;
`;

const artcss = css`
  width: 140px;
  aspect-ratio: 1.4 / 1;
  object-fit: cover;
`;

function Carousel({ data, deck, handleChooseCard }) {
  const content = deck.map((n) => {
    return (
      <button
        key={data[n].oracle_id}
        onClick={handleChooseCard}
        data-index={n}
        css={cardBtnCss}
      >
        <img
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
