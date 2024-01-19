/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { modalstyle, ngbtn } from "./modalstyle";

function Menu({ score, hiscore, newGame }) {
  return (
    <div css={[modalstyle]}>
      <h2>Memory Card Game</h2>
      <p>
        Choose as many cards as you can without picking the same card twice!
      </p>

      <h3>High Score: {hiscore}</h3>
      <button css={ngbtn} onClick={newGame}>
        New Game
      </button>
    </div>
  );
}

export { Menu };
