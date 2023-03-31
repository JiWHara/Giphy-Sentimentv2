import { useState } from 'react'
import axios from 'axios'

const Form = () => {

    const [searchQuery, setSearchQuery] = useState('bee')
    const [gif, setGif] = useState()

    const handleSubmit = (event) => {
        event.preventDefault();
        //   Start


        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&limit=25&offset=0&rating=pg&lang=en`)
            .then(response => {
                setGif(response.data.data[0].images.original.url)
            })
        // End
    }



    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor=""></label>
                <input type="text" />

                <button>Api call</button>
            </form>
            {gif ?
                <img src={gif} alt="" />
                :
                null
            }
        </>
    )
}

export default Form