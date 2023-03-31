import firebaseInfo from "../firebase.js";
import { getDatabase, ref } from "firebase/database";

import { useState } from "react";

const DisplayOptions = () => {
    const [gifs, setGifs] = useState([]);
    
    return (
        <section className="displayGiphy">
            
        </section>
    )

}

export default DisplayOptions;