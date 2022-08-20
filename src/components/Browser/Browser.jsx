import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCryptos, filterCrypto } from '../../redux/actions/actions'
import CryptoCard from '../CryptoCard/cryptoCard'
import "./browser.css"
import { Link } from 'react-router-dom'


export default function Browser() {
    const firstRenderRef = useRef(true);
let {cryptos} = useSelector((state) => state)
const dispatch = useDispatch()
const [query, setQuery] = useState("")
const [filter, setFilter] = useState("trc20")

// console.log(cryptos.all)
cryptos = [...cryptos.trc20, ...cryptos.bep20, ...cryptos.erc20]


useEffect(() => {
    if (firstRenderRef.current) {
        firstRenderRef.current = false;
        return;
    } 
        dispatch(getCryptos)

    
    // console.log(cryptos)
}, [ ])

useEffect(() => {
    // cryptos.filter((c) => c.coin.includes(query))
    // var time 
    // clearTimeout(time);
//   time = setTimeout(() => {
     
    //   dispatch(getCryptos)
      dispatch(filterCrypto(query))
    // }, 800);

}, [ query ])

const handleCryptoChange = (e) => {
    if(e.target.value === 0 ) setQuery("")
    else setQuery(e.target.value)
    // setTimeout(() => {
        // cryptos = cryptos.filter(c => !c.coin.includes(e.target.value)).concat()
    // }, 800);
}
console.log(cryptos)
const handleFilter = (e) => {
} 
    return (


        <div className='bg-black'>
            <h2>Search a new Crypto!</h2>

            <br></br>
            <input type='text' className='w-100' onChange={(e) => handleCryptoChange(e)} />
            <br></br>
            <select onChange={(e) => handleFilter(e)}>
            <option value="All">All Cryptocoins</option>
            <option value="trc20">trc20</option>
            <option value="bep20">bep20</option>
            <option value="erc20">erc20</option>
            </select>
            
            <div className="w-20">
                {

cryptos?.length > 0 ?
                        // console.log(favCrypto)
                        cryptos.map(c => {
                            return (
                                <Link to={`/home/browser/${c.type}?${c.ticker}`}>
                                <CryptoCard
                                    key={c.coin}
                                    coin={c.coin}
                                    ticker={c.ticker}
                                  

                                />
                                </Link>
                            )
                        })

                        : <p>Loading . . . </p>
                }
            </div>

        </div>

    )
}