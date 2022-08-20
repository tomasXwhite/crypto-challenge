import React from "react";
import { Select, Option } from "@material-tailwind/react";



export default function MySelector({handle, arr, optional}) {



    return(
        <div className=" border-none focus:ring-0">
         <Select
        label={optional}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        onChange={(e) => handle(e)}
      >
        {
            arr.length>0 ?
            arr.map((e) => {
                return <Option value={e}>{e}</Option> 
            })
            : null
        }
      </Select>
    </div>
    )
}