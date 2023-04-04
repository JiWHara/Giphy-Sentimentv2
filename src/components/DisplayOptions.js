import firebaseInfo from "../firebase.js";
import { getDatabase, ref, push } from "firebase/database";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// DisplayOptions function
const DisplayOptions = ({ gifArray }) => {

    const navigate = useNavigate()

    const [showModal, setShowModal] = useState('')
    const database = getDatabase(firebaseInfo)
    // reference to db
    const dbRef = ref(database) 
    
    

    const handlePush = (gifObj) => {
        push(dbRef, gifObj);
        setShowModal('');
        navigate('/timeline')
    }

    return (
        <ul className='gifList'>
                {gifArray ?
                    gifArray.map(gif => {
                        
                        const timeElapsed = Date.now();
                        const currentDay = new Date(timeElapsed)
                        const gifObj = {
                            img: gif.images.original.url,
                            alt: gif.title,
                            key: gif.id,
                            time: currentDay.toDateString(),
                            timeNum: timeElapsed
                        }
                        
                        
                        return (
                            <div key={gif.id}>
                                <li className="gifContainer" onClick={() => setShowModal(`${gif.title}`)}>
                                    <img src={gif.images.original.url} alt={gif.title} />
                                </li>
                                <div id="wbwModal" className={`${ showModal === gif.title ? `modal` : `hidden` }`}>
                                    <div className="modalFlex">
                                        <button onClick={() => setShowModal('')} className="btnClose">X</button>
                                        <p><strong>{gif.title}</strong> is a comprehensive movie tracking application that enables you to easily manage your to-watch list.   The platform was built using a combination of <span>Javascript</span>, <span>HTML</span>, <span>CSS</span>, <span>Sass</span>, and    <span>Firebase</span> for the backend, ensuring a highly responsive and efficient user experience. The site is hosted on<span>Netlify</span>.</p>

                                        <p>Our platform includes a user authentication system that enables each user to keep track of their own list of movies. This feature    ensures that every user's preferences are catered to, allowing them to tailor their movie tracking experience to their needs.</p>
                                    </div>
                                    <button onClick={() => handlePush(gifObj)}>push</button>
                                </div>
                                <div id="wbwOverlay" class={`${ showModal === gif.title ? `overlay` : `hidden` }`}></div>
                            </div>
                        )
                    })
                    :
                    null
                }
        </ul>
    )

}

export default DisplayOptions;