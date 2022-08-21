import React from "react"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCryptoInfo, clearCryptoInfo } from "../../redux/actions/actions"
import { useParams } from "react-router-dom"
import "../Browser/browser.css"
import { addToFav } from "../../redux/actions/actions"
import { useHistory, useLocation } from "react-router-dom";
import { IconButton, Input, Button } from "@material-tailwind/react"
import Spinner from "../Spinner/Spinner"

export default function CryptoPopUp({ticker, type}) {
const history = useHistory()
const dispatch = useDispatch()
const firstRenderRef = useRef(true);
const {crypto} = useParams()
const {search} = useLocation()
const {cryptoDetail, currency} = useSelector((state) => state)
const cryptoCoin = search.split("?")[1]

const [amount, setAmount] = useState("")
    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        } 
        console.log(crypto, search)
            dispatch(getCryptoInfo(crypto, cryptoCoin))
            // dispatch(getCryptoInfo(type, ticker))
        return () => dispatch(clearCryptoInfo)
        
        
    }, [ ])



    const handleFav = (e) => {
        // if(amount === "") setAmount(0)
        dispatch(addToFav(cryptoDetail, amount === "" ? 0 : amount))
        setAmount(" ")
        

    }
    const handleAmount = (e) => {
        // if(e.target.value === "") e.target.value = 0
        if(e.target.value === "") return setAmount(0)
        setAmount(parseFloat(e.target.value))
        console.log(amount)

    }
    const handleReturn = () => {
        console.log(history)
        history.replace({
            pathname: "/home"
        })
    }
    return (
        <div>
            <Button onClick={() => handleReturn()} className='p-5 mb-3'>{`<= Home`}</Button>
            {
        cryptoDetail.logo ? 
        <div>
            <h1>Crypto info:</h1>
            <h1>{cryptoDetail.coin}</h1>
            <h2>{`[ ${cryptoDetail.ticker} ]`}</h2>
            <img src={cryptoDetail.logo} className='justify-center max-w-sm m-10'/>
            <h2>Chain: {crypto}</h2>
            <h3>Price: {currency} {cryptoDetail.prices[currency]}</h3>


            <br></br>
            <h3>Enter your {cryptoDetail.ticker} amount:</h3>
            <div className='flex flex-row'>
            {/* <input type='number' placeholder={`${cryptoDetail.coin}`} className='search' onChange={(e) => handleAmount(e)} value={amount}/> */}
            <Input variant={cryptoDetail.ticker} label={cryptoDetail.ticker} type='number'  className='search' onChange={(e) => handleAmount(e)} value={amount}/>
            {/* <button onClick={(e) => handleFav(e)}>+</button> */}
            <button 
            class="relative inline-flex items-center justify-center p-0.5 mb-9 mr-2 ml-3 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            onClick={(e) => handleFav(e)}
            >
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-lg group-hover:bg-opacity-0">
      +
  </span>
</button>
</div>
        </div> 
        
        
        
        
        : <Spinner/>
            }
        </div>
    )
}