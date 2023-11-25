import React from 'react'
import './Coin.css'
const Coin = ({name,image,symbol,price,volume,priceChange,marketcap}) => {
  return (
    <>
    <div className='coin-container coin-container-1'>
        <div className="coin-row">
            <div className="coin">
                <img className='ftMdq720-550' src={image} alt="crypto" />
                <h2 lassName='ftMdq720-550'>{name}</h2>
                <p className="coin-symbol  ftMdq720-550">{symbol}</p>
                <p className="coin-price cll ftMdq720-550">${price}</p>
                <p className="coin-volume ftMdq720-550">${volume.toLocaleString()}</p>
                {priceChange < 0  ?(
                    <p className='coin-percent red ftMdq720-550'>{priceChange.toFixed(2)}%</p>
                ) : (
                    <p className='coin-percent green ftMdq720-550'>{priceChange.toFixed(2)}%</p>
                )
                }
                {
                    <p className='coin-marketcap'>
                        {marketcap.toLocaleString()}
                    </p>
                }
            </div>
        </div>
    </div>
    </>
  )
}

export default Coin;