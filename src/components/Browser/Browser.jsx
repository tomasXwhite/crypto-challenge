import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { getCryptos } from '../../redux/actions/actions'
import CryptoCard from '../CryptoCard/cryptoCard'
import { hardcodedCoins } from '../../assets/data'
import "./browser.css"
import { Link } from 'react-router-dom'


export default function Browser() {
    // const firstRenderRef = useRef(true);
const {cryptos} = useSelector((state) => state)
// const dispatch = useDispatch()

// useEffect(() => {
    // if (firstRenderRef.current) {
        // firstRenderRef.current = false;
        // return;
    // } 
        // dispatch(getCryptos)

    
    // console.log(cryptos)
// }, [ ])

    return (


        <div>
            <h2>Search a new Crypto!</h2>

            <br></br>
            <input type='text' className='search'/>
            <br></br>
            <div className="w-1">
                {

cryptos?.length > 0 ?
                        // console.log(favCrypto)
                        cryptos.map(c => {
                            return (
                                <Link to={`/home/browser/${c}`}>
                                <CryptoCard
                                    key={c}
                                    coin={c}
                                  

                                />
                                </Link>
                            )
                        })

                        : <p></p>
                }
            </div>
        </div>

    )
}