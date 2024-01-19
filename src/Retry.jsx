/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { modalstyle, ngbtn } from "./modalstyle";
const menucss = css`
  position: absolute;
  top: 1rem;
  ${modalstyle}
`;

const btndiv = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const rulebtn = css`
  ${ngbtn}
`;

function Retry({ score, hiscore, newGame }) {
  return (
    <div
      css={[
        menucss,
        css`
          margin-top: 3vh;
        `,
      ]}
    >
      <h2>Try Again?</h2>
      <h3>Score: {score}</h3>
      <h3>High Score: {hiscore}</h3>
      <div css={btndiv}>
        <button css={rulebtn}>Rules</button>
        <button css={ngbtn} onClick={newGame}>
          New Game
        </button>
      </div>
    </div>
  );
}

export { Retry };
