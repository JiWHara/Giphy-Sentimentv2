import { useState } from "react";
import axios from "axios";
import DisplayOptions from "./DisplayOptions";
import Header from "./Header.js";

const Form = () => {
    // initialize useState variables as string/array
    const [searchQuery, setSearchQuery] = useState('')
    const [gifArray, setGifArray] = useState([]);
    const [apiError, setApiError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        //   Axios Start
        
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&limit=10&offset=0&rating=pg&lang=en`)
            .then((response) => {
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

    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&limit=10&offset=0&rating=pg&lang=en`
      )
      .then((response) => {
        setGifArray(response.data.data);
      });
    // End
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <label htmlFor=""></label>
        <input onChange={(e) => setSearchQuery(e.target.value)} type="text" />


    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="" className='sr-only'>Enter your emotion:</label>
                <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} type="text" />

                <button>Api call</button>
            </form>

            {/* 1d) display error message to user */}
            {apiError === true ? <h2>Sorry, the call to the Giphy API was unsuccessful, please try again!</h2> : null}

            {gifArray.length === 0 ? <h2>Your search yielded no results! Please try again!</h2> : null }

            <DisplayOptions gifArray={gifArray}/>
            
        </>
    )
}

export default Form;
