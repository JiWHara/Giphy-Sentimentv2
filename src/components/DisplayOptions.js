import firebaseInfo from "../firebase.js";
import { getDatabase, ref, push } from "firebase/database";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// DisplayOptions function
const DisplayOptions = ({ gifArray, emotion }) => {

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
        <section className="displaySection">
            <div className="wrapper">
                <ul className='gifList'>
                        {gifArray ?
                            gifArray.map(gif => {
                                
                                const timeElapsed = Date.now();
                                const currentDay = new Date(timeElapsed)
                                const gifObj = {
                                    emotion: emotion,
                                    img: gif.images.original.url,
                                    alt: gif.title,
                                    key: gif.id,
                                    time: currentDay.toDateString(),
                                    timeNum: timeElapsed
                                }
                                
                                return (
                                    <li key={gif.id}>
                                        <div className="gifContainer" onClick={() => setShowModal(`${gif.id}`)}>
                                            <img src={gif.images.original.url} alt={gif.title} />
                                        </div>
                                        <div className={`${ showModal === gif.id ? `modal` : `hidden` }`}>
                                            <div>
                                                
                                                <div className="modalFlex">
                                                    <div className="titleFlex">
                                                        <button onClick={() => setShowModal('')} className="btnClose">X</button>
                                                        <p className="modalText">Are you happy with your selection?</p>
                                                    </div>
                                                    
                                                    <figure className="displayPageGifContainer">
                                                        <img className="modalGif" src={gif.images.original.url} alt={gif.title} />
                                                    </figure>
                                                    <button onClick={() => handlePush(gifObj)}>Select</button>
                                                </div>
                                                
                                            </div>
                                                
                                        </div>
                                        <div onClick={() => setShowModal('')} className={`${ showModal === gif.id ? `overlay` : `hidden` }`}></div>
                                    </li>
                                )
                            })
                            :
                            null
                        }
                </ul>
            </div>
        </section>
    )

}

export default DisplayOptions;