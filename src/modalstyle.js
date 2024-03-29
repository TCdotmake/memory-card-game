/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const modalstyle = css`
  position: absolute;
  margin: 36vh auto 0;

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
  @media (orientation: landscape) {
    width: min(50vw, 450px);
  }
  @media (max-height: 376px) {
    margin: 33vh auto 0;
  }
  @media (min-height: 1000px) {
    margin: 36vh auto 0;
  }
`;

export { modalstyle };
