/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const btndiv = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  > * {
    background: var(--white);
    color: var(--primary);
    padding: 0.6em 1.2em;
    border-radius: 8px;
    border: 1px solid transparent;
  }
`;

function Btnbar({ newGame }) {
  return (
    <div css={btndiv}>
      <a target="_blank" href="https://github.com/TCdotmake/memory-card-game">
        GitHub
      </a>
      <button onClick={newGame}>New Game</button>
    </div>
  );
}

export { Btnbar };
