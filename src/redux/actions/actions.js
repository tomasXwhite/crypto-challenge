import axios from "axios"

const GET_CRYPTO_INFO = "GET_CRYPTO_INFO"
const ADD_TO_FAV = "ADD_TO_FAV"



export const addToFav = (crypto, amount) => async (dispatch) => {
    console.log(crypto, amount)
    return dispatch({type: "ADD_TO_FAV", payload: {crypto, amount}})
}
export const deleteFav = (crypto) => async (dispatch) => {
    console.log(crypto)
    return dispatch({type: "DELETE_FAV", payload: crypto})
}
export const getCryptoInfo = (crypto) => async (dispatch) => {
    const result = await axios.get(`https://api.cryptapi.io/${crypto}/info/`)
    console.log(result)
    return dispatch({type: "GET_CRYPTO_INFO", payload: result.data})
}
export const clearCryptoInfo = async(dispatch) => {
    return dispatch({type: "CLEAR_CRYPTO_INFO"})
}
