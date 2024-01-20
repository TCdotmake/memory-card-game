/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const modalstyle = css`
  width: min(80vw, 450px);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--white);
  background: var(--primary);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid var(--white);
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
  @media (orientation: landscape) {
    width: min(50vw, 450px);
  }
`;

const ngbtn = css`
  background: white;
  color: var(--primary);
`;

export { modalstyle, ngbtn };
