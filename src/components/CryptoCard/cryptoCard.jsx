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
        <div className='border-2 rounded-xl shadow-sm m-2 w-52'>
            <h2>{`${coin} (${ticker})`}</h2>
            <img src={logo} className='w-60 p-5 justify-center'/>
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
                {/* <button onClick={() => handleDelete()}>X</button><p>Delete from fav</p> */}
                <button 
                class="relative inline-flex items-center border-0 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-850 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-900 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:border-0 active:border-0 dark:focus:ring-purple-800"
                onClick={() => handleDelete()}
                >
  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
      X
  </span>
</button>
                <br></br>
                </div>
                : null
            }
        </div>
    )
}