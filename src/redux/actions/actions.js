import axios from "axios"
import Swal from "sweetalert2";

const GET_CRYPTO_INFO = "GET_CRYPTO_INFO"
const ADD_TO_FAV = "ADD_TO_FAV"
const GET_CRYPTOS = "GET_CRYPTOS"



export const getCryptos = async (dispatch) => {
    let result = await axios.get(`https://api.cryptapi.io/info/`)
    result = await result.data
    return dispatch({type: "GET_CRYPTOS", payload: result})
}



export const addToFav = (crypto, amount, type) => async (dispatch) => {
    if(!crypto && !amount && !type) {
        let prices = await axios.get('https://api.cryptapi.io/btc/info/')
        prices = await prices.data.prices
        prices = Object.keys(prices)
        return dispatch({type: "GET_FAV", payload: prices})
    }
    console.log("aAAAAAAAAAAAAAAAAAÀ,",crypto, amount, type)
    Swal.fire({
        icon: "success",
        title: 'Added crypto to fav list successfully',
        text: 'Thanks!',
        background: "#4c4d4c",
        color: "white",
      });
    return dispatch({type: "ADD_TO_FAV", payload: {crypto, amount, type}})
    
}
export const deleteFav = (crypto, chain) => async (dispatch) => {
    console.log(crypto)
    Swal.fire({
        icon: "info",
        title: 'Deleted crypto from list successfully',
        text: 'Thanks!',
        background: "rgba(121, 148, 153, 0.97)",
        color: "white",
      });
      console.log(crypto, "AND", chain)
    return dispatch({type: "DELETE_FAV", payload: {crypto, chain}})
}
export const getCryptoInfo = (chain, crypto) => async (dispatch) => {
    console.log("CRYPTO DETAIL", crypto)
    const result = await axios.get(`https://api.cryptapi.io/${chain}/${crypto.toLowerCase()}/info/`)
    console.log(result)
    return dispatch({type: "GET_CRYPTO_INFO", payload: result.data})
}
export const clearCryptoInfo = async(dispatch) => {
    return dispatch({type: "CLEAR_CRYPTO_INFO"})
}
export const filterCrypto = (value) => async(dispatch) => {
    return dispatch({type: "FILTER", payload: value})
}
export const changeCurrency = (value) => async(dispatch) => {
    return dispatch({type: "CHANGE_CURRENCY", payload: value})
}

