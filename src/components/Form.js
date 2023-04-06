import { useState } from "react";
import axios from "axios";
import DisplayOptions from "./DisplayOptions";
import Header from "./Header.js";

const Form = () => {
    // initialize useState variables as string/array
    const [searchQuery, setSearchQuery] = useState('')
    const [gifArray, setGifArray] = useState([]);
    const [apiError, setApiError] = useState(false);
    const [ apiNoResultError, setApiNoResultError ] = useState(false);
    const [ wordsError, setWordsError ] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        //   Axios Start
        
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&limit=10&offset=0&rating=pg&lang=en`)
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
          <form className="apiForm" onSubmit={handleSubmit}>
              <label htmlFor="" className='sr-only'>Enter your emotion:</label>
              
              <p className="absolute">Write <span className={wordsError ? 'big' : null}>one word</span> about how you're feeling and well get some Gif's for you</p>
              <input onChange={(e) => {

                // create variable to contain number of words using split method
                const words = e.target.value.split(/\s+/);
                // variable storing number of words
                const numWords = words.length;

                if(numWords > 1){
                    // to cancel event
                    e.preventDefault()
                    // set the error as true
                    setWordsError(true)
                }else{
                    // set error as fasle
                    setWordsError(false)
                    setSearchQuery(e.target.value)
                }}} 
                value={searchQuery} 
                type="text" />
              
              <button>Api call</button>
          </form>
        {/*wordsError === true ? <h2>Please enter one word</h2> : null*/}
          {/* 1d) display error message to user */}
          {apiError === true ? <h2>Sorry, the call to the Giphy API was unsuccessful, please try again!</h2> : null}

          {apiNoResultError === true ? <h2>Your search yielded no results! Please try again!</h2> : null }

          <DisplayOptions gifArray={gifArray}/>
          
      </>
  )
};
export default Form;
