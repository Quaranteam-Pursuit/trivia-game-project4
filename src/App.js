import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import InputForm from './Components/InputForm';
import TriviaGame from './Components/TriviaGame';
import Footer from './Components/Footer';

function App() {
  const [ startNewGame, setStartNewGame ] = useState(true);
  const [ questionArray, setQuestionArray ] = useState([]);

  return (
    <div className="App">
      <Router>
        <header>
         <h1>Quarantine Pursuit!</h1>
        </header>
          <main>
            {
              startNewGame ?
                  <InputForm 
                      setQuestionArray={setQuestionArray}
                      setStartNewGame={setStartNewGame}
                  /> :
                  <TriviaGame 
                      questionArray={questionArray}
                  />
            }
          </main>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
