import firebaseInfo from "../firebase.js";
import TimelineHeader from "./TimelineHeader.js";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import '../App.css';
import { useEffect, useState } from "react";

const Timeline = () => {

    const  [gifData, setGifData] = useState([])
    // (1) removed second useState
    // const  [gifArray, setGifArray] = useState([])

    const database = getDatabase(firebaseInfo)
    // reference to db
    const dbRef = ref(database)

    useEffect(() =>{

        onValue(dbRef, (firebaseData) => {

            // (2) empty array to contain array of gifs
            const gifArray = [];

            const firebaseGifData = firebaseData.val();

            // (3) use for in loop to grab key and values to then push them into empty array
                // This allows me to have access to the KEY of the gifObj in our firebase db
            for (let key in firebaseGifData) {
                // (4)pushing each of the objects into the empty gif array
                gifArray.push({key: key, gifValues: firebaseGifData[key]})
            }
            // (5) saving gifArray to state:
            setGifData(gifArray)

        })
    },[] )

// (6) deleteClickHandler Func
const deleteClickHandler = (gifKey) => {
    //(7) reference to key in firebase db
        const deleteGifRef = ref(database, `${gifKey}`)
        // 7.A) remove the gifObj in our firebase DB using the KEY
        remove(deleteGifRef)
}

    return (
        <>
        <TimelineHeader />
        <ul className="timelineList" >
            {gifData ? 
                
                gifData.map((eachGif) => {
                    return(

                        <li key={eachGif.key}>
                            <figure className="gifContainer">
                              <img src={eachGif.gifValues.img} alt={eachGif.gifValues.alt} /> 
                            </figure>
                            {/* 8. made onclick event listener and here insert the clickhandler in an asynch function with it's param set as: eachGif.key ***This is how we target the key of specific firebase db obj! */}
                            <button className="xButton" onClick={() => {deleteClickHandler(eachGif.key)}}>❌</button>
                        </li>

                        )
                    })
                    : null}
        </ul>
        </>
    )
    
}

export default Timeline;