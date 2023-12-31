import { useState, useEffect } from "react";

import "./App.css";

async function getData() {
  const response = await fetch(
    "https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Awho&unique=prints"
  );
  const data = await response.json();
  return await data;
}

function App() {
  const [deck, setdeck] = useState([]);
  useEffect(() => {
    getData().then((data) => {
      console.log(data.data);
    });
  }, []);

  return <></>;
}

export default App;
