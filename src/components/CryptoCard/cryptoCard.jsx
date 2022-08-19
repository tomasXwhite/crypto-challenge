import React from "react"
import { useDispatch } from "react-redux"
import { deleteFav } from "../../redux/actions/actions"


export default function CryptoCard({coin, price, logo, amount}) {

    const dispatch = useDispatch()

    const handleDelete = () => {
        console.log("DELETE", coin)
        dispatch(deleteFav(coin))
    }


    return(
        <div>
            <h2>{coin}</h2>
            <img src={logo}/>
            <h4>{price}</h4>
            {
                amount>=0 ? 
                <p>Amount: {amount}</p>
                : null
            }
            
            {
                logo ?
                <div> 
                <p>Delete from fav</p><button onClick={() => handleDelete()}>X</button>
                <br></br>
                </div>
                : null
            }
        </div>
    )
}