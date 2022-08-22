
import Swal from "sweetalert2"


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
    currencies: ["USD"]
}


const cryptoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CRYPTOS":
            const response = action.payload

            //El obj que llega viene con cryptos y chains que a su vez son obj con cryptos, entonces paso todas las cryptos a arrays
            // recorriendo los obj y sus chains

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
                        trc20.push(obj[cryp])
                }
                } else if(prop === "erc20") {
                    let obj = response[prop]
                    for(let cryp in obj) {
                    obj[cryp].type = "erc20"
                    erc20.push(obj[cryp])
                    }
                } 
            }
            const all = [...trc20, ...bep20, ...erc20]

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
            }

        case "GET_CRYPTO_INFO":
            return {
                ...state,
                cryptoDetail: action.payload
            }
        case "GET_FAV":
            const res = JSON.parse(localStorage.getItem("cryptoFav"))
            return {
                ...state,
                favCrypto: res,
                currencies: action.payload
            }
        case "ADD_TO_FAV":
            //ya está controlado en el componente, pero si de alguna manera llegaran a mandar un valor negativo no se guardaria.  
            if(action.payload.amount < 0) {
                return Swal.fire({
                    icon: "error",
                    title: "You can set a negative amount...",
                    text: "You will be redirected to Home in 5 seconds",
                    background: "#4c4d4c",
                    color: "white",
                  });
            } else {
                //verifico si la crypto ya fue agregada a favoritos, en la verificación incluyo la chain ya que las cryptos pueden
                //adquirirse de manera diferente
                let already = false
                let result = []
                state.favCrypto.forEach((c) => {
                    if(c.crypto.coin===action.payload.crypto.coin && c.type === action.payload.type ) already=true
    
                })
                if(already===false) {
                    result = state.favCrypto.concat(action.payload)
                    localStorage.setItem("cryptoFav", JSON.stringify(result))
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Ups... Crypto is already in Fav list.",
                        text: "Delete from fav and add it again.  You will be redirected to Home in 5 seconds",
                        background: "#4c4d4c",
                        color: "white",
                      });
                }
    
                return {
                    ...state,
                    favCrypto: result
    
                } 
            }
        case "DELETE_FAV":
            //cuando borro la crypto de la lista, incluyo la condición de si la chain coincide.
            const result2 = state.favCrypto.filter((c) => {
                if(c.crypto.coin === action.payload.crypto && c.type === action.payload.chain) return false
                else return true
            })
            localStorage.setItem("cryptoFav", JSON.stringify(result2))
            return {
                ...state,
                favCrypto: result2
            }
        case "CLEAR_CRYPTO_INFO":
            return {
                ...state,
                cryptoDetail: {}
            }
        case "FILTER":
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
                    }),
                    bep20: state.toFilter[1].forEach((c) => {
                        if (c.coin.toLowerCase().includes(action.payload.toLowerCase()) || c.ticker.toLowerCase().includes(action.payload.toLowerCase())) filtredArr.bep20.push(c)
                    }),
                    erc20: state.toFilter[2].forEach((c) => {
                        if (c.coin.toLowerCase().includes(action.payload.toLowerCase()) || c.ticker.toLowerCase().includes(action.payload.toLowerCase())) filtredArr.erc20.push(c)
                    })
                }
                filtredArr = {
                    ...filtredArr,
                    all: [...filtredArr.trc20, ...filtredArr.bep20, ...filtredArr.erc20]
                }
                return {
                    ...state,
                    cryptos: filtredArr
                }
            }
            case "CHANGE_CURRENCY":
                    return {
                        ...state,
                        currency: action.payload
                    }

            default:
                return state



    }
}

export default cryptoReducer