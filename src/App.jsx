import { useState, useEffect } from "react";
/** @jsx jsx */
import { css } from "@emotion/react";
import "./App.css";
import _ from "lodash";

async function getData() {
  const response = await fetch(
    "https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Awho&unique=prints"
  );
  const data = await response.json();
  return await data;
}

function App() {
  const [data, setdata] = useState([]);
  const [index, setindex] = useState([]);
  const [pool, setpool] = useState([]);
  const [deck, setdeck] = useState([]);
  const [step, setstep] = useState(1);
  const [range, setrange] = useState(10);
  const [gamesize, setgamesize] = useState(10);
  useEffect(() => {
    getData().then((result) => {
      setdata(structuredClone(result.data));
    });
  }, []);

  useEffect(() => {
    let arr = [];
    let i = 0;
    if (data.length > 0) {
      while (i < data.length) {
        arr.push(i);
        i += 1;
      }
      setindex(_.shuffle(arr));
    }
  }, [data]);

  const handleShuffle = () => {
    if (index.length > range && pool.length == 0) {
      setpool(index.slice(0, range));
      setdeck(index.slice(0, range));
    }
  };

  const loading = "Loading...";

  return (
    <>
      <button onClick={handleShuffle}>shuffle</button>
      <div>
        {(deck.length > 0 &&
          deck.map((n) => {
            return <button key={n}>{n}</button>;
          })) ||
          loading}
      </div>
    </>
  );
}

export default App;
