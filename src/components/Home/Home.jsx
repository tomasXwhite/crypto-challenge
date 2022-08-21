import React from "react"
import { useSelector, useDispatch } from "react-redux"
// import { getFavCrypto } from "../../redux/actions/actions"
import { useEffect, useState, useRef, Fragment} from "react"
import CryptoCard from "../CryptoCard/cryptoCard"
import { Link } from "react-router-dom"
import { addToFav, changeCurrency } from "../../redux/actions/actions"
import MyFragment from "../Fragment/Fragment"




import MySelector from "../Selector/Selector"


export default function Home() {
    const firstRenderRef = useRef(true);
    const { favCrypto, currency } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [curren, setCurren] = useState("USD")


    useEffect(() => {
        console.log(firstRenderRef.current)
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        dispatch(addToFav())

    }, [])
    useEffect(() => {
        dispatch(changeCurrency(curren))
    }, [curren])


    const handleCurrency = (e) => {
        setCurren(e)


    }

    const currencies = ["USD", "EUR", "AED"]
    return (
        <div>
            <h1 className="text-5xl font-bold underline mb-3">FAVOURITE CRYPTO LIST</h1>
            {/* <Link to='/home/browser' > */}
                <div>
                    Click here to add cryptos to FAV {"<3"}
                </div>
                
                
            <div className="flex flex-row justify-center m-2 p-2 gap-2">
                
            {/* </Link> */}
            <br></br>
                <MyFragment 

                
                />


<MySelector 
handle={handleCurrency}
arr={currencies}
optional={"Select currency"}
/>
</div>
     
            <div className="flex flex-row justify-center">
                {

                    favCrypto?.length > 0 ?
                        favCrypto.map(c => {
                            return (

                                <CryptoCard
                                    key={c.crypto.network_fee_estimation}
                                    coin={c.crypto.coin}
                                    price={c.crypto.prices[currency]}
                                    logo={c.crypto.logo}
                                    amount={c.amount}
                                    ticker={c.crypto.ticker}

                                />

                            )
                        })
                        : null

                }

            </div>





        </div>
    )
}