



const initialState = {
    cryptoDetail: {},
    cryptos: [],
    favCrypto: []
}


const cryptoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_FAV_CRYPTO":
            return {
                ...state,
                favCrypto : state.favCrypto.concat(action.payload)
            }
        case "GET_CRYPTOS": 
            return {
                ...state,
                cryptos: action.payload
            }
        default:
            return state
    }
}

export default cryptoReducer