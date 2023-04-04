// ErrorPage
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return(
        <section className="ErrorSection">
            <div className="wrapper">
                <h2>Whoops! This page does not exist! Please press the button to return back to home!</h2>
                <Link to="/">
                    <button type="button" className="returnButton">Return</button>
                </Link>
            </div>
        </section>
        
    )
}

export default ErrorPage;