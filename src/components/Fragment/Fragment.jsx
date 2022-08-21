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
  import Browser from "../browser/Browser";
import { maxHeight } from "@mui/system";
import { getCryptos, filterCrypto } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import CryptoCard from "../CryptoCard/cryptoCard";
import MySelector from "../Selector/Selector";
  

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




    const customContentStyle = {
        width: '80%',
        maxHeight: '80%',
        // display: 'flex',
        // flexDirection: 'row',

        
        maxWidth: 'none',
      };

    return (
        <Fragment>
      <Button onClick={handleOpen} variant="gradient">
        {`OPEN ME! `}
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        style={customContentStyle}
      >
        {/* <Browser 

        /> */}

        <DialogHeader>
            <h2>Search a new Crypto!</h2>

            <br></br>
            <Input label='crypto' onChange={(e) => handleCryptoChange(e)} />
            <br></br>


            <MySelector
                arr={types}
                handle={handleFilter}
                optional={"Select type"}
            />
            </DialogHeader>

        <DialogBody divider>
         {
             cryptos[filter]?.length > 0 ?
             // console.log(favCrypto)
             cryptos[filter].map(c => {
                 // let price = c.prices ? c.prices[currency] : null
                 return (
                     <Link to={`/home/info/${c.type}?${c.ticker}`}>
                          <Card className="w-40 flex h-80 m-3">
      <CardHeader  className="relative h-56">
        <img
          src={c.logo}
        //   alt="img-blur-shadow"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {`${c.coin} (${c.ticker})`}
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-1">
        <Typography variant="small">{currency} {c.prices[currency]}</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          {c.type}
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

             : <p>Loading . . . </p>
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
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
    )
}