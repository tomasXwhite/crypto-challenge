



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
    currency: "USD",
    currencies: []
}


const cryptoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CRYPTOS":
            const response = action.payload

            let bep20 = []
            let trc20 = []
            let erc20 = []
        
        
            for(let prop in response) {
                 if(prop === "bep20") {
                    let obj = response[prop]
                   for(let cryp in obj) {
                    obj[cryp].type = "bep20"
                    bep20.push(obj[cryp])
                   }
                } else if(prop === "trc20") {
                    let obj = response[prop]
                    for(let cryp in obj) {
                    obj[cryp].type = "trc20"
                    if(bep20.length>22) {
                        
                        trc20.push(obj[cryp])
                    } else console.log("EL ELEMENTO", cryp, "ESTA REPETIDO")
                    if(bep20.indexOf(obj[cryp]) < 1) console.log("SI INCLUYE")
                }
                } else if(prop === "erc20") {
                    let obj = response[prop]
                    for(let cryp in obj) {
                    obj[cryp].type = "erc20"
                    if(!bep20.includes(cryp) && !trc20.includes(cryp)) erc20.push(obj[cryp])
                    else console.log("EL ELEMENTO", cryp, "ESTA REPETIDO")
                    }
                } 
            
            }
            const all = [...trc20, ...bep20, ...erc20]


        // allCryptos = [...action.payload[0]]
        const currenciesType = action.payload
            return {
                ...state,
                cryptos: {
                    trc20: trc20.filter((c) => !bep20.indexOf(c)),
                    bep20: bep20,
                    erc20: erc20,
                    all: all.filter((item,index)=>{
                        return all.indexOf(item) === index;
                      })
                },
                toFilter: [trc20, bep20, erc20],
                // currencies: Object.keys(trc20.btc)
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