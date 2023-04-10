import { Link } from "react-router-dom";
const Header = () => {
  return (
      <header>
          <div className="wrapper">
            <div className="titleContainer">
              <h1>Giphy Sentiment</h1>
              <h2>Express Yourself with Gifs: The Ultimate Emotion Timeline</h2>
            </div>
            <Link to="/timeline">
              <button type="button" className="headerButton">Timeline</button>
            </Link>
          </div>
      </header>
  );
};

export default Header;
