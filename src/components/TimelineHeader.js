import { Link } from "react-router-dom";
const TimelineHeader = () => {
  return (
      <header>
          <div className="wrapper">
            <div className="titleContainer">
              <Link to={'/'}><h1>Giphy Sentiment</h1></Link>
              <h2>Timeline</h2>
            </div>
            <Link to="/" className="returnButton">
              Return
            </Link>
          </div>
      </header>
  );
};

export default TimelineHeader;
