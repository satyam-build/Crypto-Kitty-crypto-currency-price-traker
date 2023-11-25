import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './Coin';
import './Coin.css'
import icon from './animal.png';
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false


function App() {
  // eslint-disable-next-line
  const [coins, setCoins] = useState([]);
  const [totalCoins, setTotalCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  let length = 0;

  useEffect(
    () => {

       axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(res => {
          const cryptodata = res.data;
           setTotalCoins(cryptodata);
          //  eslint-disable-next-line
           length = res.data.length;
           setCoins(cryptodata.slice(0,20));
          //  console.log(totalCoins)
        }).catch(error => console.log("Its error here"))

    }, [])


  const handlechange = e => {
    setSearch(e.target.value);
  }

  // eslint-disable-next-line
  const handleNext = () => {
    let startpoint = (page)*20;
    let endpoint = (page+1)*20;
    setCoins(totalCoins.slice(startpoint,endpoint));
    console.log(totalCoins.slice(startpoint,endpoint),page+1,"Next Button")
    setPage(page + 1);
  }

  const handlePrev = () => {
    let startpoint = (page-2)*20;
    let endpoint = (page-1)*20;
    setCoins(totalCoins.slice(startpoint,endpoint));
    console.log(totalCoins.slice(startpoint,endpoint),page-1,"Previous Button")
    setPage(page - 1);
  }
    
   const filteredCoins = search.length===0 ? [] : totalCoins.filter(coin => 
     coin.name.toLowerCase().includes(search.toLowerCase())
  ) ;
 
  return (
    <>
      <div className="coin-app">
        <div className="coin-search">
          <div className="Logo">
          <img src={icon} alt="" />
          <h1 className="coin-text">CRYPTO KITTY</h1>
          </div>
          <form>
            <input type="text" placeholder='search any currency' className='coin-input' onChange={handlechange} />
          </form>
        </div>
        <div className=".coinHead coin-container">
          <div className="coin-row">
            <div className="coin">
              <h3 className='ftMdq720-550'>Logo</h3>
              <h2 className='ftMdq720-550'>Currency</h2>
              <p className="coin-symbol ftMdq720-550">Symbol</p>
              <p className="coin-price ftMdq720-550">Price</p>
              <p className="coin-volume ftMdq720-550">Volume</p>
              <p className='coin-percent ftMdq720-550'>Price Change %</p>
              <p className='coin-marketcap'>Market Cap </p>
            </div>
          </div>
        </div>
      
      
        {filteredCoins.length===0 ?  coins.map(coin => {
          console.log("Hello coins");
          return (
            < Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          )
        }) : filteredCoins.map(coin => {
          console.log("Hello Filter");
          return (
            < Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          )
        })
        }
        <div className="actionBtnrow">
          <button disabled={page===1} className="actionbtn" onClick={handlePrev}>Previous</button>
          <button disabled={page===5} className="actionbtn" onClick={handleNext}>Next</button>
        </div>
      </div>
    </>
  );
}

export default App;
