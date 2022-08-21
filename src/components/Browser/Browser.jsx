import React from 'react'
import { useEffect, useState, useRef, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCryptos, filterCrypto, clearCryptoInfo } from '../../redux/actions/actions'
import CryptoCard from '../CryptoCard/cryptoCard'
import "./browser.css"
import { Link } from 'react-router-dom'
import MySelector from '../Selector/Selector'
import MyFragment from '../Fragment/Fragment'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";





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
    const { cryptos, currency } = useSelector((state) => state)
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
            <DialogHeader>
            <h2>Search a new Crypto!</h2>

            <br></br>
            <Input label='crypto' onChange={(e) => handleCryptoChange(e)} />
            <br></br>


            <MySelector
                arr={types}
                handle={handleFilter}
                optional={"Select type"}
            />



</DialogHeader>
            <div className='bg' >
                {

                    cryptos[filter]?.length > 0 ?
                        // console.log(favCrypto)
                        cryptos[filter].map(c => {
                            // let price = c.prices ? c.prices[currency] : null
                            return (
                                <Link to={`/home/info/${c.type}?${c.ticker}`}>
                                    <CryptoCard
                                        key={c.coin}
                                        coin={c.coin}
                                        ticker={c.ticker}


                                    />
                                </Link>
                                // <MyFragment 
                                // key={c.coin}
                                // coin={c.coin}
                                // ticker={c.ticker}
                                // logo={c.logo}
                                // price={c.prices ? c.prices[currency] : null}
                                // type={c.type}
                                
                                // />
                            )
                        })

                        : <p>Loading . . . </p>
                }
            </div>

        </div>

    )
}