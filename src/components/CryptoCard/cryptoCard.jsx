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
        <div className='border-2 rounded-xl shadow-sm m-2'>
            <h2>{`${coin} (${ticker})`}</h2>
            <img src={logo} className='w-40 p-10 justify-center'/>
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
                <button onClick={() => handleDelete()}>X</button><p>Delete from fav</p>
                <br></br>
                </div>
                : null
            }
        </div>
    )
}