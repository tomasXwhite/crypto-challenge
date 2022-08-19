import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCryptos } from '../../redux/actions/actions'
import CryptoCard from '../CryptoCard/cryptoCard'


export default function Browser() {
    const firstRenderRef = useRef(true);
const {cryptos} = useSelector((state) => state)
const dispatch = useDispatch()

useEffect(() => {
    if (firstRenderRef.current) {
        firstRenderRef.current = false;
        return;
    } 
        dispatch(getCryptos)

    
    console.log(cryptos)
}, [ ])

    return (


        <div>
            Search a new crypto!aaa

            <br></br>
            <input type='text' />
            <br></br>
            <div className="containerCards">
                {

cryptos?.length > 0 ?
                        // console.log(favCrypto)
                        cryptos.map(c => {
                            return (

                                <CryptoCard
                                    key={c[ticker].network_fee_estimation}
                                    coin={c[ticker].coin}
                                    price={c.prices.USD}
                                    logo={c.logo}

                                />
                            )
                        })

                        : <p>Loading...</p>
                }
            </div>
        </div>

    )
}