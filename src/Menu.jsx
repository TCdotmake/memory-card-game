/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { modalstyle } from "./modalstyle";
import { Btnbar } from "./Btnbar";
import { motion } from "framer-motion";
function Menu({ hiscore, newGame }) {
  return (
    <motion.div
      css={[modalstyle]}
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <h2>Memory Card Game</h2>
      <p>
        Choose as many cards as you can without picking the same card twice!
      </p>

      <h3>High Score: {hiscore}</h3>
      <Btnbar newGame={newGame}></Btnbar>
    </motion.div>
  );
}

export { Menu };
