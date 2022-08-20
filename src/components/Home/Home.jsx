import React from "react"
import { useSelector, useDispatch } from "react-redux"
// import { getFavCrypto } from "../../redux/actions/actions"
import { useEffect, useState, useRef } from "react"
import CryptoCard from "../CryptoCard/cryptoCard"
import { Link } from "react-router-dom"
import { Button, Modal, Box, Typography } from "@mui/material"
// import Modal from "@mui/material"


export default function Home() {
    const firstRenderRef = useRef(true);
    const favCrypto = useSelector((state) => state.favCrypto)
    const dispatch = useDispatch()

    const handleTest = () => {
        dispatch(getInfo)
        // console.log(estado, "asdfasfasd")
    }

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        // dispatch(getFavCrypto)

        // console.log(favCrypto)
    }, [])

    return (
        <div>
            <button onClick={() => handleTest()}>TEST</button>
            <h1 className="text-3xl font-bold underline">FAVOURITE CRYPTO LIST</h1> 
            <Link to='/home/browser' >
            <div>
                Click here to add cryptos to FAV {"<3"} 
            </div>
                <button >+</button>
                </Link>
            <br></br>
            <div className="bg-red">
                {

                    favCrypto?.length > 0 ?
                        // console.log(favCrypto)
                        favCrypto.map(c => {
                            return (

                                <CryptoCard
                                    key={c.crypto.network_fee_estimation}
                                    coin={c.crypto.coin}
                                    price={c.crypto.prices.USD}
                                    logo={c.crypto.logo}
                                    amount={c.amount}
                                    ticket={c.ticker}

                                />
                                
                            )
                        })

                        : null
                }
                
            </div>





        </div>
    )
}