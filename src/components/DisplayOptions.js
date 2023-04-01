import firebaseInfo from "../firebase.js";
import { getDatabase, ref, push } from "firebase/database";
import axios from 'axios';
import { useState, useEffect } from "react";

// DisplayOptions function
const DisplayOptions = ({ gifArray }) => {

    return (
        <ul className='gifList'>
                {gifArray ?
                    gifArray.map(gif => {
                        const database = getDatabase(firebaseInfo)
                        // reference to db
                        const dbRef = ref(database) 
                        
                        const timeElapsed = Date.now();
                        const currentDay = new Date(timeElapsed)

                        const gifObj = {
                            img: gif.images.original.url,
                            alt: gif.title,
                            key: gif.id,
                            time: currentDay.toDateString(),
                            timeNum: timeElapsed
                        }

                        const clickHandler = () => {
                            push(dbRef, gifObj)
                        }
                        return (
                            <li key={gif.id} onClick={clickHandler}>
                                <img src={gif.images.original.url} alt={gif.title} />
                            </li>
                        )
                    })
                    :
                    null
                }
        </ul>
    )

}

export default DisplayOptions;