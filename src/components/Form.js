import { useState, useEffect } from "react";
import axios from "axios";
import DisplayOptions from "./DisplayOptions";
import Header from "./Header.js";

const Form = () => {
    // initialize useState variables as string/array
    const [searchQuery, setSearchQuery] = useState('');

    const [emotion, setEmotion] = useState('')
    const [loadingState, setLoadingState] = useState(false)

    const [gifArray, setGifArray] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [offset, setOffset] = useState(0)
    const [apiNoResultError, setApiNoResultError] = useState(false);
    const [wordsError, setWordsError] = useState(false);

    useEffect(() => {
        
        if(gifArray.length !== 0) {
            handleSubmit()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset])

    
    const handleSubmit = () => {
        //   Axios Start
        setLoadingState(true)
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${emotion}&limit=10&offset=${ offset * 10 }&rating=pg&lang=en`)
            .then((response) => {
                if(response.data.data.length === 0){
                    setApiNoResultError(true)
                }else{
                    setApiNoResultError(false)
                }

                // set apiError as false
                setApiError(false)
                // setGifArray to results from search
                setGifArray(response.data.data)
                
                // reset user input 
                setSearchQuery('')

                setLoadingState(false)
            })
            .catch((error) => {
                //1a) set apiError to be true
                setApiError(true)
                //1b) We want to reset the git array back to [] to reset the search result
                setGifArray([])
                // reset user input 
                setSearchQuery('')
            })
            
        // Axios End
    }

    return (
      <>
        <Header />
        <section className="formSection">
            <div className="wrapper">
                <div className="formWrapper">
                <div className="instructions">
                    <p className="absolute">Write <span className={wordsError ? 'big' : null}>one word</span> about how you're feeling and we'll get some Gifs for you!</p>
                </div>
                
                <form className="apiForm" onSubmit={(e) => {
                                                            e.preventDefault();
                                                            
                                                            handleSubmit()
                                                        }}>
                    <label htmlFor="" className='sr-only'>Enter your emotion:</label>
                    <input onChange={(e) => {

                        // create variable to contain number of words using split method
                        const words = e.target.value.split(/\s+/);
                        // variable storing number of words
                        const numWords = words.length;

                        if(numWords > 1 || words.includes(!/^([^0-9]*)$/)){
                            // to cancel event
                            e.preventDefault()
                            // set the error as true
                            setWordsError(true)
                        }else{
                            // set error as false
                            setWordsError(false)
                            setEmotion(e.target.value)
                            setSearchQuery(e.target.value)
                        }                    
                    
                    
                    }} 
                        
                        value={searchQuery} 
                        type="text"
                        />
                    <div className="buttonWrapper">
                    <button className='submitButton'>Submit</button>
                    <button  onClick={() => setOffset(offset + 1)}>More {emotion} Gifs</button>
                    </div>
                </form>
                {/*wordsError === true ? <h2>Please enter one word</h2> : null*/}
                {/* 1d) display error message to user */}
                {apiError === true ? <p className="searchErrorText" >Sorry, the call to the Giphy API was unsuccessful, please try again!</p> : null}
                {loadingState === true && gifArray.length !== 0 ? <p>Loading GIFs</p> : null}
                {apiNoResultError === true ? <p className="searchErrorText">Your search yielded <span className="errorText">no results</span>, please try again!</p> : null }

                    </div>
                
                <DisplayOptions gifArray={gifArray} emotion={emotion}/>
                
            </div>
        </section>
      </>
  )
};
export default Form;
