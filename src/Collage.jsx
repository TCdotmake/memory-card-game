/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Menu } from "./Menu";
import { motion } from "framer-motion";
import _ from "lodash";
import p0 from "./img/0.jpg";
import p1 from "./img/1.jpg";
import p2 from "./img/2.jpg";
import p3 from "./img/3.jpg";
import p4 from "./img/4.jpg";
import p5 from "./img/5.jpg";
import p6 from "./img/6.jpg";
import p7 from "./img/7.jpg";
import p8 from "./img/8.jpg";
import p9 from "./img/9.jpg";

const images = {
  p0: p0,
  p1: p1,
  p2: p2,
  p3: p3,
  p4: p4,
  p5: p5,
  p6: p6,
  p7: p7,
  p8: p8,
  p9: p9,
};

const center = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const bgcss = css`
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // margin: auto 0;
  flex-direction: row;
  overflow: hidden;
  background: var(--transbg);
  height: 35vh;
  > img {
    max-height: 25vh;
  }
`;
function Collage({ hiscore, newGame }) {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(i);
  }
  arr = _.shuffle(arr);
  return (
    <div
      css={[
        center,
        css`
          margin-top: 10vh;
          position: relative;
        `,
      ]}
    >
      <motion.div
        css={[center, bgcss]}
        initial={{ x: -600 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        {arr.map((n) => {
          return <img src={images[`p${n}`]} />;
        })}
      </motion.div>
    </div>
  );
}

export { Collage };
