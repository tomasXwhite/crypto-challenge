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
import Swal from "sweetalert2"



export default function CryptoPopUp() {
    const history = useHistory()
    const dispatch = useDispatch()
    const firstRenderRef = useRef(true);
    const { crypto } = useParams()
    const { search } = useLocation()
    const { cryptoDetail, currency } = useSelector((state) => state)
    const cryptoCoin = search.split("?")[1]
    const [amount, setAmount] = useState("")

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        dispatch(getCryptoInfo(crypto, cryptoCoin))
        return () => dispatch(clearCryptoInfo)
    }, [])


    const handleFav = (e) => {
        if (amount < 0) {
            return Swal.fire({
                icon: "error",
                title: "You can set a negative amount...",
                text: "",
                background: "#4c4d4c",
                color: "white",
            });
        } else {
            dispatch(addToFav(cryptoDetail, amount === "" ? 0 : amount, crypto))
            setAmount(" ")
            setTimeout(() => {
                history.replace({
                    pathname: "/"
                })
            }, 5000);
        }
    }

    const handleAmount = (e) => {
        if (e.target.value === "") return setAmount(0)
        setAmount(parseFloat(e.target.value))
    }

    const handleReturn = () => {
        history.replace({
            pathname: "/"
        })
    }

    return (
        <div>
            <Button onClick={() => handleReturn()} className='p-5 mb-3 mt-4'>{`<= Home`}</Button>
            {
                cryptoDetail.logo ?
                    <div>
                        <h1 className='mobile:text-xl'>Crypto info:</h1>
                        <h1>{cryptoDetail.coin}</h1>
                        <h2>{`[ ${cryptoDetail.ticker} ]`}</h2>
                        <img src={cryptoDetail.logo} className='justify-center max-w-sm m-6 align-center relative m-auto mt-4 mb-9' />
                        <h2>Chain: {crypto}</h2>
                        <h3>Price: {currency} {cryptoDetail.prices[currency]}</h3>

                        <br></br>
                        <h3>Enter your {cryptoDetail.ticker} amount:</h3>
                        <div className='flex flex-row w-80 justify-center m-auto mt-5 mobile:flex-col mobile:gap-2 pb-5'>
                            <Input variant={cryptoDetail.ticker} label={cryptoDetail.ticker} type='number' min='0' className='search' onChange={(e) => handleAmount(e)} value={amount} />
                            <button
                                class="relative inline-flex items-center justify-center ml-4 p-0.5 mobile:m-auto overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                                onClick={(e) => handleFav(e)}
                            >
                                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-lg group-hover:bg-opacity-0">
                                    +
                                </span>
                            </button>
                        </div>
                    </div>
                    : <Spinner />
            }
        </div>
    )
}