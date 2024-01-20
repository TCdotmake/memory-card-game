/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
function Card({ src, alt, index }) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={700}
      classNames="card"
      data-index={index}
    >
      <img
        ref={nodeRef}
        src={src}
        alt={alt}
        data-index={index}
        className="img-src"
      ></img>
    </CSSTransition>
  );
}

export { Card };
