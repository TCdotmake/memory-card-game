/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useRef } from "react";
function Card({ src, alt, index }) {
  const nodeRef = useRef(null);
  return (
    <img
      ref={nodeRef}
      src={src}
      alt={alt}
      data-index={index}
      className="img-src"
    ></img>
  );
}

export { Card };
