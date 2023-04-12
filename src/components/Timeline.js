import firebaseInfo from "../firebase.js";
import TimelineHeader from "./TimelineHeader.js";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import '../App.css';
import { useEffect, useState } from "react";

const Timeline = () => {
    //<button className="xButton" onClick={() => {deleteClickHandler(eachGif.key)}}>❌</button>
    //const [hover, setHover] = useState(false)
    const  [gifData, setGifData] = useState([])
    // (1) removed second useState
    const [showModal, setShowModal] = useState('')
   

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
            gifArray.reverse()
            // (5) saving gifArray to state:
            setGifData(gifArray)

        })
    //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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
        <section className="timelineSection">
            <div className="wrapper">
                <div className="timelineFlex">
                    <ul className="timelineList" >
                        {gifData.length === 0 ? <p className="emptyTimelineText">The timeline is <span className="emptyTextStyle">empty!</span>  <br></br> Return to the homepage to search for Gifs and add them to the timeline!</p> : null}
                        {gifData ? 
                            
                            gifData.map((eachGif) => {
                                
                                return(
                                    <li className="indivGif" key={eachGif.key}>
                                        <div className="imageContainer">
                                            <figure className="timelineGifContainer">
                                                <img src={eachGif.gifValues.img} alt={eachGif.gifValues.alt} />
                                                <button 
                                                    className='xButton' 
                                                    onKeyDown={ event => {if (event.key === 'Enter') setShowModal(`${eachGif.gifValues.key}`)}} 
                                                    onClick={() => {setShowModal(`${eachGif.gifValues.key}`)}}>❌
                                                </button>
                                            </figure>
                                        </div>
                                        <div className="sideTextContainer">
                                            <div className= 'emotionText'>
                                                <p className="emotion">{eachGif.gifValues.emotion}</p>
                                                <p className="time">{eachGif.gifValues.time}</p>
                                            </div>
                                            <span className="circle"></span>
                                        </div>
                                        <span className="mobilePointer"></span>
                                    {/* modal start*/}
                                            <div className={`${ showModal === eachGif.gifValues.key ? `modal` : `hidden` }`}>
                                                <div>
                                                
                                                    <div className="modalFlex">
                                                        <div className="titleFlex">
                                                            <button onClick={() => setShowModal('')} className="btnClose">X</button>
                                                            <p className="modalText">Are you sure you want to delete this gif?</p>
                                                        </div>
                                                        <button onClick={() => {
                                                                                setShowModal('');
                                                                                deleteClickHandler(eachGif.key)
                                                                                }}>Yes</button>
                                                    </div>
                                                
                                                </div>
                                                
                                            </div>
                                            <div onClick={() => setShowModal('')} className={`${ showModal === eachGif.gifValues.key ? `overlay` : `hidden` }`}></div>
                                    {/* modal end */}
                                        
                                        {/* 8. made onclick event listener and here insert the clickhandler in an asynch function with it's param set as: eachGif.key ***This is how we target the key of specific firebase db obj! */}
                                    </li>
                                    
                                    )
                                })
                                : null}
                    </ul>
                </div>
            </div>
        </section>
        </>
    )
    
}

export default Timeline;