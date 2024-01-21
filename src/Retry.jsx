/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Btnbar } from "./Btnbar";
const menucss = css`
  position: absolute;

  margin: auto auto;
  width: min(80vw, 450px);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--white);
  background: var(--primary);
  padding: 0.8rem;
  border-radius: 10px;
  border: 3px solid var(--white);
  filter: drop-shadow(5px 5px 7px #424242);
  > h2,
  h3,
  p {
    padding: 0;
    margin: 0;
  }
  > p {
    width: 80%;
  }
`;

const scorediv = css`
  display: grid;
  grid-template-columns: auto auto;
  gap: 0.5rem 2rem;
  > * {
    text-align: start;
  }
`;

function Retry({ score, hiscore, newGame }) {
  return (
    <div css={[menucss]}>
      <h2>Try Again?</h2>
      <div css={scorediv}>
        <h3>Score:</h3>
        <h3>{score}</h3>
        <h3>High Score:</h3>
        <h3>{hiscore}</h3>
      </div>

      <Btnbar newGame={newGame}></Btnbar>
    </div>
  );
}

export { Retry };
