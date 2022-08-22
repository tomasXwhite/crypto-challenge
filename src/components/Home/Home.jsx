import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useRef, Fragment } from "react"
import CryptoCard from "../CryptoCard/cryptoCard"
import { addToFav, changeCurrency } from "../../redux/actions/actions"
import MyFragment from "../Fragment/Fragment"
import MySelector from "../Selector/Selector"




export default function Home() {

    const firstRenderRef = useRef(true);
    const { favCrypto, currency, currencies } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [curren, setCurren] = useState(currency)


    useEffect(() => {
        //el condicional es por el useStrict de react, que hace que se desmonte y monte el componente entrando dos veces al didMount.
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

    return (
        <div className='w-full '>
            <h1 className="text-5xl font-bold underline mb-3 p-6 pt-10">FAVOURITE CRYPTO LIST</h1>
            <div>
                Click here to add cryptos to FAV {"<3"}
            </div>
            <div className="flex flex-row justify-center m-2 p-2 gap-2 ">

                <br></br>
                <MyFragment
                />

                <MySelector
                    handle={handleCurrency}
                    arr={currencies}
                    optional={"Select currency"}
                />
            </div>
            <hr className='' />
            <br />
            <div className="flex flex-wrap gap-8 justify-center mx-2">
                {
                    favCrypto?.length > 0 ?
                        favCrypto.map(c => {
                            return (
                                <CryptoCard
                                    key={`${c.crypto.ticker}-${c.crypto.type}`}
                                    coin={c.crypto.coin}
                                    price={c.crypto.prices[currency]}
                                    logo={c.crypto.logo}
                                    amount={c.amount}
                                    ticker={c.crypto.ticker}
                                    type={c.type}
                                />
                            )
                        })
                        : null
                }
            </div>
        </div>
    )
}