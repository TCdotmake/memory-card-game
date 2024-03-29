import { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import _ from "lodash";
import { Carousel } from "./Carousel";
import logoH from "../public/logo-900x150.png";
import logoV from "../public/logo-650x407.png";
import { Retry } from "./Retry";
import { Collage } from "./Collage";
import { motion } from "framer-motion";
import { Menu } from "./Menu";

const maincss = css`
  background: var(--transdark);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  @media (orientation: portrait) {
    height: max(800px, 100vh);
  }
`;

const imgcss = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -999;
  height: 100%;
  > img {
    width: 100vw;
    height: 100%;
    object-fit: cover;
  }
`;

const logocss = css`
  margin: 2vh 5vw 0 5vw;
  @media (orientation: portrait) {
    max-width: 60vw;
  }
  @media (orientation: landscape) {
    max-height: 20vh;
    margin-top: 10vh;
  }
`;

const loadLocalData = () => {
  return localStorage.getItem("hiScore");
};

function App() {
  const sourceURL =
    "https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Awho&unique=prints";
  const [freshload, setfreshload] = useState(true);
  const [active, setactive] = useState(false);
  const [data, setdata] = useState([]);
  const [nextpage, setnextpage] = useState(null);
  const [dataIndex, setdataindex] = useState([]);
  const [pool, setpool] = useState([]);
  const [deck, setdeck] = useState([]);
  const [discard, setdiscard] = useState([]);
  const [step, setstep] = useState(1);
  const [range, setrange] = useState(10);
  const [gamesize, setgamesize] = useState(10);
  const [score, setscore] = useState(0);
  const [hiscore, sethiscore] = useState(loadLocalData() || 0);

  async function getData(sourceURL) {
    const response = await fetch(sourceURL);
    const data = await response.json();
    return await data;
  }

  function addData(sourceURL) {
    getData(sourceURL).then((result) => {
      //filter out non-normal layout cards
      let newData = result.data;
      newData = newData.filter((n) => n.layout === "normal");
      setdata([...data, ...structuredClone(newData)]);
      //check if there are more pages of cards
      if (result.has_more) {
        setnextpage(result.next_page);
      } else {
        setnextpage(null);
      }
    });
  }
  function updateDataIndex() {
    let arr = [];
    let i = 0;
    if (data.length > 0 && dataIndex !== undefined) {
      i += dataIndex.length;
    }
    if (data.length > 0) {
      while (i < data.length) {
        arr.push(i);
        i += 1;
      }
      setdataindex((prev) => {
        if (prev !== undefined) {
          return [...prev, ..._.shuffle(arr)];
        } else return [..._.shuffle(arr)];
      });
    }
  }
  useEffect(() => {
    addData(sourceURL);
    loadLogo();
  }, []);

  useEffect(() => {
    updateDataIndex();
  }, [data]);

  const newGame = () => {
    if (dataIndex.length > gamesize) {
      let copy = [...dataIndex];
      copy = _.shuffle(copy);
      setfreshload(false);
      setdataindex([...copy]);
      setpool(copy.slice(0, gamesize));
      setdeck(copy.slice(0, gamesize));
      setdiscard([]);
      setscore(0);
      setactive(true);
    }
  };

  const handleChooseCard = (e) => {
    if (active) {
      let cardIndex = e.target.dataset.index;
      //game over
      if (discard.includes(cardIndex)) {
        setactive(false);
      }
      //valid choice
      else if (!discard.includes(cardIndex)) {
        //update discard pile
        setdiscard((preState) => {
          let newState = [...preState];
          newState.push(cardIndex);
          return newState;
        });

        // see if we have to add more cards
        if (range + step >= dataIndex.length) {
          addMoreCards();
        }
        // make sure there's new cards
        if (range + step <= dataIndex.length) {
          let temppool = [...pool];
          let tempdeck = [...deck];
          let newCards = dataIndex.slice(range, range + step);
          //add new cards to pool
          temppool = [...temppool, ...newCards];

          //shuffle deck, add new cards on current hand
          tempdeck = _.shuffle(tempdeck);
          tempdeck = [...newCards, ...tempdeck.slice(0, gamesize - step)];
          tempdeck = _.shuffle(tempdeck);

          //update states
          setpool([...temppool]);
          setdeck([...tempdeck]);
          //update marker for cards used
          setrange((prev) => prev + step);
          //update score
          updateScore();
        }
      }
    }
  };

  function updateScore() {
    let tempscore = discard.length + 1;
    setscore(tempscore);
    if (tempscore > hiscore) {
      sethiscore(tempscore);
      localStorage.setItem("hiScore", tempscore);
    }
  }

  const addMoreCards = () => {
    if (nextpage !== null) {
      addData(nextpage);
    }
  };

  const loadLogo = () => {
    const img = document.getElementById("mainLogo");
    if (window.innerHeight > window.innerWidth) {
      img.src = logoV;
    } else {
      img.src = logoH;
    }
  };

  window.addEventListener("resize", loadLogo);

  return (
    <>
      <main css={maincss}>
        <picture css={imgcss}>
          <source media="(min-width: 1200px)" srcSet="xl.jpg"></source>
          <source media="(min-width: 450px)" srcSet="lg.jpg"></source>
          <source srcSet="sm.jpg"></source>
          <img src="xl.jpg"></img>
        </picture>

        <motion.img
          id="mainLogo"
          src={logoH}
          css={logocss}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        {freshload && <Collage />}
        {freshload && <Menu hiscore={hiscore} newGame={newGame}></Menu>}
        <div
          css={css`
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          {!active && !freshload && (
            <Retry score={score} hiscore={hiscore} newGame={newGame} />
          )}

          {deck.length > 0 && (
            <Carousel
              active={active}
              data={data}
              deck={deck}
              handleChooseCard={handleChooseCard}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default App;
