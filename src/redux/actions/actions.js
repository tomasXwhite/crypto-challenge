import axios from "axios"

const GET_FAV_CRYPTO = "GET_FAV_CRYPTO"


export const getFavCrypto = async (dispatch) => {
    const result = await axios.get("https://api.cryptapi.io/btc/info/")
    console.log(result)
    return dispatch({type: "GET_FAV_CRYPTO", payload: result.data})
}