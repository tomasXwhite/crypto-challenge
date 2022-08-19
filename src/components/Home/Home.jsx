import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getFavCrypto } from "../../redux/actions/actions"
import { useEffect, useState, useRef } from "react"
import CryptoCard from "../CryptoCard/cryptoCard"
import { Link } from "react-router-dom"


export default function Home() {
    const firstRenderRef = useRef(true);
    const favCrypto = useSelector((state) => state.favCrypto)
    const dispatch = useDispatch()

    const handleTest = () => {

        // console.log(estado, "asdfasfasd")
    }

    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        dispatch(getFavCrypto)

        console.log(favCrypto)
    }, [])

    return (
        <div>
            <h1>FAVOURITE CRYPTO LIST</h1> 
            <Link to='/home/browser' >
            <div>
                Click here to add cryptos to FAV {"<3"} 
            </div>
                <button onClick={() => handleTest()} >+</button>
                </Link>
            <br></br>
            <div className="containerCards">
                {

                    favCrypto?.length > 0 ?
                        // console.log(favCrypto)
                        favCrypto.map(c => {
                            return (

                                <CryptoCard
                                    key={c.network_fee_estimation}
                                    coin={c.coin}
                                    price={c.prices.USD}
                                    logo={c.logo}

                                />
                            )
                        })

                        : null
                }
            </div>
        </div>
    )
}