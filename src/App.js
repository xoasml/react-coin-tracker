import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState([]);
  const [money, setMoney] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onSelect = (event) => {
    setCoin(JSON.parse(event.target.value));
  };

  const onChange = (event) => {
    console.log(event.target.value)
    setMoney(event.target.value);
  };

  return (
    <div>
      <h1>The Coins {loading ? null : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          <div>
            <select onChange={onSelect}>
              <option key="NONE">
                Select Plz
              </option>
              {coins.map((coin) => (
                <option key={coin.id} value={JSON.stringify(coin)}>
                  {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
                </option>
              ))}
            </select>
          </div>
          You Choose {coin.name}
          <div>
            <input
              onChange={onChange}
              placeholder={"Show Me the your Money"}
            ></input>
          </div>
          You Can Buy $
          {coin.length !== 0 && money > 0 ? money / coin.quotes.USD.price : "0"}{" "}
          USD
          <hr />
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
