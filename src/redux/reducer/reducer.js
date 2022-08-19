



const initialState = {
    cryptoDetail: {},
    cryptos: ["btc",
    "bch",
    "eth",
    "ltc",
    "trx",
    "xmr"],
    favCrypto: []
}


const cryptoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CRYPTO_INFO":
            return {
                ...state,
                cryptoDetail : action.payload
            }
        case "ADD_TO_FAV": 
        console.log(action.payload)
        if(action.payload.amount === 0 ) console.log("soy 0")
            return {
                ...state,
                favCrypto: state.favCrypto.concat(action.payload)
            }
        case "DELETE_FAV": 
        console.log(state.favCrypto, action.payload)
            return {
                ...state,
                favCrypto: state.favCrypto.filter((c) => c.crypto.coin !== action.payload)
            }
        case "CLEAR_CRYPTO_INFO": 
        console.log("limpiar")
            return {
                ...state,
                cryptoDetail: {}
            }
        default:
            return state
    }
}

export default cryptoReducer