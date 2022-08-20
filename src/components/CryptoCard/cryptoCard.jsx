import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteFav } from "../../redux/actions/actions"


export default function CryptoCard({coin, price, logo, amount, ticker}) {

    const dispatch = useDispatch()
    const {currency} = useSelector((state) => state)

    const handleDelete = () => {
        console.log("DELETE", coin)
        dispatch(deleteFav(coin))
    }


    return(
        <div>
            <h2>{`${coin} (${ticker})`}</h2>
            <img src={logo}/>
            {
                price ?
                <h4>Price:  {currency} {price}</h4>
                : null
            }
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