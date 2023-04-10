// ErrorPage
import { Link } from "react-router-dom";
import Header from "./Header.js";

const ErrorPage = () => {
    return(
        <>
            <Header />
            <section className="errorSection">
                <div className="wrapper">
                    <p>Whoops! This page does not exist! Please press the button to return back to home!</p>
                    <Link to="/">
                        <button type="button" className="returnButton">Return</button>
                    </Link>
                </div>
            </section>
        </>
        
        
    )
}

export default ErrorPage;