



const initialState = {
    crypto: [],
    favCrypto: []
}


const cryptoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_FAV_CRYPTO":
            return {
                ...state,
                favCrypto : state.favCrypto.concat(action.payload)
            }
        default:
            return state
    }
}

export default cryptoReducer