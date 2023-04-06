import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header>
        <section className="header">
          <div className="wrapper">
            <h1>Giphy Sentiment</h1>
            <h3>Express Yourself with Gifs: The Ultimate Emotion Timeline</h3>
            <Link to="/timeline">
              <button type="button" className="headerButton">Timeline</button>
            </Link>
          </div>
        </section>
      </header>
    </>
  );
};

export default Header;
