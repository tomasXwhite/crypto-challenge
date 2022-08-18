import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getFavCrypto } from "../../redux/actions/actions"
import { useEffect, useState } from "react"


export default function Home() {
    const favCrypto = useSelector((state) => state.favCrypto)
    const dispatch = useDispatch()

    const handleTest = () => {
        // console.log(estado, "asdfasfasd")
    }
    
    useEffect(() => {
        dispatch(getFavCrypto)
console.log(favCrypto)
    }, [])

    return(
        <div>
            Hi!!! Click here to watch btc info!
            <div>
                <button onClick={() => handleTest()}>X</button>
            </div><br></br>
            <div>
                {
                
                favCrypto.length > 0  ? 
                // console.log(favCrypto)
                favCrypto.map(c => {
                    return (
                    <div>
                        <h2>{c.coin}</h2> <img src={c.logo}/>
                        <h4>{c.prices.USD}</h4>
                        <br />
                    </div>
                    )
                })
                
                : null
            }
                </div>
        </div>
    )
}