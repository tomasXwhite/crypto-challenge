import axios from "axios"

const GET_CRYPTO_INFO = "GET_CRYPTO_INFO"
const ADD_TO_FAV = "ADD_TO_FAV"
const GET_CRYPTOS = "GET_CRYPTOS"



export const getCryptos = async (dispatch) => {
    let result = await axios.get(`https://api.cryptapi.io/info/`)
    result = await result.data

    let bep20 = []
    let trc20 = []
    let erc20 = []


    for(let prop in result) {
         if(prop === "bep20") {
            let obj = result[prop]
           for(let cryp in obj) {
            obj[cryp].type = "bep20"
            bep20.push(obj[cryp])
           }
        } else if(prop === "trc20") {
            let obj = result[prop]
            for(let cryp in obj) {
            obj[cryp].type = "trc20"
            if(bep20.length>3) {
                
                trc20.push(obj[cryp])
            } else console.log("EL ELEMENTO", cryp, "ESTA REPETIDO")
            if(bep20.includes("ada")) console.log("SI INCLUYE")
        }
        } else if(prop === "erc20") {
            let obj = result[prop]
            for(let cryp in obj) {
            obj[cryp].type = "erc20"
            if(!bep20.includes(cryp) && !trc20.includes(cryp)) erc20.push(obj[cryp])
            else console.log("EL ELEMENTO", cryp, "ESTA REPETIDO")
            }
        } 
    
    }
    
    result = [trc20, bep20, erc20]
    console.log(result)




    return dispatch({type: "GET_CRYPTOS", payload: result})
}



export const addToFav = (crypto, amount) => async (dispatch) => {
    console.log(crypto, amount)
    return dispatch({type: "ADD_TO_FAV", payload: {crypto, amount}})
}
export const deleteFav = (crypto) => async (dispatch) => {
    console.log(crypto)
    return dispatch({type: "DELETE_FAV", payload: crypto})
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
