import axios from "axios"

const GET_FAV_CRYPTO = "GET_FAV_CRYPTO"
const GET_CRYPTOS = "GET_CRYPTOS"



export const getCryptos = async (dispatch) => {
    const result = await axios.get("https://api.cryptapi.io/info/")
    console.log(result)
    result.data.map(r => console.log(r))
    return dispatch({type: "GET_CRYPTOS", payload: result.data})
}
export const getFavCrypto = async (dispatch) => {
    const result = await axios.get("https://api.cryptapi.io/btc/info/")
    console.log(result)
    return dispatch({type: "GET_FAV_CRYPTO", payload: result.data})
}