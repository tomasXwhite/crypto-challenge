import React from "react"


export default function CryptoCard({coin, price, logo}) {


    const handleDelete = () => {
        console.log("DELETE", coin)
    }


    return(
        <div>
            <h2>{coin}</h2>
            <img src={logo}/>
            <h4>{price}</h4>
            <button onClick={() => handleDelete()}>X</button>
        </div>
    )
}