import React, {Fragment, useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input
  } from "@material-tailwind/react";
import { maxHeight } from "@mui/system";
import { getCryptos, filterCrypto } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import CryptoCard from "../CryptoCard/cryptoCard";
import MySelector from "../Selector/Selector";
import "./fragment.css"
import Spinner from "../Spinner/Spinner";
  

export default function MyFragment({coin, price, logo, ticker, type}) {
    const [open, setOpen] = useState(false);
 
    const handleOpen = () => setOpen(!open);
    const firstRenderRef = useRef(true);
    const { cryptos, currency } = useSelector((state) => state)
    const dispatch = useDispatch()
    const [query, setQuery] = useState("")
    const [filter, setFilter] = useState("all")




    useEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        !cryptos.length > 0 ? dispatch(getCryptos) : null
        console.log(cryptos)

    }, [])


    useEffect(() => {

        dispatch(filterCrypto(query))
       

    }, [query, filter])

    const handleCryptoChange = (e) => {
        if (e.target.value === 0) setQuery("")
        else setQuery(e.target.value)
    }

    const handleFilter = (e) => {
        setFilter(e)
    }

    const types = ["all", "trc20", "bep20", "erc20"]



    return (
        <Fragment >
      <Button onClick={handleOpen} variant="gradient" className='mb-3'>
        {`SEARCH NOW `}
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        // style={customContentStyle}
        className='h-modal overflow-y-auto overflow-x-none mb-10 min-w-modal flex justify-center'
      >
        {/* <Browser 

        /> */}
<div className='drop-shadow-2xl'>
        <DialogHeader className="flex flex-row gap-2 align-center ">
            <h2 className="justify-center align-center ml-4">Search a Crypto!</h2>

            <br></br>
            <Input 
            label='crypto' 
            onChange={(e) => handleCryptoChange(e)} 
            className=''
            />
            <br></br>


            <MySelector
                arr={types}
                handle={handleFilter}
                optional={"Select type"}

            />
            </DialogHeader>

        <DialogBody divider className='flex-1 flex flex-row flex-wrap gap-7 items-center justify-center'>
         {
             cryptos[filter]?.length > 0 ?
             // console.log(favCrypto)
             cryptos[filter].map(c => {
                 // let price = c.prices ? c.prices[currency] : null
                 return (
                     <Link to={`/home/info/${c.type}?${c.ticker}`}>
                          <Card className="w-56 shadow-lg flex h-80 m-3 border-gray-600  rounded-lg transform transition duration-500 hover:scale-110">
      <CardHeader className=" flex h-56 mt-4 p-3 justify-center shadow-none">
        <img
          src={c.logo}
          className=" max-w-full max-h-full items-center "
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mt-3 ">
          {`${c.coin} (${c.ticker})`}
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-center py-1 gap-10">
        <Typography variant="small" className='flex justify-around '>{currency} {c.prices[currency]}</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          {c.type.toUpperCase()}
        </Typography>
      </CardFooter>
    </Card>
                     </Link>
                     // <MyFragment 
                     // key={c.coin}
                     // coin={c.coin}
                     // ticker={c.ticker}
                     // logo={c.logo}
                     // price={c.prices ? c.prices[currency] : null}
                     // type={c.type}
                     
                     // />
                 )
             })

             : <Spinner />
     }
        </DialogBody>


        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          
        </DialogFooter>
      </div>
      </Dialog>
    </Fragment>
    )
}