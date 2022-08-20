



const initialState = {
    cryptoDetail: {},
    cryptos: {
        trc20: [],
        bep20: [],
        erc20: [],
        all: []
    },
    toFilter: [],
    favCrypto: [],
    currency: "USD"
}


const cryptoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CRYPTOS":
            return {
                ...state,
                cryptos: {
                    trc20: action.payload[0],
                    bep20: action.payload[1],
                    erc20: action.payload[2],
                    all: [...action.payload[0], ...action.payload[1], ...action.payload[2]]
                },
                toFilter: action.payload
            }
        case "GET_CRYPTO_INFO":
            return {
                ...state,
                cryptoDetail: action.payload
            }
        case "GET_FAV":
            console.log("ENTRO BIEN")
            const res = JSON.parse(localStorage.getItem("cryptoFav"))
            console.log(res)
            
            return {
                ...state,
                favCrypto: res
            }
        case "ADD_TO_FAV":
            if (action.payload.amount === 0) console.log("soy 0")
            const result = state.favCrypto.concat(action.payload)
            localStorage.setItem("cryptoFav", JSON.stringify(result))

            return {
                ...state,
                favCrypto: result

            } 
        case "DELETE_FAV":
            const result2 = state.favCrypto.filter((c) => c.crypto.coin !== action.payload)
            localStorage.setItem("cryptoFav", JSON.stringify(result2))
            return {
                ...state,
                favCrypto: result2
            }
        case "CLEAR_CRYPTO_INFO":
            console.log("limpiar")
            return {
                ...state,
                cryptoDetail: {}
            }
        case "FILTER":
            console.log("FILTERRRR", action.payload)
            console.log(state.toFilter)
            // console.log(state.cryptos.bep20)
            // console.log(state.toFilter)
            if (state.toFilter[0]?.length > 0) {
                let filtredArr = {
                    trc20: [],
                    bep20: [],
                    erc20: [],
                    all: []
                }
                state.cryptos = {
                    trc20: state.toFilter[0].forEach((c) => {
                        if (c.coin.toLowerCase().includes(action.payload.toLowerCase()) || c.ticker.toLowerCase().includes(action.payload.toLowerCase())) filtredArr.trc20.push(c)

                        // c.coin.includes(action.payload) ? filtredArr.trc20.push(c) : null

                    }),
                    bep20: state.toFilter[1].forEach((c) => {
                        if (c.coin.toLowerCase().includes(action.payload.toLowerCase()) || c.ticker.toLowerCase().includes(action.payload.toLowerCase())) filtredArr.bep20.push(c)
                        // c.coin.includes(action.payload) ? filtredArr.bep20.push(c) : null
                    }),
                    erc20: state.toFilter[2].forEach((c) => {
                        if (c.coin.toLowerCase().includes(action.payload.toLowerCase()) || c.ticker.toLowerCase().includes(action.payload.toLowerCase())) filtredArr.erc20.push(c)

                        // c.coin.includes(action.payload) ? filtredArr.erc20.push(c) : null
                    })
                }
                filtredArr = {
                    ...filtredArr,
                    all: [...filtredArr.trc20, ...filtredArr.bep20, ...filtredArr.erc20]
                }

                console.log("filtredArr", filtredArr)
                // return state
                return {
                    ...state,
                    cryptos: filtredArr
                }


                // return state
            }
            case "CHANGE_CURRENCY":
                if(action.payload === "USD" || action.payload ==="EUR" || action.payload ==="AED") {
                    console.log("reducer currency:",action.payload)
                    return {
                        ...state,
                        currency: action.payload
                    }

                }
        default:
            return state



    }
}

export default cryptoReducer