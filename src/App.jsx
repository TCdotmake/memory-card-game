import { useState, useEffect, useRef } from "react";
/** @jsxImportSource @emotion/react */
import { ClassNames, css } from "@emotion/react";
import "./App.css";
import _ from "lodash";

import { CSSTransition } from "react-transition-group";
import { Carousel } from "./Carousel";

const maincss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const imgcss = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -999;
  > img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;

function App() {
  const sourceURL =
    "https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Awho&unique=prints";
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
  const [hiscore, sethiscore] = useState(0);
  const nodeRef = useRef(null);
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
  }, []);

  useEffect(() => {
    updateDataIndex();
    console.log(data[0]);
  }, [data]);

  const newGame = () => {
    if (dataIndex.length > gamesize) {
      let copy = [...dataIndex];
      copy = _.shuffle(copy);
      console.log(copy);
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
    let base = discard.length + 1;
    let tempscore = Math.trunc(Math.pow(base, 1.5));
    setscore(tempscore);
    if (tempscore > hiscore) {
      sethiscore(tempscore);
    }
  }

  const addMoreCards = () => {
    if (nextpage !== null) {
      addData(nextpage);
    }
  };

  return (
    <>
      <main css={maincss}>
        <picture css={imgcss}>
          <source media="(min-width: 1200px)" srcSet="xl.jpg"></source>
          <source media="(min-width: 450px)" srcSet="lg.jpg"></source>
          <source srcSet="sm.jpg"></source>
          <img src="xl.jpg"></img>
        </picture>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: row;
          `}
        >
          <button onClick={newGame} ref={nodeRef}>
            New Game
          </button>
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;

              > p {
                padding: 0;
                margin: 0;
              }
            `}
          >
            <p>Score: {score}</p>
            <p>High Score: {hiscore}</p>
          </div>
        </div>

        <Carousel data={data} deck={deck} handleChooseCard={handleChooseCard} />
      </main>
    </>
  );
}

export default App;
