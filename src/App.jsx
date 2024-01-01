import { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "./App.css";
import _ from "lodash";

const deckDivCss = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const cardBtnCss = css`
  padding: 0;
`;

function App() {
  const sourceURL =
    "https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Awho&unique=prints";
  const [data, setdata] = useState([]);
  const [nextpage, setnextpage] = useState(null);
  const [dataIndex, setdataindex] = useState([]);
  const [pool, setpool] = useState([]);
  const [deck, setdeck] = useState([]);
  const [discard, setdiscard] = useState([]);
  const [step, setstep] = useState(1);
  const [range, setrange] = useState(10);
  const [gamesize, setgamesize] = useState(10);
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
  }, [data]);

  const handleSetup = () => {
    if (dataIndex.length > range && pool.length == 0) {
      setpool(dataIndex.slice(0, range));
      setdeck(dataIndex.slice(0, range));
      setdiscard([]);
    }
  };

  const handleChooseCard = (e) => {
    let cardIndex = e.target.dataset.index;
    //valid choice
    if (!discard.includes(cardIndex)) {
      setdiscard((preState) => {
        let newState = [...preState];
        newState.push(cardIndex);
        return newState;
      });

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
      }
    }
  };

  const addMoreCards = () => {
    if (nextpage !== null) {
      addData(nextpage);
    }
  };

  const loading = "Loading...";

  return (
    <>
      <button onClick={handleSetup}>setup</button>
      <button onClick={addMoreCards}>Add More Cards</button>
      <div css={deckDivCss}>
        {(deck.length > 0 &&
          deck.map((n) => {
            return (
              <button
                key={data[n].oracle_id}
                onClick={handleChooseCard}
                data-index={n}
                css={cardBtnCss}
              >
                {/* {data[n].name} */}
                <img
                  src={data[n].image_uris.small}
                  alt={data[n].name}
                  data-index={n}
                ></img>
              </button>
            );
          })) ||
          loading}
      </div>
    </>
  );
}

export default App;
