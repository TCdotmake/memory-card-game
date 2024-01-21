/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { motion, AnimatePresence } from "framer-motion";
function Card({ src, alt, index }) {
  return (
    <AnimatePresence>
      <motion.img
        src={src}
        key={src}
        alt={alt}
        data-index={index}
        className="img-src"
        initial={{ rotateY: 90 }}
        animate={{ rotateY: 0 }}
        exit={{ rotateY: 90 }}
        transition={{ duration: 0.5 }}
      ></motion.img>
    </AnimatePresence>
  );
}

export { Card };
