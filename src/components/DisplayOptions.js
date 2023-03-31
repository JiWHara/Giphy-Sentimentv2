import firebaseInfo from "../firebase.js";
import { getDatabase, ref, push } from "firebase/database";
import axios from 'axios';
import { useState, useEffect } from "react";


const DisplayOptions = () => {
    
    const database = getDatabase(firebaseInfo)
    // reference to db
    const dbRef = ref(database) 

    const clickHandler = () => {
        push(dbRef, 'First push!')
    }


    return (
        <section className="displayGiphy">
            <div className="wrapper">
                <button onClick={clickHandler}>GHFIUWGF</button>
            </div>
        </section>
    )

}

export default DisplayOptions;