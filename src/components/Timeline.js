import firebaseInfo from "../firebase.js";
import { getDatabase, ref, onValue } from "firebase/database";

import { useEffect, useState } from "react";

const Timeline = () => {

    const  [gifData, setGifData] = useState({})
    const  [gifArray, setGifArray] = useState([])

    const database = getDatabase(firebaseInfo)
    // reference to db
    const dbRef = ref(database)

    useEffect(() =>{

        onValue(dbRef, (firebaseData) => {
            if(firebaseData.exists()){
                // save object data to state
                setGifData(firebaseData.val());
            }
        })
    },[] )

   useEffect(() => {
       if(gifData) {
           setGifArray(Object.values(gifData))
       }
   }, [gifData])

    return (
        <ul className="timelineList" >
            {gifArray ? 
                
                gifArray.map((eachGif) => {
                    console.log(eachGif.img)
                    return(
                        <img key={eachGif.key}  src={eachGif.img} alt={eachGif.alt} /> 
                        )
                    })
                    : null}
        </ul>
    )
    
}

export default Timeline