import React from "react"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCryptoInfo, clearCryptoInfo } from "../../redux/actions/actions"
import { useParams } from "react-router-dom"
import "../Browser/browser.css"
import { addToFav } from "../../redux/actions/actions"
import { useHistory, useLocation } from "react-router-dom";

export default function CryptoPopUp() {
const history = useHistory()
const dispatch = useDispatch()
const firstRenderRef = useRef(true);
const {crypto} = useParams()
const {search} = useLocation()
const {cryptoDetail} = useSelector((state) => state)
const cryptoCoin = search.split("?")[1]

const [amount, setAmount] = useState("")
    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        } 
            dispatch(getCryptoInfo(crypto, cryptoCoin))
        return () => dispatch(clearCryptoInfo)
        
        
        console.log(cryptoDetail)
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
            <button onClick={() => handleReturn()}>{`<= Home`}</button>
            {
        cryptoDetail.coin ? 
        <div>
            <h1>crypto info:</h1>
            <h1>{cryptoDetail.coin}</h1>
            <img src={cryptoDetail.logo}/>
            <h3>Price: U$$ {cryptoDetail.prices.USD}</h3>


            <br></br>
            <h3>Enter your {cryptoDetail.coin} amount:</h3>
            <input type='number' placeholder={`${cryptoDetail.coin}`} className='search' onChange={(e) => handleAmount(e)} value={amount}/>
            <button onClick={(e) => handleFav(e)}>+</button>
        </div> 
        
        
        
        
        : <h2>Loading...</h2>
            }
        </div>
    )
}