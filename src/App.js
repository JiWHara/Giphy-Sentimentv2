import './App.css';
import Header from './components/Header.js';
import DisplayOptions from './components/DisplayOptions.js';
import Form from './components/Form.js';
import Timeline from './components/Timeline.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <div className="App">
      <Form />
      <DisplayOptions />
    </div>
  );
}

export default App;
