import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCryptos, filterCrypto, clearCryptoInfo } from '../../redux/actions/actions'
import CryptoCard from '../CryptoCard/cryptoCard'
import "./browser.css"
import { Link } from 'react-router-dom'
import MySelector from '../Selector/Selector'

// import {
//     Tabs,
//     TabsHeader,
//     TabsBody,
//     Tab,
//     TabPanel,
// } from "@material-tailwind/react";
import { Input } from '@material-tailwind/react'




export default function Browser() {
    const firstRenderRef = useRef(true);
    let { cryptos } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [query, setQuery] = useState("")
    const [filter, setFilter] = useState("all")



    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        !cryptos.length > 0 ? dispatch(getCryptos) : null


    }, [])


    useEffect(() => {

        dispatch(filterCrypto(query))
       

    }, [query, filter])

    const handleCryptoChange = (e) => {
        if (e.target.value === 0) setQuery("")
        else setQuery(e.target.value)
    }

    const handleFilter = (e) => {
        setFilter(e)
    }



    const types = ["all", "trc20", "bep20", "erc20"]

    return (


        <div >
            <h2>Search a new Crypto!</h2>

            <br></br>
            <Input label='crypto' onChange={(e) => handleCryptoChange(e)} />
            <br></br>


            <MySelector
                arr={types}
                handle={handleFilter}
                optional={"Select type"}
            />





            <div >
                {

                    cryptos[filter]?.length > 0 ?
                        // console.log(favCrypto)
                        cryptos[filter].map(c => {
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