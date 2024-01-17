/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const menucss = css`
  min-width: 275px;
  z-index: 2;
  color: white;
  background: var(--transdark);
  padding: 1.5rem;
  border-radius: 10px;
  border: 2px solid white;
`;

function Menu({ score, hiscore, newGame }) {
  return (
    <div css={menucss}>
      <h2>Memory Card Game</h2>
      <p>Score: {score}</p>
      <p>Hi-Score: {hiscore}</p>
      <button onClick={newGame}>New Game</button>
    </div>
  );
}

export { Menu };
